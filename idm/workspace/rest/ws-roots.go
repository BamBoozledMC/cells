package rest

import (
	"context"
	"encoding/json"
	"strings"

	"github.com/golang/protobuf/ptypes"
	"github.com/golang/protobuf/ptypes/any"

	"github.com/pydio/cells/common"
	"github.com/pydio/cells/common/auth/claim"
	"github.com/pydio/cells/common/log"
	defaults "github.com/pydio/cells/common/micro"
	"github.com/pydio/cells/common/proto/idm"
	"github.com/pydio/cells/common/proto/tree"
	"github.com/pydio/cells/common/registry"
	service "github.com/pydio/cells/common/service/proto"
	"github.com/pydio/cells/common/utils/permissions"
	"github.com/pydio/cells/common/views"
)

func (h *WorkspaceHandler) loadRootNodesForWorkspaces(ctx context.Context, wsUUIDs []string, wss map[string]*idm.Workspace) error {

	acls, err := permissions.GetACLsForWorkspace(ctx, wsUUIDs, &idm.ACLAction{Name: permissions.AclWsrootActionName})
	if err != nil {
		return err
	}
	wsAcls := make(map[string][]*idm.ACL, len(wsUUIDs))
	for _, a := range acls {
		wsAcls[a.WorkspaceID] = append(wsAcls[a.WorkspaceID], a)
	}
	streamer := tree.NewNodeProviderStreamerClient(registry.GetClient(common.SERVICE_TREE))
	c, e := streamer.ReadNodeStream(ctx)
	if e != nil {
		return e
	}
	defer c.Close()
	vManager := views.GetVirtualNodesManager()
	localCache := make(map[string]*tree.Node)
	for uuid, ws := range wss {
		aa, o := wsAcls[uuid]
		if !o {
			continue
		}
		for _, a := range aa {
			if n, o := localCache[a.NodeID]; o {
				if ws.RootNodes == nil {
					ws.RootNodes = make(map[string]*tree.Node)
				}
				ws.RootNodes[a.NodeID] = n
			}
			c.Send(&tree.ReadNodeRequest{Node: &tree.Node{Uuid: a.NodeID}})
			r, e := c.Recv()
			if e != nil {
				break
			}
			if r != nil && r.Success {
				if ws.RootNodes == nil {
					ws.RootNodes = make(map[string]*tree.Node)
				}
				ws.RootNodes[a.NodeID] = r.Node.WithoutReservedMetas()
				localCache[a.NodeID] = r.Node.WithoutReservedMetas()
			} else {
				// May be a virtual node
				if node, ok := vManager.ByUuid(a.NodeID); ok {
					if ws.RootNodes == nil {
						ws.RootNodes = make(map[string]*tree.Node)
					}
					ws.RootNodes[a.NodeID] = node.WithoutReservedMetas()
					localCache[a.NodeID] = node.WithoutReservedMetas()
				}
			}
		}
	}
	return nil
}

// LoadRootNodesForWorkspace loads all root nodes for this workspace
func (h *WorkspaceHandler) loadRootNodesForWorkspace(ctx context.Context, ws *idm.Workspace) error {

	acls, err := permissions.GetACLsForWorkspace(ctx, []string{ws.UUID}, &idm.ACLAction{Name: permissions.AclWsrootActionName})
	if err != nil {
		return err
	}
	ws.RootNodes = make(map[string]*tree.Node)
	if len(acls) == 0 {
		return nil
	}
	treeClient := tree.NewNodeProviderClient(registry.GetClient(common.SERVICE_TREE))
	for _, a := range acls {
		r, e := treeClient.ReadNode(ctx, &tree.ReadNodeRequest{Node: &tree.Node{Uuid: a.NodeID}})
		if e == nil && r != nil {
			ws.RootNodes[a.NodeID] = r.Node.WithoutReservedMetas()
		} else {
			// May be a virtual node
			if node, ok := views.GetVirtualNodesManager().ByUuid(a.NodeID); ok {
				ws.RootNodes[a.NodeID] = node
			}
		}
	}

	return nil

}

func (h *WorkspaceHandler) storeRootNodesAsACLs(ctx context.Context, ws *idm.Workspace, update bool) error {

	reassign := make(map[string][]*idm.ACLAction)
	aclClient := idm.NewACLServiceClient(common.SERVICE_GRPC_NAMESPACE_+common.SERVICE_ACL, defaults.NewClient())

	if update {
		// Delete current Root Nodes ACLs
		q, _ := ptypes.MarshalAny(&idm.ACLSingleQuery{
			WorkspaceIDs: []string{ws.UUID},
			Actions:      []*idm.ACLAction{{Name: permissions.AclWsrootActionName}, {Name: permissions.AclRecycleRoot.Name}},
		})
		_, e := aclClient.DeleteACL(ctx, &idm.DeleteACLRequest{Query: &service.Query{SubQueries: []*any.Any{q}}})
		if e != nil {
			return e
		}
		// Search ACLs to reassign, then delete them
		q2, _ := ptypes.MarshalAny(&idm.ACLSingleQuery{
			WorkspaceIDs: []string{ws.UUID},
		})
		q3, _ := ptypes.MarshalAny(&idm.ACLSingleQuery{
			NodeIDs: []string{"-1"},
			Not:     true,
		})
		q4, _ := ptypes.MarshalAny(&idm.ACLSingleQuery{
			RoleIDs: []string{"-1"},
			Not:     true,
		})
		query := &service.Query{SubQueries: []*any.Any{q2, q3, q4}, Operation: service.OperationType_AND}
		sClient, e := aclClient.SearchACL(ctx, &idm.SearchACLRequest{Query: query})
		if e != nil {
			return e
		}
		defer sClient.Close()
		for {
			r, e := sClient.Recv()
			if e != nil {
				break
			}
			reassign[r.ACL.RoleID] = append(reassign[r.ACL.RoleID], r.ACL.Action)
		}
		_, e = aclClient.DeleteACL(ctx, &idm.DeleteACLRequest{Query: query})
		if e != nil {
			return e
		}
	}

	if ws.RootNodes == nil {
		ws.RootNodes = map[string]*tree.Node{}
	}
	// Now store new roots as ACLs
	for nodeId, node := range ws.RootNodes {
		// Roots
		if _, e := aclClient.CreateACL(ctx, &idm.CreateACLRequest{ACL: &idm.ACL{
			WorkspaceID: ws.UUID,
			NodeID:      nodeId,
			Action:      &idm.ACLAction{Name: permissions.AclWsrootActionName, Value: node.GetPath()},
		}}); e != nil {
			return e
		}
		// Recycle Roots
		if _, e := aclClient.CreateACL(ctx, &idm.CreateACLRequest{ACL: &idm.ACL{
			WorkspaceID: ws.UUID,
			NodeID:      nodeId,
			Action:      permissions.AclRecycleRoot,
		}}); e != nil {
			return e
		}
		// Reassign if necessary
		if update && len(reassign) > 0 {
			for roleId, actions := range reassign {
				for _, action := range actions {
					acl := &idm.ACL{
						WorkspaceID: ws.UUID,
						RoleID:      roleId,
						NodeID:      nodeId,
						Action:      action,
					}
					if _, e := aclClient.CreateACL(ctx, &idm.CreateACLRequest{ACL: acl}); e != nil {
						return e
					}
				}
			}
		}
	}

	return nil
}

func (h *WorkspaceHandler) extractDefaultRights(ctx context.Context, workspace *idm.Workspace) (string, string) {
	var rightsValue, quotaValue string
	if workspace.Attributes != "" {
		var atts map[string]interface{}
		if e := json.Unmarshal([]byte(workspace.Attributes), &atts); e == nil {
			var modif bool
			if passed, ok := atts["DEFAULT_RIGHTS"]; ok {
				rightsValue = passed.(string)
				delete(atts, "DEFAULT_RIGHTS")
				modif = true
			}
			if q, ok := atts["QUOTA"]; ok {
				quotaValue = q.(string)
				delete(atts, "QUOTA")
				modif = true
			}
			if modif {
				jsonAttributes, _ := json.Marshal(atts)
				workspace.Attributes = string(jsonAttributes)
			}
		}
	}
	return rightsValue, quotaValue
}

func (h *WorkspaceHandler) bulkReadDefaultRights(ctx context.Context, uuids []string, wss map[string]*idm.Workspace) error {

	aclClient := idm.NewACLServiceClient(common.SERVICE_GRPC_NAMESPACE_+common.SERVICE_ACL, defaults.NewClient())
	// Load RootRole ACLs and append to Attributes
	q1, _ := ptypes.MarshalAny(&idm.ACLSingleQuery{
		WorkspaceIDs: uuids,
		RoleIDs:      []string{"ROOT_GROUP"},
	})
	q2, _ := ptypes.MarshalAny(&idm.ACLSingleQuery{
		Actions: []*idm.ACLAction{permissions.AclRead, permissions.AclWrite},
	})
	stream, err := aclClient.SearchACL(ctx, &idm.SearchACLRequest{
		Query: &service.Query{
			SubQueries: []*any.Any{q1, q2},
			Operation:  service.OperationType_AND,
		},
	})
	if err != nil {
		return err
	}
	defer stream.Close()
	rightStrings := make(map[string]string, len(uuids))
	for {
		r, e := stream.Recv()
		if e != nil {
			break
		}
		st := ""
		if s, o := rightStrings[r.ACL.WorkspaceID]; o {
			st = s
		}
		if r.ACL.Action.Name == permissions.AclRead.Name {
			st += "r"
		}
		if r.ACL.Action.Name == permissions.AclWrite.Name {
			st += "w"
		}
		rightStrings[r.ACL.WorkspaceID] = st
	}
	for uuid, right := range rightStrings {
		workspace := wss[uuid]
		attributes := make(map[string]interface{}, 1)
		if workspace.Attributes != "" {
			var atts map[string]interface{}
			if e := json.Unmarshal([]byte(workspace.Attributes), &atts); e == nil {
				attributes = atts
			}
		}
		attributes["DEFAULT_RIGHTS"] = right
		jsonAttributes, _ := json.Marshal(attributes)
		workspace.Attributes = string(jsonAttributes)
	}
	return nil
}

func (h *WorkspaceHandler) manageDefaultRights(ctx context.Context, workspace *idm.Workspace, read bool, rightsValue string, newQuota string) error {

	aclClient := idm.NewACLServiceClient(common.SERVICE_GRPC_NAMESPACE_+common.SERVICE_ACL, defaults.NewClient())
	if read {
		// Load RootRole ACLs and append to Attributes
		q1, _ := ptypes.MarshalAny(&idm.ACLSingleQuery{
			WorkspaceIDs: []string{workspace.UUID},
			RoleIDs:      []string{"ROOT_GROUP"},
		})
		q2, _ := ptypes.MarshalAny(&idm.ACLSingleQuery{
			Actions: []*idm.ACLAction{permissions.AclRead, permissions.AclWrite, permissions.AclQuota},
		})
		stream, err := aclClient.SearchACL(ctx, &idm.SearchACLRequest{
			Query: &service.Query{
				SubQueries: []*any.Any{q1, q2},
				Operation:  service.OperationType_AND,
			},
		})
		if err != nil {
			return err
		}
		defer stream.Close()
		var read, write bool
		var strQuota string
		for {
			r, e := stream.Recv()
			if e != nil {
				break
			}
			if r.ACL.Action.Name == permissions.AclRead.Name {
				read = true
			}
			if r.ACL.Action.Name == permissions.AclWrite.Name {
				write = true
			}
			if r.ACL.Action.Name == permissions.AclQuota.Name {
				strQuota = r.ACL.Action.Value
			}
		}
		s := ""
		if read {
			s += "r"
		}
		if write {
			s += "w"
		}
		attributes := make(map[string]interface{}, 1)
		if workspace.Attributes != "" {
			var atts map[string]interface{}
			if e := json.Unmarshal([]byte(workspace.Attributes), &atts); e == nil {
				attributes = atts
			}
		}
		attributes["DEFAULT_RIGHTS"] = s
		if strQuota != "" {
			attributes["QUOTA"] = strQuota
		}
		jsonAttributes, _ := json.Marshal(attributes)
		workspace.Attributes = string(jsonAttributes)

	} else {
		log.Logger(ctx).Debug("Manage default Rights: " + rightsValue)

		// Delete RootRole values first
		q1, _ := ptypes.MarshalAny(&idm.ACLSingleQuery{
			WorkspaceIDs: []string{workspace.UUID},
			RoleIDs:      []string{"ROOT_GROUP"},
		})
		q2, _ := ptypes.MarshalAny(&idm.ACLSingleQuery{
			Actions: []*idm.ACLAction{permissions.AclRead, permissions.AclWrite, permissions.AclQuota},
		})
		_, err := aclClient.DeleteACL(ctx, &idm.DeleteACLRequest{
			Query: &service.Query{
				SubQueries: []*any.Any{q1, q2},
				Operation:  service.OperationType_AND,
			},
		})
		if err != nil {
			return err
		}

		// Now Update RootRole
		if rightsValue == "" && newQuota == "" {
			return nil
		}
		read := strings.Contains(rightsValue, "r")
		write := strings.Contains(rightsValue, "w")
		for _, node := range workspace.RootNodes {
			// Create ACLs for root group
			if read {
				aclClient.CreateACL(ctx, &idm.CreateACLRequest{ACL: &idm.ACL{
					WorkspaceID: workspace.UUID,
					RoleID:      "ROOT_GROUP",
					NodeID:      node.Uuid,
					Action:      permissions.AclRead,
				}})
			}
			if write {
				aclClient.CreateACL(ctx, &idm.CreateACLRequest{ACL: &idm.ACL{
					WorkspaceID: workspace.UUID,
					RoleID:      "ROOT_GROUP",
					NodeID:      node.Uuid,
					Action:      permissions.AclWrite,
				}})
			}
			if newQuota != "" && newQuota != "0" {
				aclClient.CreateACL(ctx, &idm.CreateACLRequest{ACL: &idm.ACL{
					Action:      &idm.ACLAction{Name: permissions.AclQuota.Name, Value: newQuota},
					RoleID:      "ROOT_GROUP",
					WorkspaceID: workspace.UUID,
					NodeID:      node.Uuid,
				}})
			}
		}

	}

	return nil

}

func (h *WorkspaceHandler) allowCurrentUser(ctx context.Context, workspace *idm.Workspace) error {

	aclClient := idm.NewACLServiceClient(common.SERVICE_GRPC_NAMESPACE_+common.SERVICE_ACL, defaults.NewClient())

	if ctx.Value(claim.ContextKey) != nil {
		claims := ctx.Value(claim.ContextKey).(claim.Claims)
		userId := claims.Subject
		for _, node := range workspace.RootNodes {
			// Create ACLs for user id
			aclClient.CreateACL(ctx, &idm.CreateACLRequest{ACL: &idm.ACL{
				WorkspaceID: workspace.UUID,
				RoleID:      userId,
				NodeID:      node.Uuid,
				Action:      permissions.AclRead,
			}})
			aclClient.CreateACL(ctx, &idm.CreateACLRequest{ACL: &idm.ACL{
				WorkspaceID: workspace.UUID,
				RoleID:      userId,
				NodeID:      node.Uuid,
				Action:      permissions.AclWrite,
			}})
		}
	}
	return nil
}
