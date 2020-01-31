/*
 * Copyright 2007-2017 Charles du Jeu - Abstrium SAS <team (at) pyd.io>
 * This file is part of Pydio.
 *
 * Pydio is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Pydio is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Pydio.  If not, see <http://www.gnu.org/licenses/>.
 *
 * The latest code can be found at <https://pydio.com>.
 */

import React from 'react'
import {TextField, IconButton, Paper} from 'material-ui'

class NodeCard extends React.Component{

    constructor(props){
        super(props);
        let value = props.node.getValue();
        let dirty = false;
        if (!value){
            value = "// Compute the Path variable that this node must resolve to. \n// Use Ctrl+Space to see the objects available for completion.\nPath = \"\";";
        } else {
            dirty = true
        }
        this.state = {
            value: value,
            dirty: true
        };
    }

    onChange(event, newValue){
        this.setState({
            value: newValue,
            dirty: true
        });
    }

    save(){
        const {node, onSave = () => {}} = this.props;
        const {value} = this.state;

        node.setValue(value);

        node.save(() => {
            this.setState({
                dirty: false
            }, onSave);
        });
    }

    remove(){
        this.props.node.remove(() => {
            this.props.reloadList();
        });
    }

    render(){

        const {dataSources, node, readonly, oneLiner, adminStyles, onClose = () => {}} = this.props;

        let ds = {};
        if(dataSources){
            dataSources.map((d) => {
                ds[d.Name] = d.Name;
            });
        }
        const globalScope = {
            Path:'',
            DataSources:ds,
            User:{Name:''}
        };

        const codeMirrorField = (
            <AdminComponents.CodeMirrorField
                mode="javascript"
                globalScope={globalScope}
                value={this.state.value}
                onChange={this.onChange.bind(this)}
                readOnly={readonly}
            />
        );

        if(oneLiner) {
            return (
                <div style={{display:'flex'}}>
                    <div style={{flex: 1, lineHeight: "40px"}}>{codeMirrorField}</div>
                    <div style={{display: "flex"}}>
                        <IconButton iconClassName={"mdi mdi-content-save"} onClick={this.save.bind(this)} disabled={!this.state.dirty} tooltip={"Save"}/>
                        <IconButton iconClassName={"mdi mdi-close"} onClick={() => onClose()} tooltip={"Close"}/>
                    </div>
                </div>
            );
        } else {
            const titleComponent = (
                <div style={{display:'flex', alignItems:'center', height:48}}>
                    <div style={{flex: 1}}>{node.getName()}</div>
                    {!readonly &&
                        <div>
                            <IconButton iconClassName={"mdi mdi-content-save"} onClick={this.save.bind(this)} disabled={!this.state.dirty} tooltip={"Save"} {...adminStyles.props.header.iconButton}/>
                            <IconButton iconClassName={"mdi mdi-delete"}  onClick={this.remove.bind(this)} tooltip={"Delete"} disabled={node.getName() === 'cells' || node.getName() === 'my-files'} {...adminStyles.props.header.iconButton}/>
                        </div>
                    }
                </div>
            );
            return (
                <Paper {...adminStyles.body.block.props} style={{...adminStyles.body.block.container, marginBottom: 10}}>
                    <div style={adminStyles.body.block.headerFull}>{titleComponent}</div>
                    <div>{codeMirrorField}</div>
                </Paper>
            );
        }

    }

}

export {NodeCard as default}
