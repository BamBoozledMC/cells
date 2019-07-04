/*
 * Copyright (c) 2019. Abstrium SAS <team (at) pydio.com>
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

package merger

import (
	"context"
	"errors"

	"github.com/pydio/cells/common/proto/tree"
	"github.com/pydio/cells/common/sync/model"
)

// SolveConflicts tries to fix existing conflicts and return remaining ones
func (t *TreeDiff) SolveConflicts(ctx context.Context) (remaining []*Conflict, e error) {

	right := t.right
	left := t.left

	// Try to refresh UUIDs on target
	var refresher model.UuidFoldersRefresher
	var canRefresh, refresherRight, refresherLeft bool
	if refresher, canRefresh = right.(model.UuidFoldersRefresher); canRefresh {
		refresherRight = true
	} else if refresher, canRefresh = left.(model.UuidFoldersRefresher); canRefresh {
		refresherLeft = true
	}
	for _, c := range t.conflicts {
		var solved bool

		if c.Type == ConflictFolderUUID && canRefresh {
			var srcUuid *tree.Node
			if refresherRight {
				srcUuid = c.NodeLeft
			} else if refresherLeft {
				srcUuid = c.NodeRight
			}
			if _, e := refresher.UpdateFolderUuid(ctx, srcUuid); e == nil {
				solved = true
			}
		} else if c.Type == ConflictFileContent {
			// What can we do?
		}

		if !solved {
			remaining = append(remaining, c)
		}
	}

	t.conflicts = remaining
	if len(remaining) > 0 {
		e = errors.New("there are some conflicts in this diff")
	}
	return
}
