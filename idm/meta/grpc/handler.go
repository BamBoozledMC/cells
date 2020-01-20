/*
 * Copyright (c) 2018. Abstrium SAS <team (at) pydio.com>
 * This file is part of Pydio Cells.
 *
 * Pydio Cells is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Pydio Cells is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Pydio Cells.  If not, see <http://www.gnu.org/licenses/>.
 *
 * The latest code can be found at <https://pydio.com>.
 */

package grpc

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/micro/go-micro/client"
	"github.com/micro/go-micro/metadata"
	"go.uber.org/zap"

	"github.com/pydio/cells/common"
	"github.com/pydio/cells/common/auth"
	"github.com/pydio/cells/common/log"
	"github.com/pydio/cells/common/proto/idm"
	"github.com/pydio/cells/common/proto/tree"
	"github.com/pydio/cells/common/service/context"
	"github.com/pydio/cells/common/service/proto"
	"github.com/pydio/cells/common/utils/cache"
	"github.com/pydio/cells/idm/meta"
)

// Handler definition.
type Handler struct {
	searchCache *cache.InstrumentedCache
}

func NewHandler() *Handler {
	h := &Handler{}
	h.searchCache = cache.NewInstrumentedCache(common.SERVICE_GRPC_NAMESPACE_ + common.SERVICE_USER_META)
	return h
}

func (h *Handler) Stop() {
	h.searchCache.Close()
}

// UpdateUserMeta adds, updates or deletes user meta.
func (h *Handler) UpdateUserMeta(ctx context.Context, request *idm.UpdateUserMetaRequest, response *idm.UpdateUserMetaResponse) error {

	dao := servicecontext.GetDAO(ctx).(meta.DAO)
	namespaces, _ := dao.GetNamespaceDao().List()
	var nodeUuids []string
	for _, metaData := range request.MetaDatas {
		h.clearCacheForNode(metaData.NodeUuid)
		if request.Operation == idm.UpdateUserMetaRequest_PUT {
			// Check JsonValue is valid json
			var data interface{}
			if er := json.Unmarshal([]byte(metaData.GetJsonValue()), &data); er != nil {
				return fmt.Errorf("make sure to use JSON format for metadata: %s", er.Error())
			}
			// ADD / UPDATE
			if newMeta, _, err := dao.Set(metaData); err == nil {
				nodeUuids = append(nodeUuids, metaData.NodeUuid)
				response.MetaDatas = append(response.MetaDatas, newMeta)
			} else {
				return err
			}
		} else {
			// DELETE
			if err := dao.Del(metaData); err == nil {
				nodeUuids = append(nodeUuids, metaData.NodeUuid)
			} else {
				return err
			}
		}
	}

	subjects, _ := auth.SubjectsForResourcePolicyQuery(ctx, nil)
	go func() {
		bgCtx := context.Background()
		if ctxMeta, ok := metadata.FromContext(ctx); ok {
			newM := make(map[string]string)
			for k, v := range ctxMeta {
				newM[k] = v
			}
			bgCtx = metadata.NewContext(bgCtx, newM)
		}

		for _, nodeId := range nodeUuids {
			// Reload node & Reload Metas
			node := &tree.Node{Uuid: nodeId, MetaStore: make(map[string]string)}
			metas, e := dao.Search([]string{}, []string{node.Uuid}, "", "", &service.ResourcePolicyQuery{
				Subjects: subjects,
			})
			if e != nil {
				continue
			}
			for _, val := range metas {
				if _, ok := namespaces[val.Namespace]; ok {
					node.MetaStore[val.Namespace] = val.JsonValue
				}
			}
			client.Publish(bgCtx, client.NewPublication(common.TOPIC_META_CHANGES, &tree.NodeChangeEvent{
				Type:   tree.NodeChangeEvent_UPDATE_USER_META,
				Target: node,
			}))
		}
	}()

	return nil

}

// SearchUserMeta retrieves meta based on various criteria.
func (h *Handler) SearchUserMeta(ctx context.Context, request *idm.SearchUserMetaRequest, stream idm.UserMetaService_SearchUserMetaStream) error {

	defer stream.Close()
	dao := servicecontext.GetDAO(ctx).(meta.DAO)
	results, err := dao.Search(request.MetaUuids, request.NodeUuids, request.Namespace, request.ResourceSubjectOwner, request.ResourceQuery)
	if err != nil {
		return err
	}
	for _, result := range results {
		stream.Send(&idm.SearchUserMetaResponse{UserMeta: result})
	}
	return nil

}

// Implements ReadNodeStream to be a meta provider.
func (h *Handler) ReadNodeStream(ctx context.Context, stream tree.NodeProviderStreamer_ReadNodeStreamStream) error {

	defer stream.Close()
	dao := servicecontext.GetDAO(ctx).(meta.DAO)
	subjects, e := auth.SubjectsForResourcePolicyQuery(ctx, nil)
	if e != nil {
		return e
	}

	for {
		req, er := stream.Recv()
		if req == nil {
			break
		}
		if er != nil {
			return er
		}
		node := req.Node
		var results []*idm.UserMeta
		var err error
		if r, ok := h.resultsFromCache(node.Uuid, subjects); ok {
			results = r
		} else {
			results, err = dao.Search([]string{}, []string{node.Uuid}, "", "", &service.ResourcePolicyQuery{
				Subjects: subjects,
			})
			log.Logger(ctx).Debug("Got Results For Node", node.ZapUuid(), zap.Any("results", results))
			if err == nil {
				h.resultsToCache(node.Uuid, subjects, results)
			}
		}
		if err == nil && len(results) > 0 {
			for _, result := range results {
				node.MetaStore[result.Namespace] = result.JsonValue
			}
		}
		stream.Send(&tree.ReadNodeResponse{Node: node})
	}

	return nil
}

// Update/Delete a namespace.
func (h *Handler) UpdateUserMetaNamespace(ctx context.Context, request *idm.UpdateUserMetaNamespaceRequest, response *idm.UpdateUserMetaNamespaceResponse) error {

	dao := servicecontext.GetDAO(ctx).(meta.DAO).GetNamespaceDao()
	for _, metaNameSpace := range request.Namespaces {
		if err := dao.Del(metaNameSpace); err != nil {
			return err
		} else {
			client.Publish(ctx, client.NewPublication(common.TOPIC_IDM_EVENT, &idm.ChangeEvent{
				Type:          idm.ChangeEventType_DELETE,
				MetaNamespace: metaNameSpace,
			}))
		}
	}
	if request.Operation == idm.UpdateUserMetaNamespaceRequest_PUT {
		for _, metaNameSpace := range request.Namespaces {
			if err := dao.Add(metaNameSpace); err != nil {
				return err
			} else {
				client.Publish(ctx, client.NewPublication(common.TOPIC_IDM_EVENT, &idm.ChangeEvent{
					Type:          idm.ChangeEventType_CREATE,
					MetaNamespace: metaNameSpace,
				}))
			}
			response.Namespaces = append(response.Namespaces, metaNameSpace)
		}
	}
	return nil

}

// List all namespaces from underlying DAO.
func (h *Handler) ListUserMetaNamespace(ctx context.Context, request *idm.ListUserMetaNamespaceRequest, stream idm.UserMetaService_ListUserMetaNamespaceStream) error {

	defer stream.Close()
	dao := servicecontext.GetDAO(ctx).(meta.DAO).GetNamespaceDao()
	if results, err := dao.List(); err == nil {
		for _, result := range results {
			stream.Send(&idm.ListUserMetaNamespaceResponse{UserMetaNamespace: result})
		}
	}
	return nil
}

func (h *Handler) resultsToCache(nodeId string, searchSubjects []string, results []*idm.UserMeta) {
	if h.searchCache == nil {
		return
	}
	key := fmt.Sprintf("%s-%s", nodeId, strings.Join(searchSubjects, "-"))
	//log.Logger(context.Background()).Info("User-Meta - Store Cache Key: " + key)
	if data, e := json.Marshal(results); e == nil {
		h.searchCache.Set(key, data)
	}
}

func (h *Handler) resultsFromCache(nodeId string, searchSubjects []string) (results []*idm.UserMeta, found bool) {
	if h.searchCache == nil {
		return
	}
	key := fmt.Sprintf("%s-%s", nodeId, strings.Join(searchSubjects, "-"))
	if data, e := h.searchCache.Get(key); e == nil {
		if er := json.Unmarshal(data, &results); er == nil {
			//log.Logger(context.Background()).Info("User-Meta - Got Cache Key: " + key)
			return results, true
		}
	}

	return
}

func (h *Handler) clearCacheForNode(nodeId string) {
	if h.searchCache == nil {
		return
	}
	it := h.searchCache.Iterator()
	var clears []string
	for {
		if !it.SetNext() {
			break
		}
		info, e := it.Value()
		if e != nil {
			break
		}
		if strings.HasPrefix(info.Key(), fmt.Sprintf("%s-", nodeId)) {
			clears = append(clears, info.Key())
		}
	}
	for _, k := range clears {
		//log.Logger(context.Background()).Info("User-Meta - Clear Cache Key: " + k)
		h.searchCache.Delete(k)
	}

}
