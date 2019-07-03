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

package acl

import (
	"context"
	"errors"
	"fmt"
	"strings"

	"github.com/gobuffalo/packr"
	"github.com/golang/protobuf/ptypes"
	"github.com/golang/protobuf/ptypes/any"
	migrate "github.com/rubenv/sql-migrate"
	"go.uber.org/zap"
	goqu "gopkg.in/doug-martin/goqu.v5"

	"github.com/pydio/cells/common"
	"github.com/pydio/cells/common/log"
	"github.com/pydio/cells/common/proto/idm"
	"github.com/pydio/cells/common/sql"
)

// FIXME this should be global
const (
	PQ_FORBIDDEN_DUPLICATE_MESSAGE = "duplicate key value violates unique constraint"
	MS_FORBIDDEN_DUPLICATE_MESSAGE = "Error 1062: Duplicate entry"
)

func IsDuplicateError(driver string, err error) bool {

	switch driver {
	case "mysql":
		return strings.Contains(err.Error(), MS_FORBIDDEN_DUPLICATE_MESSAGE)
	case "postgres":
		return strings.Contains(err.Error(), PQ_FORBIDDEN_DUPLICATE_MESSAGE)
	case "sqlite3":
		fmt.Println("FIXME: is this message duplicate error message:", err.Error())
		return false
	default:
		return false
	}

}

var (
	queries = map[string]string{
		// "AddACL":          `insert into idm_acls (action_name, action_value, role_id, workspace_id, node_id) values ($1, $2, $3, $4, $5) RETURNING id`,
		// "AddACLNode":      `insert into idm_acl_nodes (uuid) values ($1) RETURNING id`,
		// "AddACLRole":      `insert into idm_acl_roles (uuid) values ($1) RETURNING id`,
		// "AddACLWorkspace": `insert into idm_acl_workspaces (name) values ($1) RETURNING id`,
		// "GetACLNode":      `select id from idm_acl_nodes where uuid = $1`,
		// "GetACLRole":      `select id from idm_acl_roles where uuid = $1`,
		// "GetACLWorkspace": `select id from idm_acl_workspaces where name = $1`,
		"CleanWorkspaces": `DELETE FROM idm_acl_workspaces WHERE id != -1 and id NOT IN (select distinct(workspace_id) from idm_acls)`,
		"CleanRoles":      `DELETE FROM idm_acl_roles WHERE id != -1 and id NOT IN (select distinct(role_id) from idm_acls)`,
		"CleanNodes":      `DELETE FROM idm_acl_nodes WHERE id != -1 and id NOT IN (select distinct(node_id) from idm_acls)`,
	}
)

type sqlimpl struct {
	sql.DAO
}

type myOptions struct {
	common.ConfigValues
}

func (myOptions) Database(k string) (string, string) {
	return "postgres", "postgres://pydio:pydio@localhost:5432/cells?sslmode=disable"
}

// Init handler for the SQL DAO
func (dao *sqlimpl) Init(options common.ConfigValues) error {

	// tmpOptions := myOptions{options}
	// a, b := tmpOptions.Database("unused key")
	// fmt.Println("### [WARNING] hard coded DB DSN: ", a, b)
	// dao.DAO.Init(tmpOptions)

	// super
	dao.DAO.Init(options)

	// Doing the database migrations
	migrations := &sql.PackrMigrationSource{
		Box:         packr.NewBox("../../idm/acl/migrations"),
		Dir:         dao.Driver(),
		TablePrefix: dao.Prefix(),
	}

	_, err := sql.ExecMigration(dao.DB(), dao.Driver(), migrations, migrate.Up, "idm_acl_")
	if err != nil {
		return err
	}

	// Preparing the db statements
	if options.Bool("prepare", true) {
		for key, query := range queries {
			if err := dao.Prepare(key, query); err != nil {
				return err
			}
		}
	}

	return nil
}

// Add to the undelying SQL DB
func (dao *sqlimpl) Add(in interface{}) error {

	val, ok := in.(*idm.ACL)
	if !ok {
		return errors.New("Wrong type")
	}

	if val.Action == nil {
		return errors.New("Missing action value")
	}

	workspaceID := "-1"
	if val.WorkspaceID != "" {
		// id, err := dao.addWorkspace(val.WorkspaceID)
		id, err := dao.addWorkspaceWithGoqu(val.WorkspaceID)
		if err != nil {
			return err
		}
		workspaceID = id
	}

	nodeID := "-1"
	if val.NodeID != "" {
		// id, err := dao.addNode(val.NodeID)
		id, err := dao.addNodeWithGoqu(val.NodeID)
		if err != nil {
			return err
		}
		nodeID = id
	}

	roleID := "-1"
	if val.RoleID != "" {
		// id, err := dao.addRole(val.RoleID)
		id, err := dao.addRoleWithGoqu(val.RoleID)
		if err != nil {
			return err
		}
		roleID = id
	}

	log.Logger(context.Background()).Debug("AddACL",
		zap.String("r", roleID), zap.String("w", workspaceID), zap.String("n", nodeID), zap.Any("value", val))

	// stmt := dao.GetStmt("AddACL")
	// if stmt == nil {
	// 	return fmt.Errorf("Unknown statement")
	// }

	// var id int64
	// err := stmt.QueryRow(val.Action.Name, val.Action.Value, roleID, workspaceID, nodeID).Scan(&id)

	id, err := dao.addAclWithGoqu(val.Action.Name, val.Action.Value, roleID, workspaceID, nodeID)
	if err != nil {
		return err
	}
	val.ID = id

	return nil
}

func (dao *sqlimpl) addAclWithGoqu(actionName, actionValue, roleId, workspaceId, nodeId string) (string, error) {
	db := goqu.New(dao.Driver(), dao.DB())

	_, err := db.From("idm_acls").Insert(goqu.Record{"action_name": actionName,
		"action_value": actionValue, "role_id": roleId, "workspace_id": workspaceId, "node_id": nodeId}).Exec()
	if err != nil && !IsDuplicateError(dao.Driver(), err) {
		fmt.Printf("## Cannot insert ACL using [%s] dialect, error: %s\n", db.Dialect, err.Error())
		return "", err
	}

	var id int64
	found, err := db.From("idm_acl_workspaces").Select("id").Where(
		goqu.I("node_id").Eq(nodeId),
		goqu.I("action_name").Eq(actionName),
		goqu.I("role_id").Eq(roleId),
		goqu.I("workspace_id").Eq(workspaceId)).ScanVal(&id)
	if err != nil {
		return "", err
	}
	if !found {
		return "", fmt.Errorf("could not find ACL")
	}
	return fmt.Sprintf("%d", id), nil
}

// Search in the underlying SQL DB.
func (dao *sqlimpl) Search(query sql.Enquirer, acls *[]interface{}) error {

	db := goqu.New(dao.Driver(), dao.DB())

	expressions := []goqu.Expression{
		goqu.I("n.id").Eq(goqu.I("a.node_id")),
		goqu.I("w.id").Eq(goqu.I("a.workspace_id")),
		goqu.I("r.id").Eq(goqu.I("a.role_id")),
	}

	whereExpression := sql.NewQueryBuilder(query, new(queryConverter)).Expression(dao.Driver())
	if whereExpression != nil {
		expressions = append(expressions, whereExpression)
	}

	offset, limit := int64(0), int64(-1)
	if query.GetOffset() > 0 {
		offset = query.GetOffset()
	}
	if query.GetLimit() > 0 {
		limit = query.GetLimit()
	}

	// Prepared will fail with v4 and postgre
	dataset := db.From(
		goqu.I("idm_acls").As("a"),
		goqu.I("idm_acl_nodes").As("n"),
		goqu.I("idm_acl_workspaces").As("w"),
		goqu.I("idm_acl_roles").As("r"),
	).Prepared(true).Select(
		goqu.I("a.id").As("acl_id"),
		goqu.I("n.uuid").As("node_uuid"),
		goqu.I("a.action_name").As("acl_action_name"),
		goqu.I("a.action_value").As("acl_action_value"),
		goqu.I("r.uuid").As("role_uuid"),
		goqu.I("w.name").As("workspace_name"),
	)

	if limit > -1 {
		dataset = dataset.Offset(uint(offset)).Limit(uint(limit))
	}

	dataset = dataset.Where(expressions...)

	// rawStr, _, err := dataset.ToSql()
	// if err != nil {
	// 	fmt.Println("Cannot translate to SQL ", err.Error())
	// } else {
	// 	fmt.Println("Generated SQL ", rawStr)
	// }

	var items []struct {
		AclID          string `db:"acl_id"`
		NodeUUID       string `db:"node_uuid"`
		ACLActionName  string `db:"acl_action_name"`
		ACLActionValue string `db:"acl_action_value"`
		RoleUUID       string `db:"role_uuid"`
		WorkspaceName  string `db:"workspace_name"`
	}

	if err := dataset.ScanStructs(&items); err != nil {
		fmt.Println("could not retrieve ACL via search, cause: ", err.Error())
		return err
	}

	for _, item := range items {
		val := new(idm.ACL)
		action := new(idm.ACLAction)

		val.ID = item.AclID
		val.NodeID = item.NodeUUID
		val.RoleID = item.RoleUUID
		val.WorkspaceID = item.WorkspaceName

		action.Name = item.ACLActionName
		action.Value = item.ACLActionValue

		val.Action = action
		*acls = append(*acls, val)
	}

	return nil
}

// Del from the sql DB.
func (dao *sqlimpl) Del(query sql.Enquirer) (int64, error) {

	whereExpression := sql.NewQueryBuilder(query, new(queryConverter)).Expression(dao.Driver())
	queryString, args, err := sql.DeleteStringFromExpression("idm_acls", dao.Driver(), whereExpression)
	if err != nil {
		return 0, err
	}

	res, err := dao.DB().Exec(queryString, args...)
	if err != nil {
		return 0, err
	}

	rows, err := res.RowsAffected()
	if err != nil {
		return 0, err
	}

	if rows > 0 {
		// Perform clean up
		if stmt := dao.GetStmt("CleanWorkspaces"); stmt != nil {
			stmt.Exec()
		} else {
			return 0, fmt.Errorf("Unknown statement")
		}

		if stmt := dao.GetStmt("CleanRoles"); stmt != nil {
			stmt.Exec()
		} else {
			return 0, fmt.Errorf("Unknown statement")
		}

		if stmt := dao.GetStmt("CleanNodes"); stmt != nil {
			stmt.Exec()
		} else {
			return 0, fmt.Errorf("Unknown statement")
		}
	}

	return rows, nil
}

// func (dao *sqlimpl) addWorkspace(uuid string) (string, error) {

// 	// First try to insert to be as fast as possible
// 	if stmt := dao.GetStmt("AddACLWorkspace"); stmt != nil {
// 		var id int64
// 		err := stmt.QueryRow(uuid).Scan(&id)
// 		if err != nil && !IsDuplicateError(dao.Driver(), err) {
// 			fmt.Println("Cannot execute AddACLWorkspace", err.Error())
// 			return "", err
// 		}
// 		if id > 0 {
// 			return fmt.Sprintf("%d", id), nil
// 		}
// 	} else {
// 		return "", fmt.Errorf("Unknown statement")
// 	}

// 	// Try to retrieve existing when insertion has failed
// 	var idStr string
// 	if stmt := dao.GetStmt("GetACLWorkspace"); stmt != nil {

// 		row := stmt.QueryRow(uuid)
// 		if row == nil {
// 			return "", fmt.Errorf("Did not found workspace")
// 		}
// 		row.Scan(&idStr)
// 	} else {
// 		return "", fmt.Errorf("Unknown statement")
// 	}

// 	return idStr, nil
// }

func (dao *sqlimpl) addWorkspaceWithGoqu(uuid string) (string, error) {
	db := goqu.New(dao.Driver(), dao.DB())

	_, err := db.From("idm_acl_workspaces").Insert(goqu.Record{"name": uuid}).Exec()
	if err != nil && !IsDuplicateError(dao.Driver(), err) {
		fmt.Printf("## Cannot insert using [%s] dialect, error: %s\n", db.Dialect, err.Error())
		return "", err
	}

	var id int64
	found, err := db.From("idm_acl_workspaces").Select("id").Where(goqu.I("name").Eq(uuid)).ScanVal(&id)
	if err != nil {
		return "", err
	}
	if !found {
		return "", fmt.Errorf("Did not found workspace")
	}
	return fmt.Sprintf("%d", id), nil
}

// func (dao *sqlimpl) addNode(uuid string) (string, error) {

// 	if stmt := dao.GetStmt("AddACLNode"); stmt != nil {
// 		var id int64
// 		err := stmt.QueryRow(uuid).Scan(&id)
// 		if err != nil && !IsDuplicateError(dao.Driver(), err) {
// 			fmt.Println("Cannot execute AddACLNode", err.Error())
// 			return "", err

// 		}
// 		if id > 0 {
// 			return fmt.Sprintf("%d", id), nil
// 		}
// 	} else {
// 		return "", fmt.Errorf("Unknown statement")
// 	}

// 	// Try to retrieve existing when insertion has failed
// 	var idStr string
// 	if stmt := dao.GetStmt("GetACLNode"); stmt != nil {

// 		row := stmt.QueryRow(uuid)
// 		if row == nil {
// 			return "", fmt.Errorf("Did not found acl node")
// 		}
// 		row.Scan(&idStr)
// 	} else {
// 		return "", fmt.Errorf("Unknown statement")
// 	}

// 	return idStr, nil
// }

func (dao *sqlimpl) addNodeWithGoqu(uuid string) (string, error) {
	db := goqu.New(dao.Driver(), dao.DB())

	_, err := db.From("idm_acl_nodes").Insert(goqu.Record{"uuid": uuid}).Exec()
	if err != nil && !IsDuplicateError(dao.Driver(), err) {
		fmt.Printf("## Cannot insert Node ACL using [%s] dialect, error: %s\n", db.Dialect, err.Error())
		return "", err
	}

	var id int64
	found, err := db.From("idm_acl_nodes").Select("id").Where(goqu.I("uuid").Eq(uuid)).ScanVal(&id)
	if err != nil {
		return "", err
	}
	if !found {
		return "", fmt.Errorf("Did not found ACL node")
	}
	return fmt.Sprintf("%d", id), nil
}

// func (dao *sqlimpl) addRole(uuid string) (string, error) {

// 	if stmt := dao.GetStmt("AddACLRole"); stmt != nil {
// 		var id int64
// 		err := stmt.QueryRow(uuid).Scan(&id)
// 		if err != nil && !IsDuplicateError(dao.Driver(), err) {
// 			fmt.Println("Cannot execute AddACLRole", err.Error())
// 			return "", err
// 		}
// 		if id > 0 {
// 			return fmt.Sprintf("%d", id), nil
// 		}
// 	} else {
// 		return "", fmt.Errorf("Unknown statement")
// 	}

// 	// Try to retrieve existing when insertion has failed
// 	var idStr string
// 	if stmt := dao.GetStmt("GetACLRole"); stmt != nil {

// 		row := stmt.QueryRow(uuid)
// 		if row == nil {
// 			return "", fmt.Errorf("Did not found acl role")
// 		}
// 		row.Scan(&idStr)
// 	} else {
// 		return "", fmt.Errorf("Unknown statement")
// 	}

// 	return idStr, nil
// }

func (dao *sqlimpl) addRoleWithGoqu(uuid string) (string, error) {
	db := goqu.New(dao.Driver(), dao.DB())

	_, err := db.From("idm_acl_roles").Insert(goqu.Record{"uuid": uuid}).Exec()
	if err != nil && !IsDuplicateError(dao.Driver(), err) {
		fmt.Printf("## Cannot insert Role ACL using [%s] dialect, error: %s\n", db.Dialect, err.Error())
		return "", err
	}

	var id int64
	found, err := db.From("idm_acl_roles").Select("id").Where(goqu.I("uuid").Eq(uuid)).ScanVal(&id)
	if err != nil {
		return "", err
	}
	if !found {
		return "", fmt.Errorf("Did not found ACL role")
	}
	return fmt.Sprintf("%d", id), nil
}

type queryConverter idm.ACLSingleQuery

func (c *queryConverter) Convert(val *any.Any, driver string) (goqu.Expression, bool) {

	q := new(idm.ACLSingleQuery)

	if err := ptypes.UnmarshalAny(val, q); err != nil {
		return nil, false
	}

	db := goqu.New(driver, nil)
	var expressions []goqu.Expression

	if len(q.RoleIDs) > 0 {
		dataset := db.From("idm_acl_roles").Select("id")
		dataset = dataset.Where(sql.GetExpressionForString(false, "uuid", q.RoleIDs...))
		str, _, err := dataset.ToSql()
		if err != nil {
			return nil, true
		}
		expressions = append(expressions, goqu.I("role_id").In(goqu.L(str)))
	}

	if len(q.WorkspaceIDs) > 0 {
		dataset := db.From("idm_acl_workspaces").Select("id")
		dataset = dataset.Where(sql.GetExpressionForString(false, "name", q.WorkspaceIDs...))
		str, _, err := dataset.ToSql()
		if err != nil {
			return nil, true
		}
		expressions = append(expressions, goqu.I("workspace_id").In(goqu.L(str)))
	}

	if len(q.NodeIDs) > 0 {

		dataset := db.From("idm_acl_nodes").Select("id")
		dataset = dataset.Where(sql.GetExpressionForString(false, "uuid", q.NodeIDs...))
		str, _, err := dataset.ToSql()
		if err != nil {
			return nil, true
		}
		expressions = append(expressions, goqu.I("node_id").In(goqu.L(str)))
	}

	// Special case for Actions
	if len(q.Actions) > 0 {
		actionsByName := make(map[string][]string) // actionName => actionValues
		for _, act := range q.Actions {
			values, exists := actionsByName[act.Name]
			if !exists {
				values = []string{}
			}
			if act.Value != "" {
				values = append(values, act.Value)
			}
			actionsByName[act.Name] = values
		}

		var orExpression []goqu.Expression
		//var orWheres []string
		for actName, actValues := range actionsByName {
			var actionAndExpression []goqu.Expression

			actionAndExpression = append(actionAndExpression, sql.GetExpressionForString(false, "action_name", actName))
			if len(actValues) > 0 {
				actionAndExpression = append(actionAndExpression, sql.GetExpressionForString(false, "action_value", actValues...))
				orExpression = append(orExpression, goqu.And(actionAndExpression...))
			} else {
				orExpression = append(orExpression, actionAndExpression...)
			}
		}
		expressions = append(expressions, goqu.Or(orExpression...))
	}

	return goqu.And(expressions...), true
}

// Internal helper functions

func quote(v string) string {
	if v == "" {
		return ""
	}
	return fmt.Sprintf(`"%s"`, v)
}

func applyMapping(vs []string, f func(string) string) []string {
	vsm := make([]string, len(vs))
	for i, v := range vs {
		vsm[i] = f(v)
	}
	return vsm
}
