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

package archive

import (
	"context"
	"fmt"
	"path"
	"path/filepath"
	"strings"

	"github.com/pydio/cells/common/log"

	"github.com/micro/go-micro/client"
	"github.com/micro/go-micro/errors"

	"github.com/pydio/cells/common"
	"github.com/pydio/cells/common/forms"
	"github.com/pydio/cells/common/proto/jobs"
	"github.com/pydio/cells/common/proto/tree"
	"github.com/pydio/cells/common/views"
	"github.com/pydio/cells/scheduler/actions"
)

var (
	extractActionName = "actions.archive.extract"
)

type ExtractAction struct {
	Router     *views.Router
	Format     string
	TargetName string
}

func (ex *ExtractAction) GetDescription(lang ...string) actions.ActionDescription {
	return actions.ActionDescription{
		ID:                extractActionName,
		Label:             "Extract Archive",
		Icon:              "package-up",
		Category:          actions.ActionCategoryArchives,
		Description:       "Extract files and folders from a Zip, Tar or Tar.gz archive",
		SummaryTemplate:   "",
		HasForm:           true,
		InputDescription:  "Single-node selection pointing to an archive to extract",
		OutputDescription: "One node pointing to the parent folder where all files where extracted.",
	}
}

func (ex *ExtractAction) GetParametersForm() *forms.Form {
	return &forms.Form{Groups: []*forms.Group{
		{
			Fields: []forms.Field{
				&forms.FormField{
					Name:        "format",
					Type:        forms.ParamSelect,
					Label:       "Archive format",
					Description: "The format of the archive",
					Default:     "",
					Mandatory:   true,
					Editable:    true,
					ChoicePresetList: []map[string]string{
						{zipFormat: "Zip"},
						{tarFormat: "Tar"},
						{tarGzFormat: "TarGz"},
					},
				},
				&forms.FormField{
					Name:        "target",
					Type:        "string",
					Label:       "Archive path",
					Description: "FullPath to the new archive",
					Default:     "",
					Mandatory:   false,
					Editable:    true,
				},
			},
		},
	}}
}

// GetName returns this action unique identifier
func (ex *ExtractAction) GetName() string {
	return extractActionName
}

// Init passes parameters to the action
func (ex *ExtractAction) Init(job *jobs.Job, cl client.Client, action *jobs.Action) error {
	ex.Router = views.NewStandardRouter(views.RouterOptions{AdminView: true})
	if format, ok := action.Parameters["format"]; ok {
		ex.Format = format
	}
	if target, ok := action.Parameters["target"]; ok {
		ex.TargetName = target
	}
	return nil
}

// Run the actual action code
func (ex *ExtractAction) Run(ctx context.Context, channels *actions.RunnableChannels, input jobs.ActionMessage) (jobs.ActionMessage, error) {

	if len(input.Nodes) == 0 {
		return input.WithIgnore(), nil
	}
	archiveNode := input.Nodes[0]
	ext := filepath.Ext(archiveNode.Path)
	if ext == ".gz" && strings.HasSuffix(archiveNode.Path, ".tar.gz") {
		ext = ".tar.gz"
	}

	format := ex.Format
	if format == "" {
		format = strings.TrimLeft(ext, ".")
	}
	targetName := jobs.EvaluateFieldStr(ctx, input, ex.TargetName)
	if targetName == "" {
		base := strings.TrimSuffix(filepath.Base(archiveNode.Path), ext)
		targetName = computeTargetName(ctx, ex.Router, filepath.Dir(archiveNode.Path), base)
	}
	targetNode := &tree.Node{Path: targetName, Type: tree.NodeType_COLLECTION}
	_, e := ex.Router.CreateNode(ctx, &tree.CreateNodeRequest{Node: targetNode})
	if e != nil {
		return input.WithError(e), e
	}

	reader := &views.ArchiveReader{
		Router: ex.Router,
	}
	var err error
	switch format {
	case "zip":
		err = reader.ExtractAllZip(ctx, archiveNode, targetNode, channels.StatusMsg)
		break
	case "tar":
		err = reader.ExtractAllTar(ctx, false, archiveNode, targetNode, channels.StatusMsg)
		break
	case "tar.gz":
		err = reader.ExtractAllTar(ctx, true, archiveNode, targetNode, channels.StatusMsg)
		break
	default:
		err = errors.BadRequest(common.SERVICE_JOBS, "Unsupported archive format:"+format)
	}
	if err != nil {
		// Remove failed extraction folder ?
		// ex.Router.DeleteNode(ctx, &tree.DeleteNodeRequest{Node: targetNode})
		return input.WithError(err), err
	}

	log.TasksLogger(ctx).Info(fmt.Sprintf("Archive %s was extracted in %s", path.Base(archiveNode.Path), targetNode.GetPath()))

	output := input.WithNode(targetNode)

	return output, nil
}
