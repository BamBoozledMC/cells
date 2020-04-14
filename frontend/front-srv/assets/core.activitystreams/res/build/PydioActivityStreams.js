(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.PydioActivityStreams = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _pydio = require('pydio');

var _pydio2 = _interopRequireDefault(_pydio);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMarkdown = require('react-markdown');

var _reactMarkdown2 = _interopRequireDefault(_reactMarkdown);

var _materialUi = require('material-ui');

var _materialUiStyles = require('material-ui/styles');

var _pydioUtilPath = require('pydio/util/path');

var _pydioUtilPath2 = _interopRequireDefault(_pydioUtilPath);

var _DocLink = require('./DocLink');

var _DocLink2 = _interopRequireDefault(_DocLink);

var _Pydio$requireLib = _pydio2['default'].requireLib('components');

var UserAvatar = _Pydio$requireLib.UserAvatar;

var _Pydio$requireLib2 = _pydio2['default'].requireLib('boot');

var PydioContextConsumer = _Pydio$requireLib2.PydioContextConsumer;

var _Pydio$requireLib3 = _pydio2['default'].requireLib('workspaces');

var FilePreview = _Pydio$requireLib3.FilePreview;

var _Pydio$requireLib4 = _pydio2['default'].requireLib('boot');

var moment = _Pydio$requireLib4.moment;

var Paragraph = (function (_React$Component) {
    _inherits(Paragraph, _React$Component);

    function Paragraph() {
        _classCallCheck(this, Paragraph);

        _get(Object.getPrototypeOf(Paragraph.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(Paragraph, [{
        key: 'render',
        value: function render() {
            return _react2['default'].createElement(
                'span',
                null,
                this.props.children
            );
        }
    }]);

    return Paragraph;
})(_react2['default'].Component);

function workspacesLocations(pydio, object) {
    var workspaces = [];
    if (!object.partOf || !object.partOf.items || !object.partOf.items.length) {
        return "No workspace found";
    }

    var _loop = function (i) {
        var ws = object.partOf.items[i];
        // Remove slug part
        //let paths = ws.rel.split('/');
        //paths.shift();
        //let relPath = paths.join('/');
        workspaces.push(_react2['default'].createElement(
            'a',
            { key: ws.id, onClick: function () {
                    return pydio.triggerRepositoryChange(ws.id);
                }, style: { cursor: 'pointer' } },
            ws.name
        ));
        workspaces.push(_react2['default'].createElement(
            'span',
            { key: ws.id + '-sep' },
            ', '
        ));
    };

    for (var i = 0; i < object.partOf.items.length; i++) {
        _loop(i);
    }
    workspaces.pop();
    return _react2['default'].createElement(
        'span',
        null,
        pydio.MessageHash['notification_center.16'],
        ' ',
        _react2['default'].createElement(
            'span',
            null,
            workspaces
        )
    );
}

function LinkWrapper(pydio, activity) {
    var style = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];

    return _react2['default'].createClass({

        render: function render() {
            var _props = this.props;
            var href = _props.href;
            var children = _props.children;

            var linkStyle = _extends({
                cursor: 'pointer',
                color: 'rgb(66, 140, 179)',
                fontWeight: 500
            }, style);
            var title = "";
            var onClick = null;
            if (href.startsWith('doc://')) {
                if (activity.type === 'Delete') {
                    return _react2['default'].createElement(
                        'a',
                        { style: { textDecoration: 'line-through' } },
                        children
                    );
                } else {
                    return _react2['default'].createElement(
                        _DocLink2['default'],
                        { pydio: pydio, activity: activity, linkStyle: linkStyle },
                        children
                    );
                }
            } else if (href.startsWith('user://')) {
                var userId = href.replace('user://', '');
                return _react2['default'].createElement(UserAvatar, { userId: userId, displayAvatar: false, richOnClick: true, style: _extends({}, linkStyle, { display: 'inline-block' }), pydio: pydio });
            } else if (href.startsWith('workspaces://')) {
                (function () {
                    var wsId = href.replace('workspaces://', '');
                    if (pydio.user && pydio.user.getRepositoriesList().get(wsId)) {
                        onClick = function () {
                            pydio.triggerRepositoryChange(wsId);
                        };
                    }
                })();
            }
            return _react2['default'].createElement(
                'a',
                { title: title, style: linkStyle, onClick: onClick },
                children
            );
        }
    });
}

var Activity = (function (_React$Component2) {
    _inherits(Activity, _React$Component2);

    function Activity() {
        _classCallCheck(this, Activity);

        _get(Object.getPrototypeOf(Activity.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(Activity, [{
        key: 'computeIcon',
        value: function computeIcon(activity) {
            var className = '';
            var title = undefined;
            switch (activity.type) {
                case "Create":
                    if (activity.object.type === 'Document') {
                        className = "file-plus";
                    } else {
                        className = "folder-plus";
                    }
                    title = "Created";
                    break;
                case "Delete":
                    className = "delete";
                    title = "Deleted";
                    break;
                case "Edit":
                case "Update":
                    className = "pencil";
                    title = "Modified";
                    break;
                case "UpdateMeta":
                    className = "tag-multiple";
                    title = "Modified";
                    break;
                case "UpdateComment":
                    className = "message-outline";
                    title = "Commented";
                    break;
                case "Read":
                    className = "eye";
                    title = "Accessed";
                    break;
                case "Move":
                    className = "file-send";
                    title = "Moved";
                    break;
                case "Share":
                    className = "share-variant";
                    if (activity.object.type === "Cell") {
                        className = "icomoon-cells";
                    } else if (activity.object.type === "Workspace") {
                        className = "folder";
                    }
                    title = "Shared";
                    break;
                default:
                    break;
            }
            if (className.indexOf('icomoon-') === -1) {
                className = 'mdi mdi-' + className;
            }
            return { title: title, className: className };
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props;
            var pydio = _props2.pydio;
            var activity = _props2.activity;
            var listContext = _props2.listContext;
            var displayContext = _props2.displayContext;
            var oneLiner = _props2.oneLiner;
            var muiTheme = _props2.muiTheme;

            var secondary = activity.type + " - " + activity.actor.name;
            if (activity.summary) {
                secondary = _react2['default'].createElement(_reactMarkdown2['default'], { source: activity.summary, renderers: { 'paragraph': Paragraph, 'link': LinkWrapper(pydio, activity, { color: 'inherit' }) } });
            }

            var summary = undefined,
                summaryStyle = undefined;
            var actionIcon = undefined;
            var blockStyle = {
                margin: '0px 10px 6px'
            };
            if (displayContext === 'popover') {
                summaryStyle = {
                    fontSize: 13,
                    color: 'rgba(0,0,0,0.53)',
                    margin: '6px 0',
                    padding: 6
                };
            } else {
                summaryStyle = {
                    padding: '6px 22px 12px',
                    marginTop: 6,
                    borderRadius: 2,
                    borderLeft: '2px solid #e0e0e0',
                    marginLeft: 13,
                    color: 'rgba(0,0,0,0.33)',
                    /*fontWeight: 500,
                    fontStyle: 'italic',*/
                    overflow: 'hidden'
                };
            }

            var _computeIcon = this.computeIcon(activity);

            var title = _computeIcon.title;
            var className = _computeIcon.className;

            if (listContext === 'NODE-LEAF') {

                blockStyle = { margin: '16px 10px' };
                actionIcon = _react2['default'].createElement(_materialUi.FontIcon, { className: className, title: title, style: { fontSize: 17, color: 'rgba(0,0,0,0.17)' } });
            } else {

                if (displayContext === 'popover') {
                    blockStyle = { margin: 0 };
                    var nodes = (0, _DocLink.nodesFromObject)(activity.object, pydio);
                    var icon = undefined,
                        primaryText = undefined;
                    if (nodes.length) {
                        var previewStyles = {
                            style: {
                                height: 36,
                                width: 36,
                                borderRadius: '50%'
                            },
                            mimeFontStyle: {
                                fontSize: 20,
                                lineHeight: '36px',
                                textAlign: 'center'
                            }
                        };
                        icon = _react2['default'].createElement(
                            'div',
                            { style: { padding: '12px 20px 12px 20px', position: 'relative' } },
                            _react2['default'].createElement(FilePreview, _extends({ pydio: pydio, node: nodes[0], loadThumbnail: true }, previewStyles)),
                            _react2['default'].createElement('span', { className: className, style: { position: 'absolute', bottom: 8, right: 12, fontSize: 18, color: muiTheme.palette.accent2Color } })
                        );
                        primaryText = nodes[0].getLabel() || _pydioUtilPath2['default'].getBasename(nodes[0].getPath());
                    } else {
                        icon = _react2['default'].createElement(
                            'div',
                            { style: { margin: '12px 20px 12px 20px', backgroundColor: 'rgb(237, 240, 242)', alignItems: 'initial', height: 36, width: 36, borderRadius: '50%', textAlign: 'center' } },
                            _react2['default'].createElement(_materialUi.FontIcon, { className: className, style: { lineHeight: '36px', color: muiTheme.palette.accent2Color } })
                        );
                        primaryText = activity.object.name;
                    }
                    summary = _react2['default'].createElement(
                        'div',
                        { style: { display: 'flex', alignItems: 'flex-start', overflow: 'hidden', paddingBottom: 8 } },
                        icon,
                        _react2['default'].createElement(
                            'div',
                            { style: { flex: 1, overflow: 'hidden', paddingRight: 16 } },
                            _react2['default'].createElement(
                                'div',
                                { style: { marginTop: 12, marginBottom: 2, fontSize: 15, color: 'rgba(0,0,0,.87)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' } },
                                primaryText
                            ),
                            _react2['default'].createElement(
                                'div',
                                { style: { color: 'rgba(0,0,0,.33)' } },
                                secondary
                            )
                        )
                    );
                } else {
                    summary = _react2['default'].createElement(
                        'div',
                        { style: summaryStyle },
                        secondary
                    );
                }
            }

            return _react2['default'].createElement(
                'div',
                { style: blockStyle },
                !oneLiner && _react2['default'].createElement(
                    'div',
                    { style: { display: 'flex', alignItems: 'center' } },
                    _react2['default'].createElement(UserAvatar, {
                        useDefaultAvatar: true,
                        userId: activity.actor.id,
                        userLabel: activity.actor.name,
                        displayLocalLabel: true,
                        userType: 'user',
                        pydio: pydio,
                        style: { display: 'flex', alignItems: 'center', maxWidth: '60%' },
                        labelStyle: { fontSize: 14, paddingLeft: 10, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
                        avatarStyle: { flexShrink: 0 },
                        avatarSize: 28,
                        richOnHover: true
                    }),
                    _react2['default'].createElement(
                        'span',
                        { style: { fontSize: 13, display: 'inline-block', flex: 1, height: 18, color: 'rgba(0,0,0,0.23)', fontWeight: 500, paddingLeft: 8, whiteSpace: 'nowrap' } },
                        moment(activity.updated).fromNow()
                    ),
                    actionIcon
                ),
                summary
            );
        }
    }]);

    return Activity;
})(_react2['default'].Component);

Activity.PropTypes = {
    activity: _react2['default'].PropTypes.object,
    listContext: _react2['default'].PropTypes.string,
    displayContext: _react2['default'].PropTypes.oneOf(['infoPanel', 'popover'])
};

exports['default'] = Activity = (0, _materialUiStyles.muiThemeable)()(Activity);
exports['default'] = Activity = PydioContextConsumer(Activity);
exports['default'] = Activity;
module.exports = exports['default'];

},{"./DocLink":5,"material-ui":"material-ui","material-ui/styles":"material-ui/styles","pydio":"pydio","pydio/util/path":"pydio/util/path","react":"react","react-markdown":"react-markdown"}],2:[function(require,module,exports){
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
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUi = require('material-ui');

var _pydio = require('pydio');

var _pydio2 = _interopRequireDefault(_pydio);

var _Client = require('./Client');

var _Client2 = _interopRequireDefault(_Client);

var _Activity = require('./Activity');

var _Activity2 = _interopRequireDefault(_Activity);

var _Pydio$requireLib = _pydio2['default'].requireLib('boot');

var PydioContextConsumer = _Pydio$requireLib.PydioContextConsumer;
var moment = _Pydio$requireLib.moment;

var _Pydio$requireLib2 = _pydio2['default'].requireLib('components');

var EmptyStateView = _Pydio$requireLib2.EmptyStateView;

var ActivityList = (function (_React$Component) {
    _inherits(ActivityList, _React$Component);

    function ActivityList(props) {
        _classCallCheck(this, ActivityList);

        _get(Object.getPrototypeOf(ActivityList.prototype), 'constructor', this).call(this, props);
        if (props.items) {
            this.state = { data: { items: props.items }, offset: 0, loadMore: false, loading: false };
        } else {
            this.state = { data: [], offset: 0, loadMore: true, loading: false };
        }
    }

    _createClass(ActivityList, [{
        key: 'mergeMoreFeed',
        value: function mergeMoreFeed(currentFeed, newFeed) {
            var currentIds = currentFeed.items.map(function (item) {
                return item.id;
            });
            var filtered = newFeed.items.filter(function (item) {
                return currentIds.indexOf(item.id) === -1;
            });
            if (!filtered.length) {
                this.setState({ loadMore: false });
                return currentFeed;
            }
            var merged = currentFeed;
            merged.items = [].concat(_toConsumableArray(currentFeed.items), _toConsumableArray(filtered));
            merged.totalItems = merged.items.length;
            return merged;
        }
    }, {
        key: 'loadForProps',
        value: function loadForProps(props) {
            var _this = this;

            var context = props.context;
            var pointOfView = props.pointOfView;
            var contextData = props.contextData;
            var limit = props.limit;
            var _state = this.state;
            var offset = _state.offset;
            var data = _state.data;

            if (limit === undefined) {
                limit = -1;
            }
            if (offset > 0) {
                limit = 100;
            }
            this.setState({ loading: true, error: null });
            _Client2['default'].loadActivityStreams(context, contextData, 'outbox', pointOfView, offset, limit).then(function (json) {
                if (offset > 0 && data && data.items) {
                    if (json && json.items) _this.setState({ data: _this.mergeMoreFeed(data, json) });
                } else {
                    _this.setState({ data: json });
                }
                if (!json || !json.items || !json.items.length) {
                    _this.setState({ loadMore: false });
                }
                _this.setState({ loading: false });
            })['catch'](function (msg) {
                _this.setState({ loading: false, error: msg });
            });
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _props = this.props;
            var items = _props.items;
            var contextData = _props.contextData;

            if (items) {
                return;
            }
            if (contextData) {
                this.loadForProps(this.props);
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _this2 = this;

            if (nextProps.items) {
                this.setState({ data: { items: nextProps.items }, offset: 0, loadMore: false });
                return;
            }
            if (nextProps.contextData !== this.props.contextData || nextProps.context !== this.props.context) {
                this.setState({ offset: 0, loadMore: true }, function () {
                    _this2.loadForProps(nextProps);
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var content = [];
            var _state2 = this.state;
            var data = _state2.data;
            var loadMore = _state2.loadMore;
            var loading = _state2.loading;
            var error = _state2.error;
            var _props2 = this.props;
            var listContext = _props2.listContext;
            var groupByDate = _props2.groupByDate;
            var displayContext = _props2.displayContext;
            var pydio = _props2.pydio;

            var previousFrom = undefined;
            var emptyStateIcon = "mdi mdi-pulse";
            var emptyStateString = loading ? pydio.MessageHash['notification_center.17'] : pydio.MessageHash['notification_center.18'];
            if (error) {
                emptyStateString = error.Detail || error.msg || error;
                emptyStateIcon = "mdi mdi-alert-circle-outline";
            }
            if (data !== null && data.items) {
                data.items.forEach(function (ac, i) {

                    var fromNow = moment(ac.updated).fromNow();
                    if (groupByDate && fromNow !== previousFrom) {
                        if (content.length) {
                            content.pop(); // remove last divider
                            content.push(_react2['default'].createElement(
                                'div',
                                { style: { padding: '20px 16px 0', fontSize: 13, color: 'rgba(147, 168, 178, 0.67)', fontWeight: 500 } },
                                fromNow
                            ));
                        } else {
                            content.push(_react2['default'].createElement(
                                'div',
                                { style: { padding: '0 16px', fontSize: 13, color: 'rgba(147, 168, 178, 0.67)', fontWeight: 500 } },
                                fromNow
                            ));
                        }
                    }
                    content.push(_react2['default'].createElement(_Activity2['default'], { key: ac.id, activity: ac, listContext: listContext, oneLiner: groupByDate, displayContext: displayContext }));
                    if (groupByDate) {
                        previousFrom = fromNow;
                        content.push(_react2['default'].createElement('div', { style: { borderTop: '1px solid rgba(0,0,0,.03)', width: '100%' } }));
                    }
                });
                if (groupByDate) {
                    content.pop(); // remove last divider
                }
            }
            if (content.length && loadMore) {
                var loadAction = function loadAction() {
                    _this3.setState({ offset: data.items.length + 1 }, function () {
                        _this3.loadForProps(_this3.props);
                    });
                };
                content.push(_react2['default'].createElement(
                    'div',
                    { style: { paddingLeft: 16 } },
                    _react2['default'].createElement(_materialUi.FlatButton, { primary: true, label: loading ? pydio.MessageHash['notification_center.20'] : pydio.MessageHash['notification_center.19'], disabled: loading, onTouchTap: loadAction })
                ));
            }
            if (content.length) {
                return _react2['default'].createElement(
                    _materialUi.List,
                    { style: this.props.style },
                    content
                );
            } else {
                var style = { backgroundColor: 'transparent' };
                var iconStyle = undefined,
                    legendStyle = undefined;
                if (displayContext === 'popover') {
                    style = _extends({}, style, { minHeight: 250 });
                } else if (displayContext === 'infoPanel') {
                    style = _extends({}, style, { paddingBottom: 20 });
                    iconStyle = { fontSize: 40 };
                    legendStyle = { fontSize: 13, fontWeight: 400 };
                }
                return _react2['default'].createElement(EmptyStateView, {
                    pydio: this.props.pydio,
                    iconClassName: emptyStateIcon,
                    primaryTextId: emptyStateString,
                    style: style,
                    iconStyle: iconStyle,
                    legendStyle: legendStyle
                });
            }
        }
    }]);

    return ActivityList;
})(_react2['default'].Component);

ActivityList.PropTypes = {
    context: _react2['default'].PropTypes.string,
    contextData: _react2['default'].PropTypes.string,
    boxName: _react2['default'].PropTypes.string,
    pointOfView: _react2['default'].PropTypes.oneOf(['GENERIC', 'ACTOR', 'SUBJECT']),
    displayContext: _react2['default'].PropTypes.oneOf(['mainList', 'infoPanel', 'popover'])
};

exports['default'] = ActivityList = PydioContextConsumer(ActivityList);
exports['default'] = ActivityList;
module.exports = exports['default'];

},{"./Activity":1,"./Client":4,"material-ui":"material-ui","pydio":"pydio","react":"react"}],3:[function(require,module,exports){
/*
 * Copyright 2007-2018 Charles du Jeu - Abstrium SAS <team (at) pyd.io>
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
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _pydioHttpApi = require('pydio/http/api');

var _pydioHttpApi2 = _interopRequireDefault(_pydioHttpApi);

var _pydioHttpRestApi = require('pydio/http/rest-api');

var Callbacks = (function () {
    function Callbacks() {
        _classCallCheck(this, Callbacks);
    }

    _createClass(Callbacks, null, [{
        key: 'toggleWatch',
        value: function toggleWatch(manager, args) {

            if (args) {
                (function () {

                    var node = pydio.getUserSelection().getUniqueNode();
                    var nodeUuid = node.getMetadata().get('uuid');
                    var userId = pydio.user.id;
                    var subscription = new _pydioHttpRestApi.ActivitySubscription();
                    var type = new _pydioHttpRestApi.ActivityOwnerType();
                    subscription.UserId = userId;
                    subscription.ObjectId = nodeUuid;
                    subscription.ObjectType = type.NODE;
                    var events = [];
                    if (args === 'watch_change' || args === 'watch_both') {
                        events.push('change');
                    }
                    if (args === 'watch_read' || args === 'watch_both') {
                        events.push('read');
                    }
                    subscription.Events = events;
                    var api = new _pydioHttpRestApi.ActivityServiceApi(_pydioHttpApi2['default'].getRestClient());
                    api.subscribe(subscription).then(function (outSub) {
                        var overlay = node.getMetadata().get('overlay_class') || '';
                        if (args === 'watch_stop') {
                            node.getMetadata()['delete']('meta_watched');
                            node.getMetadata().set('overlay_class', overlay.replace('mdi mdi-bell', ''));
                        } else {
                            node.getMetadata().set('meta_watched', 'META_' + args.toUpperCase());
                            var overlays = overlay.replace('mdi mdi-bell', '').split(',');
                            overlays.push('mdi mdi-bell');
                            node.getMetadata().set('overlay_class', overlays.join(','));
                        }
                        node.notify('node_replaced');
                    });
                })();
            }
        }
    }]);

    return Callbacks;
})();

exports['default'] = Callbacks;
module.exports = exports['default'];

},{"pydio/http/api":"pydio/http/api","pydio/http/rest-api":"pydio/http/rest-api"}],4:[function(require,module,exports){
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

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _pydio = require('pydio');

var _pydio2 = _interopRequireDefault(_pydio);

var _pydioHttpApi = require('pydio/http/api');

var _pydioHttpApi2 = _interopRequireDefault(_pydioHttpApi);

var _pydioHttpRestApi = require('pydio/http/rest-api');

var AS2Client = (function () {
    function AS2Client() {
        _classCallCheck(this, AS2Client);
    }

    _createClass(AS2Client, null, [{
        key: 'loadActivityStreams',
        value: function loadActivityStreams() {
            var context = arguments.length <= 0 || arguments[0] === undefined ? 'USER_ID' : arguments[0];
            var contextData = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
            var boxName = arguments.length <= 2 || arguments[2] === undefined ? 'outbox' : arguments[2];
            var pointOfView = arguments.length <= 3 || arguments[3] === undefined ? '' : arguments[3];
            var offset = arguments.length <= 4 || arguments[4] === undefined ? -1 : arguments[4];
            var limit = arguments.length <= 5 || arguments[5] === undefined ? -1 : arguments[5];

            if (!contextData) {
                return Promise.resolve([]);
            }
            var api = new _pydioHttpRestApi.ActivityServiceApi(_pydioHttpApi2['default'].getRestClient());
            var req = new _pydioHttpRestApi.ActivityStreamActivitiesRequest();
            req.Context = context;
            req.ContextData = contextData;
            req.BoxName = boxName;
            if (offset > -1) {
                req.Offset = offset;
            }
            if (limit > -1) {
                req.Limit = limit;
            }
            req.Language = _pydio2['default'].getInstance().user.getPreference("lang") || '';
            if (pointOfView) {
                req.PointOfView = pointOfView;
            }
            return api.stream(req);
        }
    }, {
        key: 'UnreadInbox',
        value: function UnreadInbox(userId) {
            var callback = arguments.length <= 1 || arguments[1] === undefined ? function (count) {} : arguments[1];

            var api = new _pydioHttpRestApi.ActivityServiceApi(_pydioHttpApi2['default'].getRestClient());
            var req = new _pydioHttpRestApi.ActivityStreamActivitiesRequest();
            req.Context = 'USER_ID';
            req.ContextData = userId;
            req.BoxName = 'inbox';
            req.UnreadCountOnly = true;
            return api.stream(req).then(function (data) {
                return data.totalItems || 0;
            });
        }
    }]);

    return AS2Client;
})();

exports['default'] = AS2Client;
module.exports = exports['default'];

},{"pydio":"pydio","pydio/http/api":"pydio/http/api","pydio/http/rest-api":"pydio/http/rest-api"}],5:[function(require,module,exports){
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

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _require = require('material-ui');

var Popover = _require.Popover;
var Paper = _require.Paper;
var IconButton = _require.IconButton;
var FlatButton = _require.FlatButton;
var Divider = _require.Divider;

var Pydio = require('pydio');
var debounce = require('lodash.debounce');
var MetaNodeProvider = require('pydio/model/meta-node-provider');

var _Pydio$requireLib = Pydio.requireLib('boot');

var PydioContextConsumer = _Pydio$requireLib.PydioContextConsumer;

var _Pydio$requireLib2 = Pydio.requireLib('workspaces');

var FilePreview = _Pydio$requireLib2.FilePreview;

function nodesFromObject(object, pydio) {
    var nodes = [];
    var currentRepository = pydio.user.getActiveRepository();
    if (!object.partOf || !object.partOf.items || !object.partOf.items.length) {
        return nodes;
    }
    for (var i = 0; i < object.partOf.items.length; i++) {
        var ws = object.partOf.items[i];
        // Remove slug part
        var paths = ws.rel.split('/');
        paths.shift();
        var relPath = paths.join('/');
        if (relPath.indexOf('/') !== 0) {
            relPath = '/' + relPath;
        }
        var node = new AjxpNode(relPath, object.type === 'Document');
        node.getMetadata().set('repository_id', ws.id);
        node.getMetadata().set('repository_label', ws.name);
        node.getMetadata().set('filename', relPath);
        if (ws.id === currentRepository) {
            return [node];
        }
        nodes.push(node);
    }
    return nodes;
}

var DocPreview = (function (_React$Component) {
    _inherits(DocPreview, _React$Component);

    function DocPreview(props) {
        _classCallCheck(this, DocPreview);

        _get(Object.getPrototypeOf(DocPreview.prototype), 'constructor', this).call(this, props);
        var nodes = nodesFromObject(props.activity.object, props.pydio);
        if (nodes.length && !nodes[0].isLeaf()) {
            this.state = {
                previewLoaded: true,
                previewFailed: false,
                nodes: nodes
            };
        } else {
            this.state = {
                previewLoaded: false,
                previewFailed: false,
                nodes: nodes
            };
        }
    }

    _createClass(DocPreview, [{
        key: 'render',
        value: function render() {
            var _this = this;

            var pydio = this.props.pydio;
            var _state = this.state;
            var previewLoaded = _state.previewLoaded;
            var nodes = _state.nodes;
            var previewFailed = _state.previewFailed;

            var previewNode = nodes.length ? nodes[0] : null;
            var fPreview = undefined;
            var fPreviewLoading = undefined;
            var fPreviewStyle = {
                height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 70
            };
            if (previewNode && previewNode.isLeaf()) {
                if (previewLoaded && !previewFailed) {
                    fPreview = _react2['default'].createElement(FilePreview, { style: fPreviewStyle,
                        node: previewNode, pydio: pydio, loadThumbnail: true,
                        richPreview: true, processing: !previewLoaded });
                } else if (previewLoaded && previewFailed) {

                    fPreview = _react2['default'].createElement(
                        'div',
                        { style: _extends({}, fPreviewStyle, { flexDirection: 'column' }), className: 'mimefont-container' },
                        _react2['default'].createElement('div', { className: 'mimefont mdi mdi-delete' }),
                        _react2['default'].createElement(
                            'span',
                            { style: { fontSize: 13 } },
                            'File deleted'
                        )
                    );
                } else {
                    (function () {
                        var nodeRepoId = previewNode.getMetadata().get('repository_id');
                        var nodeRepoLabel = previewNode.getMetadata().get('repository_label');
                        var provider = new MetaNodeProvider();
                        previewNode.observeOnce('error', function () {
                            _this.setState({ previewLoaded: true, previewFailed: true });
                        });
                        provider.loadLeafNodeSync(previewNode, function (loadedNode) {
                            loadedNode.getMetadata().set('repository_id', nodeRepoId);
                            loadedNode.getMetadata().set('repository_label', nodeRepoLabel);
                            nodes[0] = loadedNode;
                            _this.setState({ previewLoaded: true, nodes: nodes });
                        }, true, { tmp_repository_id: nodeRepoId });

                        fPreviewLoading = _react2['default'].createElement(FilePreview, { style: fPreviewStyle,
                            node: previewNode, pydio: pydio, loadThumbnail: false,
                            richPreview: false, processing: true });
                    })();
                }
            }

            var buttons = [];
            var currentRepoButton = undefined;
            var currentRepository = pydio.user.getActiveRepository();

            var _loop = function (i) {
                var node = nodes[i];
                var button = _react2['default'].createElement(
                    'div',
                    { style: { display: 'flex', alignItems: 'center', paddingLeft: 10 } },
                    _react2['default'].createElement(
                        'div',
                        { style: { flex: 1, fontSize: 13, fontWeight: 500, color: 'rgba(0,0,0,0.33)' } },
                        pydio.MessageHash['notification_center.16'],
                        ' ',
                        node.getMetadata().get('repository_label')
                    ),
                    _react2['default'].createElement(IconButton, { iconClassName: "mdi mdi-open-in-new", tooltip: pydio.MessageHash['notification_center.6'], tooltipPosition: "top-center", onClick: function () {
                            pydio.goTo(node);
                        } })
                );
                if (node.getMetadata().get('repository_id') === currentRepository) {
                    currentRepoButton = _react2['default'].createElement(
                        'div',
                        { style: { display: 'flex', alignItems: 'center' } },
                        _react2['default'].createElement('span', { style: { flex: 1 } }),
                        ' ',
                        _react2['default'].createElement(FlatButton, { label: pydio.MessageHash['notification_center.6'], iconClassName: "mdi mdi-open-in-new", tooltip: 'Open', tooltipPosition: "top-right", onClick: function () {
                                pydio.goTo(node);
                            } })
                    );
                    return 'break';
                }
                buttons.push(button);
                if (i < nodes.length - 1) {
                    buttons.push(_react2['default'].createElement(Divider, null));
                }
            };

            for (var i = 0; i < nodes.length; i++) {
                var _ret2 = _loop(i);

                if (_ret2 === 'break') break;
            }
            if (currentRepoButton) {
                buttons = [currentRepoButton];
            }

            return _react2['default'].createElement(
                'div',
                null,
                !previewFailed && _react2['default'].createElement(
                    'div',
                    { style: { padding: 6 } },
                    buttons
                )
            );
        }
    }]);

    return DocPreview;
})(_react2['default'].Component);

var DocLink = (function (_React$Component2) {
    _inherits(DocLink, _React$Component2);

    function DocLink(props) {
        _classCallCheck(this, DocLink);

        _get(Object.getPrototypeOf(DocLink.prototype), 'constructor', this).call(this, props);
        this.state = {
            showPopover: false,
            popoverAnchor: null
        };
    }

    _createClass(DocLink, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props;
            var pydio = _props.pydio;
            var activity = _props.activity;
            var children = _props.children;
            var linkStyle = _props.linkStyle;

            if (!activity.object.name) {
                activity.object.name = '';
            }
            var nodes = nodesFromObject(activity.object, pydio);

            var onClick = undefined,
                onMouseOver = undefined,
                onMouseOut = undefined,
                popover = undefined;

            var pathParts = activity.object.name.replace('doc://', '').split('/');
            pathParts.shift();
            var title = '/' + pathParts.join('/');

            if (nodes.length > 1) {

                onClick = function () {
                    pydio.goTo(nodes[0]);
                };
                onMouseOut = debounce(function () {
                    _this2.setState({ showPopover: false });
                }, 350);
                onMouseOver = function (e) {
                    _this2.setState({ showPopover: true, popoverAnchor: e.currentTarget });
                    onMouseOut.cancel();
                };
                var onMouseOverInner = function onMouseOverInner(e) {
                    _this2.setState({ showPopover: true });
                    onMouseOut.cancel();
                };

                popover = _react2['default'].createElement(
                    Popover,
                    {
                        open: this.state.showPopover,
                        anchorEl: this.state.popoverAnchor,
                        onRequestClose: function (reason) {
                            if (reason !== 'clickAway') {
                                _this2.setState({ showPopover: false });
                            }
                        },
                        anchorOrigin: { horizontal: "left", vertical: "bottom" },
                        targetOrigin: { horizontal: "left", vertical: "top" },
                        useLayerForClickAway: false
                    },
                    _react2['default'].createElement(
                        Paper,
                        { zDepth: 2, style: { width: 200, height: 'auto', overflowY: 'auto' }, onMouseOver: onMouseOverInner, onMouseOut: onMouseOut },
                        _react2['default'].createElement(DocPreview, { pydio: pydio, activity: activity })
                    )
                );
            } else if (nodes.length === 1) {
                onClick = function () {
                    pydio.goTo(nodes[0]);
                };
            }

            return _react2['default'].createElement(
                'span',
                null,
                _react2['default'].createElement(
                    'a',
                    { title: title, style: _extends({ cursor: 'pointer', color: 'rgb(66, 140, 179)' }, linkStyle),
                        onMouseOver: onMouseOver,
                        onMouseOut: onMouseOut,
                        onClick: onClick },
                    children
                ),
                popover
            );
        }
    }]);

    return DocLink;
})(_react2['default'].Component);

DocLink.PropTypes = {
    activity: _react2['default'].PropTypes.object,
    pydio: _react2['default'].PropTypes.instanceOf(Pydio)
};

exports['default'] = DocLink = PydioContextConsumer(DocLink);
exports['default'] = DocLink;
exports.nodesFromObject = nodesFromObject;

},{"lodash.debounce":"lodash.debounce","material-ui":"material-ui","pydio":"pydio","pydio/model/meta-node-provider":"pydio/model/meta-node-provider","react":"react"}],6:[function(require,module,exports){
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
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUi = require('material-ui');

var _ActivityList = require('./ActivityList');

var _ActivityList2 = _interopRequireDefault(_ActivityList);

var _Pydio$requireLib = Pydio.requireLib('boot');

var PydioContextConsumer = _Pydio$requireLib.PydioContextConsumer;

var _Pydio$requireLib2 = Pydio.requireLib('workspaces');

var InfoPanelCard = _Pydio$requireLib2.InfoPanelCard;

var InfoPanel = (function (_React$Component) {
    _inherits(InfoPanel, _React$Component);

    function InfoPanel() {
        _classCallCheck(this, InfoPanel);

        _get(Object.getPrototypeOf(InfoPanel.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(InfoPanel, [{
        key: 'render',
        value: function render() {
            var _props = this.props;
            var node = _props.node;
            var pydio = _props.pydio;

            if (pydio.getPluginConfigs("core.activitystreams").get("ACTIVITY_SHOW_ACTIVITIES") === false) {
                return null;
            }

            return _react2['default'].createElement(
                InfoPanelCard,
                { identifier: "activity", title: node.isLeaf() ? pydio.MessageHash['notification_center.11'] : pydio.MessageHash['notification_center.10'] },
                _react2['default'].createElement(_ActivityList2['default'], {
                    context: 'NODE_ID',
                    contextData: node.getMetadata().get('uuid'),
                    boxName: 'outbox',
                    style: { overflowY: 'scroll', maxHeight: 380 },
                    listContext: "NODE-" + (node.isLeaf() ? "LEAF" : "COLLECTION"),
                    pointOfView: "ACTOR",
                    displayContext: 'infoPanel'
                })
            );
        }
    }]);

    return InfoPanel;
})(_react2['default'].Component);

exports['default'] = InfoPanel = PydioContextConsumer(InfoPanel);
exports['default'] = InfoPanel;
module.exports = exports['default'];

},{"./ActivityList":2,"material-ui":"material-ui","react":"react"}],7:[function(require,module,exports){
(function (global){
/*
 * Copyright 2007-2018 Charles du Jeu - Abstrium SAS <team (at) pyd.io>
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
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Listeners = (function () {
    function Listeners() {
        _classCallCheck(this, Listeners);
    }

    _createClass(Listeners, null, [{
        key: "dynamicBuilder",
        value: function dynamicBuilder(controller) {
            var pydio = global.pydio;
            var MessageHash = pydio.MessageHash;

            var n = pydio.getUserSelection().getUniqueNode();
            if (!n) {
                return [];
            }

            var builderMenuItems = [];
            var metaValue = undefined;
            if (n.getMetadata().get("meta_watched")) {
                metaValue = n.getMetadata().get("meta_watched");
            }
            builderMenuItems.push({
                name: MessageHash["meta.watch.11"],
                alt: MessageHash["meta.watch." + (n.isLeaf() ? "12" : "12b")],
                icon_class: metaValue && metaValue === "META_WATCH_CHANGE" ? 'mdi mdi-checkbox-marked-circle-outline' : 'mdi mdi-checkbox-blank-circle-outline',
                callback: (function (e) {
                    this.apply('watch_change');
                }).bind(this)
            });
            builderMenuItems.push({
                name: MessageHash["meta.watch.9"],
                alt: MessageHash["meta.watch." + (n.isLeaf() ? "10" : "10b")],
                icon_class: metaValue && metaValue === "META_WATCH_READ" ? 'mdi mdi-checkbox-marked-circle-outline' : 'mdi mdi-checkbox-blank-circle-outline',
                callback: (function (e) {
                    this.apply('watch_read');
                }).bind(this)
            });
            builderMenuItems.push({
                name: MessageHash["meta.watch.13"],
                alt: MessageHash["meta.watch." + (n.isLeaf() ? "14" : "14b")],
                icon_class: metaValue && metaValue === "META_WATCH_BOTH" ? 'mdi mdi-checkbox-marked-circle-outline' : 'mdi mdi-checkbox-blank-circle-outline',
                callback: (function (e) {
                    this.apply('watch_both');
                }).bind(this)
            });
            if (metaValue) {
                builderMenuItems.push({
                    separator: true
                });
                builderMenuItems.push({
                    name: MessageHash['meta.watch.3'],
                    alt: MessageHash["meta.watch." + (n.isLeaf() ? "8" : "4")],
                    icon_class: 'mdi mdi-close-circle-outline',
                    callback: (function (e) {
                        this.apply('watch_stop');
                    }).bind(this)
                });
            }

            return builderMenuItems;
        }
    }]);

    return Listeners;
})();

exports["default"] = Listeners;
module.exports = exports["default"];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],8:[function(require,module,exports){
/*
 * Copyright 2007-2020 Charles du Jeu - Abstrium SAS <team (at) pyd.io>
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
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUi = require('material-ui');

var _materialUiStyles = require('material-ui/styles');

var _Client = require('./Client');

var _Client2 = _interopRequireDefault(_Client);

var _ActivityList = require('./ActivityList');

var _ActivityList2 = _interopRequireDefault(_ActivityList);

var _lodashDebounce = require('lodash.debounce');

var _lodashDebounce2 = _interopRequireDefault(_lodashDebounce);

var _color = require('color');

var _color2 = _interopRequireDefault(_color);

var UserPanel = (function (_React$Component) {
    _inherits(UserPanel, _React$Component);

    function UserPanel(props) {
        _classCallCheck(this, UserPanel);

        _get(Object.getPrototypeOf(UserPanel.prototype), 'constructor', this).call(this, props);
        this.state = {
            unreadStatus: 0,
            open: false,
            data: []
        };
        this.reloadData = (0, _lodashDebounce2['default'])(this.reloadData.bind(this), 500);
        this.reloadUnread = (0, _lodashDebounce2['default'])(this.reloadUnread.bind(this), 500);
    }

    _createClass(UserPanel, [{
        key: 'reloadData',
        value: function reloadData() {
            var _this = this;

            _Client2['default'].loadActivityStreams('USER_ID', this.props.pydio.user.id, 'inbox').then(function (json) {
                _this.setState({ data: json });
            })['catch'](function (msg) {
                _this.setState({ error: msg });
            });
        }
    }, {
        key: 'reloadUnread',
        value: function reloadUnread() {
            var _this2 = this;

            _Client2['default'].UnreadInbox(this.props.pydio.user.id).then(function (count) {
                _this2.setState({ unreadStatus: count });
            })['catch'](function (msg) {});
        }
    }, {
        key: 'onStatusChange',
        value: function onStatusChange() {
            if (this.props.onUnreadStatusChange) {
                this.props.onUnreadStatusChange(this.state.unreadStatus);
            }
        }
    }, {
        key: 'handleTouchTap',
        value: function handleTouchTap(event) {
            // This prevents ghost click.
            event.preventDefault();
            //if(this.state.unreadStatus){
            //this.updateAlertsLastRead();
            //}
            this.reloadData();
            this.setState({
                open: true,
                anchorEl: event.currentTarget,
                unreadStatus: 0
            }, this.onStatusChange.bind(this));
        }
    }, {
        key: 'handleRequestClose',
        value: function handleRequestClose() {
            this.setState({
                open: false
            });
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this3 = this;

            this.reloadUnread();
            this.props.pydio.observe('websocket_event:activity', function (event) {
                if (_this3.state.open) {
                    _this3.reloadData();
                } else {
                    _this3.reloadUnread();
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props;
            var pydio = _props.pydio;
            var iconStyle = _props.iconStyle;
            var muiTheme = _props.muiTheme;
            var _state = this.state;
            var open = _state.open;
            var anchorEl = _state.anchorEl;
            var unreadStatus = _state.unreadStatus;

            var buttonStyle = { borderRadius: '50%' };
            if (open && iconStyle && iconStyle.color) {
                buttonStyle = _extends({}, buttonStyle, { backgroundColor: (0, _color2['default'])(iconStyle.color).fade(0.9).toString() });
            }
            return _react2['default'].createElement(
                'span',
                null,
                _react2['default'].createElement(
                    'div',
                    {
                        style: { position: 'relative', display: 'inline-block' },

                        badgeContent: this.state.unreadStatus,
                        secondary: true,
                        badgeStyle: this.state.unreadStatus ? null : { display: 'none' }
                    },
                    _react2['default'].createElement(_materialUi.IconButton, {
                        onTouchTap: this.handleTouchTap.bind(this),
                        iconClassName: this.props.iconClassName || "mdi mdi-bell",
                        tooltip: (unreadStatus ? unreadStatus + ' ' : '') + this.props.pydio.MessageHash['notification_center.4'],
                        className: 'userActionButton alertsButton',
                        iconStyle: iconStyle,
                        style: buttonStyle
                    }),
                    unreadStatus > 0 && _react2['default'].createElement('div', { style: { width: 6, height: 6, borderRadius: '50%', top: 9, right: 6, position: 'absolute', backgroundColor: muiTheme.palette.accent1Color } })
                ),
                _react2['default'].createElement(
                    _materialUi.Popover,
                    {
                        open: open,
                        anchorEl: anchorEl,
                        anchorOrigin: { horizontal: 'left', vertical: 'top' },
                        targetOrigin: { horizontal: 'left', vertical: 'top' },
                        onRequestClose: this.handleRequestClose.bind(this),
                        style: { width: 320 },
                        zDepth: 3

                    },
                    _react2['default'].createElement(
                        'div',
                        { style: { display: 'flex', alignItems: 'center', borderRadius: '2px 2px 0 0', width: '100%',
                                backgroundColor: '#f8fafc', borderBottom: '1px solid #ECEFF1', color: muiTheme.palette.primary1Color } },
                        _react2['default'].createElement('span', { className: "mdi mdi-bell", style: { fontSize: 18, margin: '12px 8px 14px 16px' } }),
                        _react2['default'].createElement(
                            'span',
                            { style: { fontSize: 15, fontWeight: 500 } },
                            pydio.MessageHash['notification_center.1']
                        )
                    ),
                    this.state.data && _react2['default'].createElement(_ActivityList2['default'], {
                        items: this.state.data.items,
                        style: { overflowY: 'scroll', maxHeight: 420, paddingTop: 20 },
                        groupByDate: true,
                        displayContext: "popover"
                    })
                )
            );
        }
    }]);

    return UserPanel;
})(_react2['default'].Component);

exports['default'] = UserPanel = (0, _materialUiStyles.muiThemeable)()(UserPanel);

exports['default'] = UserPanel;
module.exports = exports['default'];

},{"./ActivityList":2,"./Client":4,"color":"color","lodash.debounce":"lodash.debounce","material-ui":"material-ui","material-ui/styles":"material-ui/styles","react":"react"}],9:[function(require,module,exports){
/*
 * Copyright 2007-2020 Charles du Jeu - Abstrium SAS <team (at) pyd.io>
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
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _pydio = require('pydio');

var _pydio2 = _interopRequireDefault(_pydio);

var _materialUi = require('material-ui');

var _pydioHttpApi = require('pydio/http/api');

var _pydioHttpApi2 = _interopRequireDefault(_pydioHttpApi);

var _pydioHttpRestApi = require('pydio/http/rest-api');

var _Pydio$requireLib = _pydio2['default'].requireLib('hoc');

var ModernSelectField = _Pydio$requireLib.ModernSelectField;

var WatchSelector = (function (_React$Component) {
    _inherits(WatchSelector, _React$Component);

    function WatchSelector(props) {
        _classCallCheck(this, WatchSelector);

        _get(Object.getPrototypeOf(WatchSelector.prototype), 'constructor', this).call(this, props);
        var nodes = this.props.nodes;

        this.state = this.valueFromNodes(nodes);
    }

    _createClass(WatchSelector, [{
        key: 'valueFromNodes',
        value: function valueFromNodes() {
            var nodes = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

            var mixed = false,
                value = undefined;
            nodes.forEach(function (n) {
                var nVal = n.getMetadata().get('meta_watched') || '';
                if (value !== undefined && nVal !== value) {
                    mixed = true;
                }
                value = nVal;
            });
            return { value: value, mixed: mixed };
        }
    }, {
        key: 'onSelectorChange',
        value: function onSelectorChange(value) {
            var _this = this;

            if (value === 'mixed') {
                return;
            }

            var _props = this.props;
            var pydio = _props.pydio;
            var nodes = _props.nodes;

            this.setState({ saving: true });

            var proms = nodes.map(function (node) {
                var nodeUuid = node.getMetadata().get('uuid');
                var userId = pydio.user.id;
                var subscription = new _pydioHttpRestApi.ActivitySubscription();
                var type = new _pydioHttpRestApi.ActivityOwnerType();
                subscription.UserId = userId;
                subscription.ObjectId = nodeUuid;
                subscription.ObjectType = type.NODE;
                var events = [];
                if (value === 'META_WATCH_CHANGE' || value === 'META_WATCH_BOTH') {
                    events.push('change');
                }
                if (value === 'META_WATCH_READ' || value === 'META_WATCH_BOTH') {
                    events.push('read');
                }
                subscription.Events = events;
                var api = new _pydioHttpRestApi.ActivityServiceApi(_pydioHttpApi2['default'].getRestClient());
                return api.subscribe(subscription).then(function (outSub) {
                    var overlay = node.getMetadata().get('overlay_class') || '';
                    if (value === '') {
                        node.getMetadata()['delete']('meta_watched');
                        node.getMetadata().set('overlay_class', overlay.replace('mdi mdi-bell', ''));
                    } else {
                        node.getMetadata().set('meta_watched', value);
                        var overlays = overlay.replace('mdi mdi-bell', '').split(',');
                        overlays.push('mdi mdi-bell');
                        node.getMetadata().set('overlay_class', overlays.join(','));
                    }
                    node.notify('node_replaced');
                });
            });
            Promise.all(proms).then(function () {
                _this.setState({ value: value, mixed: false });
                window.setTimeout(function () {
                    _this.setState({ saving: false });
                }, 250);
            })['catch'](function () {
                _this.setState({ saving: false });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _state = this.state;
            var value = _state.value;
            var mixed = _state.mixed;
            var saving = _state.saving;

            var mm = _pydio2['default'].getInstance().MessageHash;

            if (saving) {
                return _react2['default'].createElement(
                    ModernSelectField,
                    { value: "saving", onChange: function (e, i, v) {}, disabled: true },
                    _react2['default'].createElement(_materialUi.MenuItem, { value: "saving", primaryText: mm['meta.watch.selector.saving'] + "..." })
                );
            }

            return _react2['default'].createElement(
                ModernSelectField,
                { value: mixed ? 'mixed' : value, onChange: function (e, i, v) {
                        _this2.onSelectorChange(v);
                    } },
                mixed && _react2['default'].createElement(_materialUi.MenuItem, { value: "mixed", primaryText: mm['meta.watch.selector.mixed'] + "..." }),
                _react2['default'].createElement(_materialUi.MenuItem, { value: "", primaryText: mm['meta.watch.selector.ignore'] }),
                _react2['default'].createElement(_materialUi.MenuItem, { value: "META_WATCH_READ", primaryText: mm['meta.watch.selector.read'] }),
                _react2['default'].createElement(_materialUi.MenuItem, { value: "META_WATCH_CHANGE", primaryText: mm['meta.watch.selector.change'] }),
                _react2['default'].createElement(_materialUi.MenuItem, { value: "META_WATCH_BOTH", primaryText: mm['meta.watch.selector.both'] })
            );
        }
    }]);

    return WatchSelector;
})(_react2['default'].Component);

exports['default'] = WatchSelector;
module.exports = exports['default'];

},{"material-ui":"material-ui","pydio":"pydio","pydio/http/api":"pydio/http/api","pydio/http/rest-api":"pydio/http/rest-api","react":"react"}],10:[function(require,module,exports){
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

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequire(obj) { return obj && obj.__esModule ? obj["default"] : obj; }

var _InfoPanel = require("./InfoPanel");

exports.InfoPanel = _interopRequire(_InfoPanel);

var _UserPanel = require("./UserPanel");

exports.UserPanel = _interopRequire(_UserPanel);

var _Client = require("./Client");

exports.ASClient = _interopRequire(_Client);

var _Activity = require("./Activity");

exports.Activity = _interopRequire(_Activity);

var _ActivityList = require("./ActivityList");

exports.ActivityList = _interopRequire(_ActivityList);

var _Listener = require('./Listener');

exports.Listener = _interopRequire(_Listener);

var _Callbacks = require('./Callbacks');

exports.Callbacks = _interopRequire(_Callbacks);

var _WatchSelector = require('./WatchSelector');

exports.WatchSelector = _interopRequire(_WatchSelector);

},{"./Activity":1,"./ActivityList":2,"./Callbacks":3,"./Client":4,"./InfoPanel":6,"./Listener":7,"./UserPanel":8,"./WatchSelector":9}]},{},[10])(10)
});

//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJyZXMvYnVpbGQvUHlkaW9BY3Rpdml0eVN0cmVhbXMvQWN0aXZpdHkuanMiLCJyZXMvYnVpbGQvUHlkaW9BY3Rpdml0eVN0cmVhbXMvQWN0aXZpdHlMaXN0LmpzIiwicmVzL2J1aWxkL1B5ZGlvQWN0aXZpdHlTdHJlYW1zL0NhbGxiYWNrcy5qcyIsInJlcy9idWlsZC9QeWRpb0FjdGl2aXR5U3RyZWFtcy9DbGllbnQuanMiLCJyZXMvYnVpbGQvUHlkaW9BY3Rpdml0eVN0cmVhbXMvRG9jTGluay5qcyIsInJlcy9idWlsZC9QeWRpb0FjdGl2aXR5U3RyZWFtcy9JbmZvUGFuZWwuanMiLCJyZXMvYnVpbGQvUHlkaW9BY3Rpdml0eVN0cmVhbXMvTGlzdGVuZXIuanMiLCJyZXMvYnVpbGQvUHlkaW9BY3Rpdml0eVN0cmVhbXMvVXNlclBhbmVsLmpzIiwicmVzL2J1aWxkL1B5ZGlvQWN0aXZpdHlTdHJlYW1zL1dhdGNoU2VsZWN0b3IuanMiLCJyZXMvYnVpbGQvUHlkaW9BY3Rpdml0eVN0cmVhbXMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JhQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5UUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQy9GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDakdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qXG4gKiBDb3B5cmlnaHQgMjAwNy0yMDE3IENoYXJsZXMgZHUgSmV1IC0gQWJzdHJpdW0gU0FTIDx0ZWFtIChhdCkgcHlkLmlvPlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgUHlkaW8uXG4gKlxuICogUHlkaW8gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBQeWRpbyBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBQeWRpby4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqXG4gKiBUaGUgbGF0ZXN0IGNvZGUgY2FuIGJlIGZvdW5kIGF0IDxodHRwczovL3B5ZGlvLmNvbT4uXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmICgndmFsdWUnIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG52YXIgX2dldCA9IGZ1bmN0aW9uIGdldChfeDIsIF94MywgX3g0KSB7IHZhciBfYWdhaW4gPSB0cnVlOyBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHsgdmFyIG9iamVjdCA9IF94MiwgcHJvcGVydHkgPSBfeDMsIHJlY2VpdmVyID0gX3g0OyBfYWdhaW4gPSBmYWxzZTsgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlOyB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7IGlmIChkZXNjID09PSB1bmRlZmluZWQpIHsgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpOyBpZiAocGFyZW50ID09PSBudWxsKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gZWxzZSB7IF94MiA9IHBhcmVudDsgX3gzID0gcHJvcGVydHk7IF94NCA9IHJlY2VpdmVyOyBfYWdhaW4gPSB0cnVlOyBkZXNjID0gcGFyZW50ID0gdW5kZWZpbmVkOyBjb250aW51ZSBfZnVuY3Rpb247IH0gfSBlbHNlIGlmICgndmFsdWUnIGluIGRlc2MpIHsgcmV0dXJuIGRlc2MudmFsdWU7IH0gZWxzZSB7IHZhciBnZXR0ZXIgPSBkZXNjLmdldDsgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTsgfSB9IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09ICdmdW5jdGlvbicgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90ICcgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBfcHlkaW8gPSByZXF1aXJlKCdweWRpbycpO1xuXG52YXIgX3B5ZGlvMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3B5ZGlvKTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX3JlYWN0TWFya2Rvd24gPSByZXF1aXJlKCdyZWFjdC1tYXJrZG93bicpO1xuXG52YXIgX3JlYWN0TWFya2Rvd24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3RNYXJrZG93bik7XG5cbnZhciBfbWF0ZXJpYWxVaSA9IHJlcXVpcmUoJ21hdGVyaWFsLXVpJyk7XG5cbnZhciBfbWF0ZXJpYWxVaVN0eWxlcyA9IHJlcXVpcmUoJ21hdGVyaWFsLXVpL3N0eWxlcycpO1xuXG52YXIgX3B5ZGlvVXRpbFBhdGggPSByZXF1aXJlKCdweWRpby91dGlsL3BhdGgnKTtcblxudmFyIF9weWRpb1V0aWxQYXRoMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3B5ZGlvVXRpbFBhdGgpO1xuXG52YXIgX0RvY0xpbmsgPSByZXF1aXJlKCcuL0RvY0xpbmsnKTtcblxudmFyIF9Eb2NMaW5rMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0RvY0xpbmspO1xuXG52YXIgX1B5ZGlvJHJlcXVpcmVMaWIgPSBfcHlkaW8yWydkZWZhdWx0J10ucmVxdWlyZUxpYignY29tcG9uZW50cycpO1xuXG52YXIgVXNlckF2YXRhciA9IF9QeWRpbyRyZXF1aXJlTGliLlVzZXJBdmF0YXI7XG5cbnZhciBfUHlkaW8kcmVxdWlyZUxpYjIgPSBfcHlkaW8yWydkZWZhdWx0J10ucmVxdWlyZUxpYignYm9vdCcpO1xuXG52YXIgUHlkaW9Db250ZXh0Q29uc3VtZXIgPSBfUHlkaW8kcmVxdWlyZUxpYjIuUHlkaW9Db250ZXh0Q29uc3VtZXI7XG5cbnZhciBfUHlkaW8kcmVxdWlyZUxpYjMgPSBfcHlkaW8yWydkZWZhdWx0J10ucmVxdWlyZUxpYignd29ya3NwYWNlcycpO1xuXG52YXIgRmlsZVByZXZpZXcgPSBfUHlkaW8kcmVxdWlyZUxpYjMuRmlsZVByZXZpZXc7XG5cbnZhciBfUHlkaW8kcmVxdWlyZUxpYjQgPSBfcHlkaW8yWydkZWZhdWx0J10ucmVxdWlyZUxpYignYm9vdCcpO1xuXG52YXIgbW9tZW50ID0gX1B5ZGlvJHJlcXVpcmVMaWI0Lm1vbWVudDtcblxudmFyIFBhcmFncmFwaCA9IChmdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICAgIF9pbmhlcml0cyhQYXJhZ3JhcGgsIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gICAgZnVuY3Rpb24gUGFyYWdyYXBoKCkge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgUGFyYWdyYXBoKTtcblxuICAgICAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihQYXJhZ3JhcGgucHJvdG90eXBlKSwgJ2NvbnN0cnVjdG9yJywgdGhpcykuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoUGFyYWdyYXBoLCBbe1xuICAgICAgICBrZXk6ICdyZW5kZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9yZWFjdDJbJ2RlZmF1bHQnXS5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICdzcGFuJyxcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuY2hpbGRyZW5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gUGFyYWdyYXBoO1xufSkoX3JlYWN0MlsnZGVmYXVsdCddLkNvbXBvbmVudCk7XG5cbmZ1bmN0aW9uIHdvcmtzcGFjZXNMb2NhdGlvbnMocHlkaW8sIG9iamVjdCkge1xuICAgIHZhciB3b3Jrc3BhY2VzID0gW107XG4gICAgaWYgKCFvYmplY3QucGFydE9mIHx8ICFvYmplY3QucGFydE9mLml0ZW1zIHx8ICFvYmplY3QucGFydE9mLml0ZW1zLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gXCJObyB3b3Jrc3BhY2UgZm91bmRcIjtcbiAgICB9XG5cbiAgICB2YXIgX2xvb3AgPSBmdW5jdGlvbiAoaSkge1xuICAgICAgICB2YXIgd3MgPSBvYmplY3QucGFydE9mLml0ZW1zW2ldO1xuICAgICAgICAvLyBSZW1vdmUgc2x1ZyBwYXJ0XG4gICAgICAgIC8vbGV0IHBhdGhzID0gd3MucmVsLnNwbGl0KCcvJyk7XG4gICAgICAgIC8vcGF0aHMuc2hpZnQoKTtcbiAgICAgICAgLy9sZXQgcmVsUGF0aCA9IHBhdGhzLmpvaW4oJy8nKTtcbiAgICAgICAgd29ya3NwYWNlcy5wdXNoKF9yZWFjdDJbJ2RlZmF1bHQnXS5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgJ2EnLFxuICAgICAgICAgICAgeyBrZXk6IHdzLmlkLCBvbkNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBweWRpby50cmlnZ2VyUmVwb3NpdG9yeUNoYW5nZSh3cy5pZCk7XG4gICAgICAgICAgICAgICAgfSwgc3R5bGU6IHsgY3Vyc29yOiAncG9pbnRlcicgfSB9LFxuICAgICAgICAgICAgd3MubmFtZVxuICAgICAgICApKTtcbiAgICAgICAgd29ya3NwYWNlcy5wdXNoKF9yZWFjdDJbJ2RlZmF1bHQnXS5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgJ3NwYW4nLFxuICAgICAgICAgICAgeyBrZXk6IHdzLmlkICsgJy1zZXAnIH0sXG4gICAgICAgICAgICAnLCAnXG4gICAgICAgICkpO1xuICAgIH07XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iamVjdC5wYXJ0T2YuaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgX2xvb3AoaSk7XG4gICAgfVxuICAgIHdvcmtzcGFjZXMucG9wKCk7XG4gICAgcmV0dXJuIF9yZWFjdDJbJ2RlZmF1bHQnXS5jcmVhdGVFbGVtZW50KFxuICAgICAgICAnc3BhbicsXG4gICAgICAgIG51bGwsXG4gICAgICAgIHB5ZGlvLk1lc3NhZ2VIYXNoWydub3RpZmljYXRpb25fY2VudGVyLjE2J10sXG4gICAgICAgICcgJyxcbiAgICAgICAgX3JlYWN0MlsnZGVmYXVsdCddLmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAnc3BhbicsXG4gICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgd29ya3NwYWNlc1xuICAgICAgICApXG4gICAgKTtcbn1cblxuZnVuY3Rpb24gTGlua1dyYXBwZXIocHlkaW8sIGFjdGl2aXR5KSB7XG4gICAgdmFyIHN0eWxlID0gYXJndW1lbnRzLmxlbmd0aCA8PSAyIHx8IGFyZ3VtZW50c1syXSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogYXJndW1lbnRzWzJdO1xuXG4gICAgcmV0dXJuIF9yZWFjdDJbJ2RlZmF1bHQnXS5jcmVhdGVDbGFzcyh7XG5cbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgICAgICB2YXIgX3Byb3BzID0gdGhpcy5wcm9wcztcbiAgICAgICAgICAgIHZhciBocmVmID0gX3Byb3BzLmhyZWY7XG4gICAgICAgICAgICB2YXIgY2hpbGRyZW4gPSBfcHJvcHMuY2hpbGRyZW47XG5cbiAgICAgICAgICAgIHZhciBsaW5rU3R5bGUgPSBfZXh0ZW5kcyh7XG4gICAgICAgICAgICAgICAgY3Vyc29yOiAncG9pbnRlcicsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdyZ2IoNjYsIDE0MCwgMTc5KScsXG4gICAgICAgICAgICAgICAgZm9udFdlaWdodDogNTAwXG4gICAgICAgICAgICB9LCBzdHlsZSk7XG4gICAgICAgICAgICB2YXIgdGl0bGUgPSBcIlwiO1xuICAgICAgICAgICAgdmFyIG9uQ2xpY2sgPSBudWxsO1xuICAgICAgICAgICAgaWYgKGhyZWYuc3RhcnRzV2l0aCgnZG9jOi8vJykpIHtcbiAgICAgICAgICAgICAgICBpZiAoYWN0aXZpdHkudHlwZSA9PT0gJ0RlbGV0ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9yZWFjdDJbJ2RlZmF1bHQnXS5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2EnLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBzdHlsZTogeyB0ZXh0RGVjb3JhdGlvbjogJ2xpbmUtdGhyb3VnaCcgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW5cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3JlYWN0MlsnZGVmYXVsdCddLmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICBfRG9jTGluazJbJ2RlZmF1bHQnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgcHlkaW86IHB5ZGlvLCBhY3Rpdml0eTogYWN0aXZpdHksIGxpbmtTdHlsZTogbGlua1N0eWxlIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlblxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaHJlZi5zdGFydHNXaXRoKCd1c2VyOi8vJykpIHtcbiAgICAgICAgICAgICAgICB2YXIgdXNlcklkID0gaHJlZi5yZXBsYWNlKCd1c2VyOi8vJywgJycpO1xuICAgICAgICAgICAgICAgIHJldHVybiBfcmVhY3QyWydkZWZhdWx0J10uY3JlYXRlRWxlbWVudChVc2VyQXZhdGFyLCB7IHVzZXJJZDogdXNlcklkLCBkaXNwbGF5QXZhdGFyOiBmYWxzZSwgcmljaE9uQ2xpY2s6IHRydWUsIHN0eWxlOiBfZXh0ZW5kcyh7fSwgbGlua1N0eWxlLCB7IGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snIH0pLCBweWRpbzogcHlkaW8gfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGhyZWYuc3RhcnRzV2l0aCgnd29ya3NwYWNlczovLycpKSB7XG4gICAgICAgICAgICAgICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHdzSWQgPSBocmVmLnJlcGxhY2UoJ3dvcmtzcGFjZXM6Ly8nLCAnJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChweWRpby51c2VyICYmIHB5ZGlvLnVzZXIuZ2V0UmVwb3NpdG9yaWVzTGlzdCgpLmdldCh3c0lkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBweWRpby50cmlnZ2VyUmVwb3NpdG9yeUNoYW5nZSh3c0lkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIF9yZWFjdDJbJ2RlZmF1bHQnXS5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICdhJyxcbiAgICAgICAgICAgICAgICB7IHRpdGxlOiB0aXRsZSwgc3R5bGU6IGxpbmtTdHlsZSwgb25DbGljazogb25DbGljayB9LFxuICAgICAgICAgICAgICAgIGNoaWxkcmVuXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbnZhciBBY3Rpdml0eSA9IChmdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudDIpIHtcbiAgICBfaW5oZXJpdHMoQWN0aXZpdHksIF9SZWFjdCRDb21wb25lbnQyKTtcblxuICAgIGZ1bmN0aW9uIEFjdGl2aXR5KCkge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQWN0aXZpdHkpO1xuXG4gICAgICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKEFjdGl2aXR5LnByb3RvdHlwZSksICdjb25zdHJ1Y3RvcicsIHRoaXMpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKEFjdGl2aXR5LCBbe1xuICAgICAgICBrZXk6ICdjb21wdXRlSWNvbicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wdXRlSWNvbihhY3Rpdml0eSkge1xuICAgICAgICAgICAgdmFyIGNsYXNzTmFtZSA9ICcnO1xuICAgICAgICAgICAgdmFyIHRpdGxlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgc3dpdGNoIChhY3Rpdml0eS50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcIkNyZWF0ZVwiOlxuICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aXZpdHkub2JqZWN0LnR5cGUgPT09ICdEb2N1bWVudCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA9IFwiZmlsZS1wbHVzXCI7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgPSBcImZvbGRlci1wbHVzXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGl0bGUgPSBcIkNyZWF0ZWRcIjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIkRlbGV0ZVwiOlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgPSBcImRlbGV0ZVwiO1xuICAgICAgICAgICAgICAgICAgICB0aXRsZSA9IFwiRGVsZXRlZFwiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiRWRpdFwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJVcGRhdGVcIjpcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lID0gXCJwZW5jaWxcIjtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGUgPSBcIk1vZGlmaWVkXCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJVcGRhdGVNZXRhXCI6XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA9IFwidGFnLW11bHRpcGxlXCI7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlID0gXCJNb2RpZmllZFwiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiVXBkYXRlQ29tbWVudFwiOlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgPSBcIm1lc3NhZ2Utb3V0bGluZVwiO1xuICAgICAgICAgICAgICAgICAgICB0aXRsZSA9IFwiQ29tbWVudGVkXCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJSZWFkXCI6XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA9IFwiZXllXCI7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlID0gXCJBY2Nlc3NlZFwiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiTW92ZVwiOlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgPSBcImZpbGUtc2VuZFwiO1xuICAgICAgICAgICAgICAgICAgICB0aXRsZSA9IFwiTW92ZWRcIjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIlNoYXJlXCI6XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA9IFwic2hhcmUtdmFyaWFudFwiO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aXZpdHkub2JqZWN0LnR5cGUgPT09IFwiQ2VsbFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgPSBcImljb21vb24tY2VsbHNcIjtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3Rpdml0eS5vYmplY3QudHlwZSA9PT0gXCJXb3Jrc3BhY2VcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lID0gXCJmb2xkZXJcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aXRsZSA9IFwiU2hhcmVkXCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNsYXNzTmFtZS5pbmRleE9mKCdpY29tb29uLScpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA9ICdtZGkgbWRpLScgKyBjbGFzc05hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyB0aXRsZTogdGl0bGUsIGNsYXNzTmFtZTogY2xhc3NOYW1lIH07XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3JlbmRlcicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgICAgICB2YXIgX3Byb3BzMiA9IHRoaXMucHJvcHM7XG4gICAgICAgICAgICB2YXIgcHlkaW8gPSBfcHJvcHMyLnB5ZGlvO1xuICAgICAgICAgICAgdmFyIGFjdGl2aXR5ID0gX3Byb3BzMi5hY3Rpdml0eTtcbiAgICAgICAgICAgIHZhciBsaXN0Q29udGV4dCA9IF9wcm9wczIubGlzdENvbnRleHQ7XG4gICAgICAgICAgICB2YXIgZGlzcGxheUNvbnRleHQgPSBfcHJvcHMyLmRpc3BsYXlDb250ZXh0O1xuICAgICAgICAgICAgdmFyIG9uZUxpbmVyID0gX3Byb3BzMi5vbmVMaW5lcjtcbiAgICAgICAgICAgIHZhciBtdWlUaGVtZSA9IF9wcm9wczIubXVpVGhlbWU7XG5cbiAgICAgICAgICAgIHZhciBzZWNvbmRhcnkgPSBhY3Rpdml0eS50eXBlICsgXCIgLSBcIiArIGFjdGl2aXR5LmFjdG9yLm5hbWU7XG4gICAgICAgICAgICBpZiAoYWN0aXZpdHkuc3VtbWFyeSkge1xuICAgICAgICAgICAgICAgIHNlY29uZGFyeSA9IF9yZWFjdDJbJ2RlZmF1bHQnXS5jcmVhdGVFbGVtZW50KF9yZWFjdE1hcmtkb3duMlsnZGVmYXVsdCddLCB7IHNvdXJjZTogYWN0aXZpdHkuc3VtbWFyeSwgcmVuZGVyZXJzOiB7ICdwYXJhZ3JhcGgnOiBQYXJhZ3JhcGgsICdsaW5rJzogTGlua1dyYXBwZXIocHlkaW8sIGFjdGl2aXR5LCB7IGNvbG9yOiAnaW5oZXJpdCcgfSkgfSB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHN1bW1hcnkgPSB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgc3VtbWFyeVN0eWxlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgdmFyIGFjdGlvbkljb24gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB2YXIgYmxvY2tTdHlsZSA9IHtcbiAgICAgICAgICAgICAgICBtYXJnaW46ICcwcHggMTBweCA2cHgnXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKGRpc3BsYXlDb250ZXh0ID09PSAncG9wb3ZlcicpIHtcbiAgICAgICAgICAgICAgICBzdW1tYXJ5U3R5bGUgPSB7XG4gICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAxMyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICdyZ2JhKDAsMCwwLDAuNTMpJyxcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luOiAnNnB4IDAnLFxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiA2XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3VtbWFyeVN0eWxlID0ge1xuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnNnB4IDIycHggMTJweCcsXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpblRvcDogNixcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAyLFxuICAgICAgICAgICAgICAgICAgICBib3JkZXJMZWZ0OiAnMnB4IHNvbGlkICNlMGUwZTAnLFxuICAgICAgICAgICAgICAgICAgICBtYXJnaW5MZWZ0OiAxMyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICdyZ2JhKDAsMCwwLDAuMzMpJyxcbiAgICAgICAgICAgICAgICAgICAgLypmb250V2VpZ2h0OiA1MDAsXG4gICAgICAgICAgICAgICAgICAgIGZvbnRTdHlsZTogJ2l0YWxpYycsKi9cbiAgICAgICAgICAgICAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIF9jb21wdXRlSWNvbiA9IHRoaXMuY29tcHV0ZUljb24oYWN0aXZpdHkpO1xuXG4gICAgICAgICAgICB2YXIgdGl0bGUgPSBfY29tcHV0ZUljb24udGl0bGU7XG4gICAgICAgICAgICB2YXIgY2xhc3NOYW1lID0gX2NvbXB1dGVJY29uLmNsYXNzTmFtZTtcblxuICAgICAgICAgICAgaWYgKGxpc3RDb250ZXh0ID09PSAnTk9ERS1MRUFGJykge1xuXG4gICAgICAgICAgICAgICAgYmxvY2tTdHlsZSA9IHsgbWFyZ2luOiAnMTZweCAxMHB4JyB9O1xuICAgICAgICAgICAgICAgIGFjdGlvbkljb24gPSBfcmVhY3QyWydkZWZhdWx0J10uY3JlYXRlRWxlbWVudChfbWF0ZXJpYWxVaS5Gb250SWNvbiwgeyBjbGFzc05hbWU6IGNsYXNzTmFtZSwgdGl0bGU6IHRpdGxlLCBzdHlsZTogeyBmb250U2l6ZTogMTcsIGNvbG9yOiAncmdiYSgwLDAsMCwwLjE3KScgfSB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoZGlzcGxheUNvbnRleHQgPT09ICdwb3BvdmVyJykge1xuICAgICAgICAgICAgICAgICAgICBibG9ja1N0eWxlID0geyBtYXJnaW46IDAgfTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5vZGVzID0gKDAsIF9Eb2NMaW5rLm5vZGVzRnJvbU9iamVjdCkoYWN0aXZpdHkub2JqZWN0LCBweWRpbyk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpY29uID0gdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpbWFyeVRleHQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChub2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcmV2aWV3U3R5bGVzID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogMzYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzNixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNTAlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWltZUZvbnRTdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogMjAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVIZWlnaHQ6ICczNnB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uID0gX3JlYWN0MlsnZGVmYXVsdCddLmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdHlsZTogeyBwYWRkaW5nOiAnMTJweCAyMHB4IDEycHggMjBweCcsIHBvc2l0aW9uOiAncmVsYXRpdmUnIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyWydkZWZhdWx0J10uY3JlYXRlRWxlbWVudChGaWxlUHJldmlldywgX2V4dGVuZHMoeyBweWRpbzogcHlkaW8sIG5vZGU6IG5vZGVzWzBdLCBsb2FkVGh1bWJuYWlsOiB0cnVlIH0sIHByZXZpZXdTdHlsZXMpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyWydkZWZhdWx0J10uY3JlYXRlRWxlbWVudCgnc3BhbicsIHsgY2xhc3NOYW1lOiBjbGFzc05hbWUsIHN0eWxlOiB7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBib3R0b206IDgsIHJpZ2h0OiAxMiwgZm9udFNpemU6IDE4LCBjb2xvcjogbXVpVGhlbWUucGFsZXR0ZS5hY2NlbnQyQ29sb3IgfSB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaW1hcnlUZXh0ID0gbm9kZXNbMF0uZ2V0TGFiZWwoKSB8fCBfcHlkaW9VdGlsUGF0aDJbJ2RlZmF1bHQnXS5nZXRCYXNlbmFtZShub2Rlc1swXS5nZXRQYXRoKCkpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbiA9IF9yZWFjdDJbJ2RlZmF1bHQnXS5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3R5bGU6IHsgbWFyZ2luOiAnMTJweCAyMHB4IDEycHggMjBweCcsIGJhY2tncm91bmRDb2xvcjogJ3JnYigyMzcsIDI0MCwgMjQyKScsIGFsaWduSXRlbXM6ICdpbml0aWFsJywgaGVpZ2h0OiAzNiwgd2lkdGg6IDM2LCBib3JkZXJSYWRpdXM6ICc1MCUnLCB0ZXh0QWxpZ246ICdjZW50ZXInIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyWydkZWZhdWx0J10uY3JlYXRlRWxlbWVudChfbWF0ZXJpYWxVaS5Gb250SWNvbiwgeyBjbGFzc05hbWU6IGNsYXNzTmFtZSwgc3R5bGU6IHsgbGluZUhlaWdodDogJzM2cHgnLCBjb2xvcjogbXVpVGhlbWUucGFsZXR0ZS5hY2NlbnQyQ29sb3IgfSB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaW1hcnlUZXh0ID0gYWN0aXZpdHkub2JqZWN0Lm5hbWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc3VtbWFyeSA9IF9yZWFjdDJbJ2RlZmF1bHQnXS5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHN0eWxlOiB7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2ZsZXgtc3RhcnQnLCBvdmVyZmxvdzogJ2hpZGRlbicsIHBhZGRpbmdCb3R0b206IDggfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIF9yZWFjdDJbJ2RlZmF1bHQnXS5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3R5bGU6IHsgZmxleDogMSwgb3ZlcmZsb3c6ICdoaWRkZW4nLCBwYWRkaW5nUmlnaHQ6IDE2IH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyWydkZWZhdWx0J10uY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3R5bGU6IHsgbWFyZ2luVG9wOiAxMiwgbWFyZ2luQm90dG9tOiAyLCBmb250U2l6ZTogMTUsIGNvbG9yOiAncmdiYSgwLDAsMCwuODcpJywgd2hpdGVTcGFjZTogJ25vd3JhcCcsIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJywgb3ZlcmZsb3c6ICdoaWRkZW4nIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpbWFyeVRleHRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9yZWFjdDJbJ2RlZmF1bHQnXS5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdHlsZTogeyBjb2xvcjogJ3JnYmEoMCwwLDAsLjMzKScgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmRhcnlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3VtbWFyeSA9IF9yZWFjdDJbJ2RlZmF1bHQnXS5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHN0eWxlOiBzdW1tYXJ5U3R5bGUgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlY29uZGFyeVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIF9yZWFjdDJbJ2RlZmF1bHQnXS5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgIHsgc3R5bGU6IGJsb2NrU3R5bGUgfSxcbiAgICAgICAgICAgICAgICAhb25lTGluZXIgJiYgX3JlYWN0MlsnZGVmYXVsdCddLmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICB7IHN0eWxlOiB7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicgfSB9LFxuICAgICAgICAgICAgICAgICAgICBfcmVhY3QyWydkZWZhdWx0J10uY3JlYXRlRWxlbWVudChVc2VyQXZhdGFyLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VEZWZhdWx0QXZhdGFyOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcklkOiBhY3Rpdml0eS5hY3Rvci5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJMYWJlbDogYWN0aXZpdHkuYWN0b3IubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlMb2NhbExhYmVsOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlclR5cGU6ICd1c2VyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHB5ZGlvOiBweWRpbyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIG1heFdpZHRoOiAnNjAlJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWxTdHlsZTogeyBmb250U2l6ZTogMTQsIHBhZGRpbmdMZWZ0OiAxMCwgb3ZlcmZsb3c6ICdoaWRkZW4nLCB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcycsIHdoaXRlU3BhY2U6ICdub3dyYXAnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBhdmF0YXJTdHlsZTogeyBmbGV4U2hyaW5rOiAwIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBhdmF0YXJTaXplOiAyOCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpY2hPbkhvdmVyOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICBfcmVhY3QyWydkZWZhdWx0J10uY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICdzcGFuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgc3R5bGU6IHsgZm9udFNpemU6IDEzLCBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJywgZmxleDogMSwgaGVpZ2h0OiAxOCwgY29sb3I6ICdyZ2JhKDAsMCwwLDAuMjMpJywgZm9udFdlaWdodDogNTAwLCBwYWRkaW5nTGVmdDogOCwgd2hpdGVTcGFjZTogJ25vd3JhcCcgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgbW9tZW50KGFjdGl2aXR5LnVwZGF0ZWQpLmZyb21Ob3coKVxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb25JY29uXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBzdW1tYXJ5XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIEFjdGl2aXR5O1xufSkoX3JlYWN0MlsnZGVmYXVsdCddLkNvbXBvbmVudCk7XG5cbkFjdGl2aXR5LlByb3BUeXBlcyA9IHtcbiAgICBhY3Rpdml0eTogX3JlYWN0MlsnZGVmYXVsdCddLlByb3BUeXBlcy5vYmplY3QsXG4gICAgbGlzdENvbnRleHQ6IF9yZWFjdDJbJ2RlZmF1bHQnXS5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRpc3BsYXlDb250ZXh0OiBfcmVhY3QyWydkZWZhdWx0J10uUHJvcFR5cGVzLm9uZU9mKFsnaW5mb1BhbmVsJywgJ3BvcG92ZXInXSlcbn07XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IEFjdGl2aXR5ID0gKDAsIF9tYXRlcmlhbFVpU3R5bGVzLm11aVRoZW1lYWJsZSkoKShBY3Rpdml0eSk7XG5leHBvcnRzWydkZWZhdWx0J10gPSBBY3Rpdml0eSA9IFB5ZGlvQ29udGV4dENvbnN1bWVyKEFjdGl2aXR5KTtcbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IEFjdGl2aXR5O1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG4iLCIvKlxuICogQ29weXJpZ2h0IDIwMDctMjAxNyBDaGFybGVzIGR1IEpldSAtIEFic3RyaXVtIFNBUyA8dGVhbSAoYXQpIHB5ZC5pbz5cbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFB5ZGlvLlxuICpcbiAqIFB5ZGlvIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogUHlkaW8gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggUHlkaW8uICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKlxuICogVGhlIGxhdGVzdCBjb2RlIGNhbiBiZSBmb3VuZCBhdCA8aHR0cHM6Ly9weWRpby5jb20+LlxuICovXG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKCd2YWx1ZScgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KF94LCBfeDIsIF94MykgeyB2YXIgX2FnYWluID0gdHJ1ZTsgX2Z1bmN0aW9uOiB3aGlsZSAoX2FnYWluKSB7IHZhciBvYmplY3QgPSBfeCwgcHJvcGVydHkgPSBfeDIsIHJlY2VpdmVyID0gX3gzOyBfYWdhaW4gPSBmYWxzZTsgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlOyB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7IGlmIChkZXNjID09PSB1bmRlZmluZWQpIHsgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpOyBpZiAocGFyZW50ID09PSBudWxsKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gZWxzZSB7IF94ID0gcGFyZW50OyBfeDIgPSBwcm9wZXJ0eTsgX3gzID0gcmVjZWl2ZXI7IF9hZ2FpbiA9IHRydWU7IGRlc2MgPSBwYXJlbnQgPSB1bmRlZmluZWQ7IGNvbnRpbnVlIF9mdW5jdGlvbjsgfSB9IGVsc2UgaWYgKCd2YWx1ZScgaW4gZGVzYykgeyByZXR1cm4gZGVzYy52YWx1ZTsgfSBlbHNlIHsgdmFyIGdldHRlciA9IGRlc2MuZ2V0OyBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpOyB9IH0gfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykgYXJyMltpXSA9IGFycltpXTsgcmV0dXJuIGFycjI7IH0gZWxzZSB7IHJldHVybiBBcnJheS5mcm9tKGFycik7IH0gfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gJ2Z1bmN0aW9uJyAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ1N1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgJyArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX21hdGVyaWFsVWkgPSByZXF1aXJlKCdtYXRlcmlhbC11aScpO1xuXG52YXIgX3B5ZGlvID0gcmVxdWlyZSgncHlkaW8nKTtcblxudmFyIF9weWRpbzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9weWRpbyk7XG5cbnZhciBfQ2xpZW50ID0gcmVxdWlyZSgnLi9DbGllbnQnKTtcblxudmFyIF9DbGllbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQ2xpZW50KTtcblxudmFyIF9BY3Rpdml0eSA9IHJlcXVpcmUoJy4vQWN0aXZpdHknKTtcblxudmFyIF9BY3Rpdml0eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9BY3Rpdml0eSk7XG5cbnZhciBfUHlkaW8kcmVxdWlyZUxpYiA9IF9weWRpbzJbJ2RlZmF1bHQnXS5yZXF1aXJlTGliKCdib290Jyk7XG5cbnZhciBQeWRpb0NvbnRleHRDb25zdW1lciA9IF9QeWRpbyRyZXF1aXJlTGliLlB5ZGlvQ29udGV4dENvbnN1bWVyO1xudmFyIG1vbWVudCA9IF9QeWRpbyRyZXF1aXJlTGliLm1vbWVudDtcblxudmFyIF9QeWRpbyRyZXF1aXJlTGliMiA9IF9weWRpbzJbJ2RlZmF1bHQnXS5yZXF1aXJlTGliKCdjb21wb25lbnRzJyk7XG5cbnZhciBFbXB0eVN0YXRlVmlldyA9IF9QeWRpbyRyZXF1aXJlTGliMi5FbXB0eVN0YXRlVmlldztcblxudmFyIEFjdGl2aXR5TGlzdCA9IChmdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICAgIF9pbmhlcml0cyhBY3Rpdml0eUxpc3QsIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gICAgZnVuY3Rpb24gQWN0aXZpdHlMaXN0KHByb3BzKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBBY3Rpdml0eUxpc3QpO1xuXG4gICAgICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKEFjdGl2aXR5TGlzdC5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIHByb3BzKTtcbiAgICAgICAgaWYgKHByb3BzLml0ZW1zKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0geyBkYXRhOiB7IGl0ZW1zOiBwcm9wcy5pdGVtcyB9LCBvZmZzZXQ6IDAsIGxvYWRNb3JlOiBmYWxzZSwgbG9hZGluZzogZmFsc2UgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSB7IGRhdGE6IFtdLCBvZmZzZXQ6IDAsIGxvYWRNb3JlOiB0cnVlLCBsb2FkaW5nOiBmYWxzZSB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKEFjdGl2aXR5TGlzdCwgW3tcbiAgICAgICAga2V5OiAnbWVyZ2VNb3JlRmVlZCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBtZXJnZU1vcmVGZWVkKGN1cnJlbnRGZWVkLCBuZXdGZWVkKSB7XG4gICAgICAgICAgICB2YXIgY3VycmVudElkcyA9IGN1cnJlbnRGZWVkLml0ZW1zLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLmlkO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgZmlsdGVyZWQgPSBuZXdGZWVkLml0ZW1zLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50SWRzLmluZGV4T2YoaXRlbS5pZCkgPT09IC0xO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIWZpbHRlcmVkLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBsb2FkTW9yZTogZmFsc2UgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRGZWVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG1lcmdlZCA9IGN1cnJlbnRGZWVkO1xuICAgICAgICAgICAgbWVyZ2VkLml0ZW1zID0gW10uY29uY2F0KF90b0NvbnN1bWFibGVBcnJheShjdXJyZW50RmVlZC5pdGVtcyksIF90b0NvbnN1bWFibGVBcnJheShmaWx0ZXJlZCkpO1xuICAgICAgICAgICAgbWVyZ2VkLnRvdGFsSXRlbXMgPSBtZXJnZWQuaXRlbXMubGVuZ3RoO1xuICAgICAgICAgICAgcmV0dXJuIG1lcmdlZDtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnbG9hZEZvclByb3BzJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGxvYWRGb3JQcm9wcyhwcm9wcykge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICAgICAgdmFyIGNvbnRleHQgPSBwcm9wcy5jb250ZXh0O1xuICAgICAgICAgICAgdmFyIHBvaW50T2ZWaWV3ID0gcHJvcHMucG9pbnRPZlZpZXc7XG4gICAgICAgICAgICB2YXIgY29udGV4dERhdGEgPSBwcm9wcy5jb250ZXh0RGF0YTtcbiAgICAgICAgICAgIHZhciBsaW1pdCA9IHByb3BzLmxpbWl0O1xuICAgICAgICAgICAgdmFyIF9zdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgICAgICAgICB2YXIgb2Zmc2V0ID0gX3N0YXRlLm9mZnNldDtcbiAgICAgICAgICAgIHZhciBkYXRhID0gX3N0YXRlLmRhdGE7XG5cbiAgICAgICAgICAgIGlmIChsaW1pdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgbGltaXQgPSAtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvZmZzZXQgPiAwKSB7XG4gICAgICAgICAgICAgICAgbGltaXQgPSAxMDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgbG9hZGluZzogdHJ1ZSwgZXJyb3I6IG51bGwgfSk7XG4gICAgICAgICAgICBfQ2xpZW50MlsnZGVmYXVsdCddLmxvYWRBY3Rpdml0eVN0cmVhbXMoY29udGV4dCwgY29udGV4dERhdGEsICdvdXRib3gnLCBwb2ludE9mVmlldywgb2Zmc2V0LCBsaW1pdCkudGhlbihmdW5jdGlvbiAoanNvbikge1xuICAgICAgICAgICAgICAgIGlmIChvZmZzZXQgPiAwICYmIGRhdGEgJiYgZGF0YS5pdGVtcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoanNvbiAmJiBqc29uLml0ZW1zKSBfdGhpcy5zZXRTdGF0ZSh7IGRhdGE6IF90aGlzLm1lcmdlTW9yZUZlZWQoZGF0YSwganNvbikgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2V0U3RhdGUoeyBkYXRhOiBqc29uIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIWpzb24gfHwgIWpzb24uaXRlbXMgfHwgIWpzb24uaXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnNldFN0YXRlKHsgbG9hZE1vcmU6IGZhbHNlIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBfdGhpcy5zZXRTdGF0ZSh7IGxvYWRpbmc6IGZhbHNlIH0pO1xuICAgICAgICAgICAgfSlbJ2NhdGNoJ10oZnVuY3Rpb24gKG1zZykge1xuICAgICAgICAgICAgICAgIF90aGlzLnNldFN0YXRlKHsgbG9hZGluZzogZmFsc2UsIGVycm9yOiBtc2cgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnY29tcG9uZW50V2lsbE1vdW50JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgICAgICAgIHZhciBfcHJvcHMgPSB0aGlzLnByb3BzO1xuICAgICAgICAgICAgdmFyIGl0ZW1zID0gX3Byb3BzLml0ZW1zO1xuICAgICAgICAgICAgdmFyIGNvbnRleHREYXRhID0gX3Byb3BzLmNvbnRleHREYXRhO1xuXG4gICAgICAgICAgICBpZiAoaXRlbXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY29udGV4dERhdGEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRGb3JQcm9wcyh0aGlzLnByb3BzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgICAgIGlmIChuZXh0UHJvcHMuaXRlbXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgZGF0YTogeyBpdGVtczogbmV4dFByb3BzLml0ZW1zIH0sIG9mZnNldDogMCwgbG9hZE1vcmU6IGZhbHNlIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuZXh0UHJvcHMuY29udGV4dERhdGEgIT09IHRoaXMucHJvcHMuY29udGV4dERhdGEgfHwgbmV4dFByb3BzLmNvbnRleHQgIT09IHRoaXMucHJvcHMuY29udGV4dCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBvZmZzZXQ6IDAsIGxvYWRNb3JlOiB0cnVlIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMyLmxvYWRGb3JQcm9wcyhuZXh0UHJvcHMpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZW5kZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgICAgICAgIHZhciBjb250ZW50ID0gW107XG4gICAgICAgICAgICB2YXIgX3N0YXRlMiA9IHRoaXMuc3RhdGU7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IF9zdGF0ZTIuZGF0YTtcbiAgICAgICAgICAgIHZhciBsb2FkTW9yZSA9IF9zdGF0ZTIubG9hZE1vcmU7XG4gICAgICAgICAgICB2YXIgbG9hZGluZyA9IF9zdGF0ZTIubG9hZGluZztcbiAgICAgICAgICAgIHZhciBlcnJvciA9IF9zdGF0ZTIuZXJyb3I7XG4gICAgICAgICAgICB2YXIgX3Byb3BzMiA9IHRoaXMucHJvcHM7XG4gICAgICAgICAgICB2YXIgbGlzdENvbnRleHQgPSBfcHJvcHMyLmxpc3RDb250ZXh0O1xuICAgICAgICAgICAgdmFyIGdyb3VwQnlEYXRlID0gX3Byb3BzMi5ncm91cEJ5RGF0ZTtcbiAgICAgICAgICAgIHZhciBkaXNwbGF5Q29udGV4dCA9IF9wcm9wczIuZGlzcGxheUNvbnRleHQ7XG4gICAgICAgICAgICB2YXIgcHlkaW8gPSBfcHJvcHMyLnB5ZGlvO1xuXG4gICAgICAgICAgICB2YXIgcHJldmlvdXNGcm9tID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgdmFyIGVtcHR5U3RhdGVJY29uID0gXCJtZGkgbWRpLXB1bHNlXCI7XG4gICAgICAgICAgICB2YXIgZW1wdHlTdGF0ZVN0cmluZyA9IGxvYWRpbmcgPyBweWRpby5NZXNzYWdlSGFzaFsnbm90aWZpY2F0aW9uX2NlbnRlci4xNyddIDogcHlkaW8uTWVzc2FnZUhhc2hbJ25vdGlmaWNhdGlvbl9jZW50ZXIuMTgnXTtcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGVtcHR5U3RhdGVTdHJpbmcgPSBlcnJvci5EZXRhaWwgfHwgZXJyb3IubXNnIHx8IGVycm9yO1xuICAgICAgICAgICAgICAgIGVtcHR5U3RhdGVJY29uID0gXCJtZGkgbWRpLWFsZXJ0LWNpcmNsZS1vdXRsaW5lXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGF0YSAhPT0gbnVsbCAmJiBkYXRhLml0ZW1zKSB7XG4gICAgICAgICAgICAgICAgZGF0YS5pdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChhYywgaSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBmcm9tTm93ID0gbW9tZW50KGFjLnVwZGF0ZWQpLmZyb21Ob3coKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdyb3VwQnlEYXRlICYmIGZyb21Ob3cgIT09IHByZXZpb3VzRnJvbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRlbnQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5wb3AoKTsgLy8gcmVtb3ZlIGxhc3QgZGl2aWRlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQucHVzaChfcmVhY3QyWydkZWZhdWx0J10uY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3R5bGU6IHsgcGFkZGluZzogJzIwcHggMTZweCAwJywgZm9udFNpemU6IDEzLCBjb2xvcjogJ3JnYmEoMTQ3LCAxNjgsIDE3OCwgMC42NyknLCBmb250V2VpZ2h0OiA1MDAgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tTm93XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQucHVzaChfcmVhY3QyWydkZWZhdWx0J10uY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3R5bGU6IHsgcGFkZGluZzogJzAgMTZweCcsIGZvbnRTaXplOiAxMywgY29sb3I6ICdyZ2JhKDE0NywgMTY4LCAxNzgsIDAuNjcpJywgZm9udFdlaWdodDogNTAwIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbU5vd1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQucHVzaChfcmVhY3QyWydkZWZhdWx0J10uY3JlYXRlRWxlbWVudChfQWN0aXZpdHkyWydkZWZhdWx0J10sIHsga2V5OiBhYy5pZCwgYWN0aXZpdHk6IGFjLCBsaXN0Q29udGV4dDogbGlzdENvbnRleHQsIG9uZUxpbmVyOiBncm91cEJ5RGF0ZSwgZGlzcGxheUNvbnRleHQ6IGRpc3BsYXlDb250ZXh0IH0pKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdyb3VwQnlEYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2aW91c0Zyb20gPSBmcm9tTm93O1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5wdXNoKF9yZWFjdDJbJ2RlZmF1bHQnXS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IHN0eWxlOiB7IGJvcmRlclRvcDogJzFweCBzb2xpZCByZ2JhKDAsMCwwLC4wMyknLCB3aWR0aDogJzEwMCUnIH0gfSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKGdyb3VwQnlEYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQucG9wKCk7IC8vIHJlbW92ZSBsYXN0IGRpdmlkZXJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY29udGVudC5sZW5ndGggJiYgbG9hZE1vcmUpIHtcbiAgICAgICAgICAgICAgICB2YXIgbG9hZEFjdGlvbiA9IGZ1bmN0aW9uIGxvYWRBY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzMy5zZXRTdGF0ZSh7IG9mZnNldDogZGF0YS5pdGVtcy5sZW5ndGggKyAxIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzMy5sb2FkRm9yUHJvcHMoX3RoaXMzLnByb3BzKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBjb250ZW50LnB1c2goX3JlYWN0MlsnZGVmYXVsdCddLmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICB7IHN0eWxlOiB7IHBhZGRpbmdMZWZ0OiAxNiB9IH0sXG4gICAgICAgICAgICAgICAgICAgIF9yZWFjdDJbJ2RlZmF1bHQnXS5jcmVhdGVFbGVtZW50KF9tYXRlcmlhbFVpLkZsYXRCdXR0b24sIHsgcHJpbWFyeTogdHJ1ZSwgbGFiZWw6IGxvYWRpbmcgPyBweWRpby5NZXNzYWdlSGFzaFsnbm90aWZpY2F0aW9uX2NlbnRlci4yMCddIDogcHlkaW8uTWVzc2FnZUhhc2hbJ25vdGlmaWNhdGlvbl9jZW50ZXIuMTknXSwgZGlzYWJsZWQ6IGxvYWRpbmcsIG9uVG91Y2hUYXA6IGxvYWRBY3Rpb24gfSlcbiAgICAgICAgICAgICAgICApKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjb250ZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfcmVhY3QyWydkZWZhdWx0J10uY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgX21hdGVyaWFsVWkuTGlzdCxcbiAgICAgICAgICAgICAgICAgICAgeyBzdHlsZTogdGhpcy5wcm9wcy5zdHlsZSB9LFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIHN0eWxlID0geyBiYWNrZ3JvdW5kQ29sb3I6ICd0cmFuc3BhcmVudCcgfTtcbiAgICAgICAgICAgICAgICB2YXIgaWNvblN0eWxlID0gdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICBsZWdlbmRTdHlsZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBpZiAoZGlzcGxheUNvbnRleHQgPT09ICdwb3BvdmVyJykge1xuICAgICAgICAgICAgICAgICAgICBzdHlsZSA9IF9leHRlbmRzKHt9LCBzdHlsZSwgeyBtaW5IZWlnaHQ6IDI1MCB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRpc3BsYXlDb250ZXh0ID09PSAnaW5mb1BhbmVsJykge1xuICAgICAgICAgICAgICAgICAgICBzdHlsZSA9IF9leHRlbmRzKHt9LCBzdHlsZSwgeyBwYWRkaW5nQm90dG9tOiAyMCB9KTtcbiAgICAgICAgICAgICAgICAgICAgaWNvblN0eWxlID0geyBmb250U2l6ZTogNDAgfTtcbiAgICAgICAgICAgICAgICAgICAgbGVnZW5kU3R5bGUgPSB7IGZvbnRTaXplOiAxMywgZm9udFdlaWdodDogNDAwIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBfcmVhY3QyWydkZWZhdWx0J10uY3JlYXRlRWxlbWVudChFbXB0eVN0YXRlVmlldywge1xuICAgICAgICAgICAgICAgICAgICBweWRpbzogdGhpcy5wcm9wcy5weWRpbyxcbiAgICAgICAgICAgICAgICAgICAgaWNvbkNsYXNzTmFtZTogZW1wdHlTdGF0ZUljb24sXG4gICAgICAgICAgICAgICAgICAgIHByaW1hcnlUZXh0SWQ6IGVtcHR5U3RhdGVTdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiBzdHlsZSxcbiAgICAgICAgICAgICAgICAgICAgaWNvblN0eWxlOiBpY29uU3R5bGUsXG4gICAgICAgICAgICAgICAgICAgIGxlZ2VuZFN0eWxlOiBsZWdlbmRTdHlsZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIEFjdGl2aXR5TGlzdDtcbn0pKF9yZWFjdDJbJ2RlZmF1bHQnXS5Db21wb25lbnQpO1xuXG5BY3Rpdml0eUxpc3QuUHJvcFR5cGVzID0ge1xuICAgIGNvbnRleHQ6IF9yZWFjdDJbJ2RlZmF1bHQnXS5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNvbnRleHREYXRhOiBfcmVhY3QyWydkZWZhdWx0J10uUHJvcFR5cGVzLnN0cmluZyxcbiAgICBib3hOYW1lOiBfcmVhY3QyWydkZWZhdWx0J10uUHJvcFR5cGVzLnN0cmluZyxcbiAgICBwb2ludE9mVmlldzogX3JlYWN0MlsnZGVmYXVsdCddLlByb3BUeXBlcy5vbmVPZihbJ0dFTkVSSUMnLCAnQUNUT1InLCAnU1VCSkVDVCddKSxcbiAgICBkaXNwbGF5Q29udGV4dDogX3JlYWN0MlsnZGVmYXVsdCddLlByb3BUeXBlcy5vbmVPZihbJ21haW5MaXN0JywgJ2luZm9QYW5lbCcsICdwb3BvdmVyJ10pXG59O1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBBY3Rpdml0eUxpc3QgPSBQeWRpb0NvbnRleHRDb25zdW1lcihBY3Rpdml0eUxpc3QpO1xuZXhwb3J0c1snZGVmYXVsdCddID0gQWN0aXZpdHlMaXN0O1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG4iLCIvKlxuICogQ29weXJpZ2h0IDIwMDctMjAxOCBDaGFybGVzIGR1IEpldSAtIEFic3RyaXVtIFNBUyA8dGVhbSAoYXQpIHB5ZC5pbz5cbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFB5ZGlvLlxuICpcbiAqIFB5ZGlvIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogUHlkaW8gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggUHlkaW8uICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKlxuICogVGhlIGxhdGVzdCBjb2RlIGNhbiBiZSBmb3VuZCBhdCA8aHR0cHM6Ly9weWRpby5jb20+LlxuICovXG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKCd2YWx1ZScgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbnZhciBfcHlkaW9IdHRwQXBpID0gcmVxdWlyZSgncHlkaW8vaHR0cC9hcGknKTtcblxudmFyIF9weWRpb0h0dHBBcGkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcHlkaW9IdHRwQXBpKTtcblxudmFyIF9weWRpb0h0dHBSZXN0QXBpID0gcmVxdWlyZSgncHlkaW8vaHR0cC9yZXN0LWFwaScpO1xuXG52YXIgQ2FsbGJhY2tzID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDYWxsYmFja3MoKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBDYWxsYmFja3MpO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhDYWxsYmFja3MsIG51bGwsIFt7XG4gICAgICAgIGtleTogJ3RvZ2dsZVdhdGNoJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHRvZ2dsZVdhdGNoKG1hbmFnZXIsIGFyZ3MpIHtcblxuICAgICAgICAgICAgaWYgKGFyZ3MpIHtcbiAgICAgICAgICAgICAgICAoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBub2RlID0gcHlkaW8uZ2V0VXNlclNlbGVjdGlvbigpLmdldFVuaXF1ZU5vZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5vZGVVdWlkID0gbm9kZS5nZXRNZXRhZGF0YSgpLmdldCgndXVpZCcpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdXNlcklkID0gcHlkaW8udXNlci5pZDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1YnNjcmlwdGlvbiA9IG5ldyBfcHlkaW9IdHRwUmVzdEFwaS5BY3Rpdml0eVN1YnNjcmlwdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdHlwZSA9IG5ldyBfcHlkaW9IdHRwUmVzdEFwaS5BY3Rpdml0eU93bmVyVHlwZSgpO1xuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb24uVXNlcklkID0gdXNlcklkO1xuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb24uT2JqZWN0SWQgPSBub2RlVXVpZDtcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uLk9iamVjdFR5cGUgPSB0eXBlLk5PREU7XG4gICAgICAgICAgICAgICAgICAgIHZhciBldmVudHMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFyZ3MgPT09ICd3YXRjaF9jaGFuZ2UnIHx8IGFyZ3MgPT09ICd3YXRjaF9ib3RoJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRzLnB1c2goJ2NoYW5nZScpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChhcmdzID09PSAnd2F0Y2hfcmVhZCcgfHwgYXJncyA9PT0gJ3dhdGNoX2JvdGgnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudHMucHVzaCgncmVhZCcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbi5FdmVudHMgPSBldmVudHM7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhcGkgPSBuZXcgX3B5ZGlvSHR0cFJlc3RBcGkuQWN0aXZpdHlTZXJ2aWNlQXBpKF9weWRpb0h0dHBBcGkyWydkZWZhdWx0J10uZ2V0UmVzdENsaWVudCgpKTtcbiAgICAgICAgICAgICAgICAgICAgYXBpLnN1YnNjcmliZShzdWJzY3JpcHRpb24pLnRoZW4oZnVuY3Rpb24gKG91dFN1Yikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG92ZXJsYXkgPSBub2RlLmdldE1ldGFkYXRhKCkuZ2V0KCdvdmVybGF5X2NsYXNzJykgfHwgJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXJncyA9PT0gJ3dhdGNoX3N0b3AnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5nZXRNZXRhZGF0YSgpWydkZWxldGUnXSgnbWV0YV93YXRjaGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5nZXRNZXRhZGF0YSgpLnNldCgnb3ZlcmxheV9jbGFzcycsIG92ZXJsYXkucmVwbGFjZSgnbWRpIG1kaS1iZWxsJywgJycpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5nZXRNZXRhZGF0YSgpLnNldCgnbWV0YV93YXRjaGVkJywgJ01FVEFfJyArIGFyZ3MudG9VcHBlckNhc2UoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG92ZXJsYXlzID0gb3ZlcmxheS5yZXBsYWNlKCdtZGkgbWRpLWJlbGwnLCAnJykuc3BsaXQoJywnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdmVybGF5cy5wdXNoKCdtZGkgbWRpLWJlbGwnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLmdldE1ldGFkYXRhKCkuc2V0KCdvdmVybGF5X2NsYXNzJywgb3ZlcmxheXMuam9pbignLCcpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUubm90aWZ5KCdub2RlX3JlcGxhY2VkJyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gQ2FsbGJhY2tzO1xufSkoKTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gQ2FsbGJhY2tzO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG4iLCIvKlxuICogQ29weXJpZ2h0IDIwMDctMjAxNyBDaGFybGVzIGR1IEpldSAtIEFic3RyaXVtIFNBUyA8dGVhbSAoYXQpIHB5ZC5pbz5cbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFB5ZGlvLlxuICpcbiAqIFB5ZGlvIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogUHlkaW8gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggUHlkaW8uICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKlxuICogVGhlIGxhdGVzdCBjb2RlIGNhbiBiZSBmb3VuZCBhdCA8aHR0cHM6Ly9weWRpby5jb20+LlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxudmFyIF9weWRpbyA9IHJlcXVpcmUoJ3B5ZGlvJyk7XG5cbnZhciBfcHlkaW8yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcHlkaW8pO1xuXG52YXIgX3B5ZGlvSHR0cEFwaSA9IHJlcXVpcmUoJ3B5ZGlvL2h0dHAvYXBpJyk7XG5cbnZhciBfcHlkaW9IdHRwQXBpMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3B5ZGlvSHR0cEFwaSk7XG5cbnZhciBfcHlkaW9IdHRwUmVzdEFwaSA9IHJlcXVpcmUoJ3B5ZGlvL2h0dHAvcmVzdC1hcGknKTtcblxudmFyIEFTMkNsaWVudCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQVMyQ2xpZW50KCkge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQVMyQ2xpZW50KTtcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoQVMyQ2xpZW50LCBudWxsLCBbe1xuICAgICAgICBrZXk6ICdsb2FkQWN0aXZpdHlTdHJlYW1zJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGxvYWRBY3Rpdml0eVN0cmVhbXMoKSB7XG4gICAgICAgICAgICB2YXIgY29udGV4dCA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/ICdVU0VSX0lEJyA6IGFyZ3VtZW50c1swXTtcbiAgICAgICAgICAgIHZhciBjb250ZXh0RGF0YSA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/ICcnIDogYXJndW1lbnRzWzFdO1xuICAgICAgICAgICAgdmFyIGJveE5hbWUgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDIgfHwgYXJndW1lbnRzWzJdID09PSB1bmRlZmluZWQgPyAnb3V0Ym94JyA6IGFyZ3VtZW50c1syXTtcbiAgICAgICAgICAgIHZhciBwb2ludE9mVmlldyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMyB8fCBhcmd1bWVudHNbM10gPT09IHVuZGVmaW5lZCA/ICcnIDogYXJndW1lbnRzWzNdO1xuICAgICAgICAgICAgdmFyIG9mZnNldCA9IGFyZ3VtZW50cy5sZW5ndGggPD0gNCB8fCBhcmd1bWVudHNbNF0gPT09IHVuZGVmaW5lZCA/IC0xIDogYXJndW1lbnRzWzRdO1xuICAgICAgICAgICAgdmFyIGxpbWl0ID0gYXJndW1lbnRzLmxlbmd0aCA8PSA1IHx8IGFyZ3VtZW50c1s1XSA9PT0gdW5kZWZpbmVkID8gLTEgOiBhcmd1bWVudHNbNV07XG5cbiAgICAgICAgICAgIGlmICghY29udGV4dERhdGEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKFtdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBhcGkgPSBuZXcgX3B5ZGlvSHR0cFJlc3RBcGkuQWN0aXZpdHlTZXJ2aWNlQXBpKF9weWRpb0h0dHBBcGkyWydkZWZhdWx0J10uZ2V0UmVzdENsaWVudCgpKTtcbiAgICAgICAgICAgIHZhciByZXEgPSBuZXcgX3B5ZGlvSHR0cFJlc3RBcGkuQWN0aXZpdHlTdHJlYW1BY3Rpdml0aWVzUmVxdWVzdCgpO1xuICAgICAgICAgICAgcmVxLkNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICAgICAgcmVxLkNvbnRleHREYXRhID0gY29udGV4dERhdGE7XG4gICAgICAgICAgICByZXEuQm94TmFtZSA9IGJveE5hbWU7XG4gICAgICAgICAgICBpZiAob2Zmc2V0ID4gLTEpIHtcbiAgICAgICAgICAgICAgICByZXEuT2Zmc2V0ID0gb2Zmc2V0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGxpbWl0ID4gLTEpIHtcbiAgICAgICAgICAgICAgICByZXEuTGltaXQgPSBsaW1pdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcS5MYW5ndWFnZSA9IF9weWRpbzJbJ2RlZmF1bHQnXS5nZXRJbnN0YW5jZSgpLnVzZXIuZ2V0UHJlZmVyZW5jZShcImxhbmdcIikgfHwgJyc7XG4gICAgICAgICAgICBpZiAocG9pbnRPZlZpZXcpIHtcbiAgICAgICAgICAgICAgICByZXEuUG9pbnRPZlZpZXcgPSBwb2ludE9mVmlldztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhcGkuc3RyZWFtKHJlcSk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ1VucmVhZEluYm94JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIFVucmVhZEluYm94KHVzZXJJZCkge1xuICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8gZnVuY3Rpb24gKGNvdW50KSB7fSA6IGFyZ3VtZW50c1sxXTtcblxuICAgICAgICAgICAgdmFyIGFwaSA9IG5ldyBfcHlkaW9IdHRwUmVzdEFwaS5BY3Rpdml0eVNlcnZpY2VBcGkoX3B5ZGlvSHR0cEFwaTJbJ2RlZmF1bHQnXS5nZXRSZXN0Q2xpZW50KCkpO1xuICAgICAgICAgICAgdmFyIHJlcSA9IG5ldyBfcHlkaW9IdHRwUmVzdEFwaS5BY3Rpdml0eVN0cmVhbUFjdGl2aXRpZXNSZXF1ZXN0KCk7XG4gICAgICAgICAgICByZXEuQ29udGV4dCA9ICdVU0VSX0lEJztcbiAgICAgICAgICAgIHJlcS5Db250ZXh0RGF0YSA9IHVzZXJJZDtcbiAgICAgICAgICAgIHJlcS5Cb3hOYW1lID0gJ2luYm94JztcbiAgICAgICAgICAgIHJlcS5VbnJlYWRDb3VudE9ubHkgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIGFwaS5zdHJlYW0ocmVxKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEudG90YWxJdGVtcyB8fCAwO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gQVMyQ2xpZW50O1xufSkoKTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gQVMyQ2xpZW50O1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG4iLCIvKlxuICogQ29weXJpZ2h0IDIwMDctMjAxNyBDaGFybGVzIGR1IEpldSAtIEFic3RyaXVtIFNBUyA8dGVhbSAoYXQpIHB5ZC5pbz5cbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFB5ZGlvLlxuICpcbiAqIFB5ZGlvIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogUHlkaW8gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggUHlkaW8uICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKlxuICogVGhlIGxhdGVzdCBjb2RlIGNhbiBiZSBmb3VuZCBhdCA8aHR0cHM6Ly9weWRpby5jb20+LlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3gsIF94MiwgX3gzKSB7IHZhciBfYWdhaW4gPSB0cnVlOyBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHsgdmFyIG9iamVjdCA9IF94LCBwcm9wZXJ0eSA9IF94MiwgcmVjZWl2ZXIgPSBfeDM7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3ggPSBwYXJlbnQ7IF94MiA9IHByb3BlcnR5OyBfeDMgPSByZWNlaXZlcjsgX2FnYWluID0gdHJ1ZTsgZGVzYyA9IHBhcmVudCA9IHVuZGVmaW5lZDsgY29udGludWUgX2Z1bmN0aW9uOyB9IH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfSB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJ21hdGVyaWFsLXVpJyk7XG5cbnZhciBQb3BvdmVyID0gX3JlcXVpcmUuUG9wb3ZlcjtcbnZhciBQYXBlciA9IF9yZXF1aXJlLlBhcGVyO1xudmFyIEljb25CdXR0b24gPSBfcmVxdWlyZS5JY29uQnV0dG9uO1xudmFyIEZsYXRCdXR0b24gPSBfcmVxdWlyZS5GbGF0QnV0dG9uO1xudmFyIERpdmlkZXIgPSBfcmVxdWlyZS5EaXZpZGVyO1xuXG52YXIgUHlkaW8gPSByZXF1aXJlKCdweWRpbycpO1xudmFyIGRlYm91bmNlID0gcmVxdWlyZSgnbG9kYXNoLmRlYm91bmNlJyk7XG52YXIgTWV0YU5vZGVQcm92aWRlciA9IHJlcXVpcmUoJ3B5ZGlvL21vZGVsL21ldGEtbm9kZS1wcm92aWRlcicpO1xuXG52YXIgX1B5ZGlvJHJlcXVpcmVMaWIgPSBQeWRpby5yZXF1aXJlTGliKCdib290Jyk7XG5cbnZhciBQeWRpb0NvbnRleHRDb25zdW1lciA9IF9QeWRpbyRyZXF1aXJlTGliLlB5ZGlvQ29udGV4dENvbnN1bWVyO1xuXG52YXIgX1B5ZGlvJHJlcXVpcmVMaWIyID0gUHlkaW8ucmVxdWlyZUxpYignd29ya3NwYWNlcycpO1xuXG52YXIgRmlsZVByZXZpZXcgPSBfUHlkaW8kcmVxdWlyZUxpYjIuRmlsZVByZXZpZXc7XG5cbmZ1bmN0aW9uIG5vZGVzRnJvbU9iamVjdChvYmplY3QsIHB5ZGlvKSB7XG4gICAgdmFyIG5vZGVzID0gW107XG4gICAgdmFyIGN1cnJlbnRSZXBvc2l0b3J5ID0gcHlkaW8udXNlci5nZXRBY3RpdmVSZXBvc2l0b3J5KCk7XG4gICAgaWYgKCFvYmplY3QucGFydE9mIHx8ICFvYmplY3QucGFydE9mLml0ZW1zIHx8ICFvYmplY3QucGFydE9mLml0ZW1zLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gbm9kZXM7XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqZWN0LnBhcnRPZi5pdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgd3MgPSBvYmplY3QucGFydE9mLml0ZW1zW2ldO1xuICAgICAgICAvLyBSZW1vdmUgc2x1ZyBwYXJ0XG4gICAgICAgIHZhciBwYXRocyA9IHdzLnJlbC5zcGxpdCgnLycpO1xuICAgICAgICBwYXRocy5zaGlmdCgpO1xuICAgICAgICB2YXIgcmVsUGF0aCA9IHBhdGhzLmpvaW4oJy8nKTtcbiAgICAgICAgaWYgKHJlbFBhdGguaW5kZXhPZignLycpICE9PSAwKSB7XG4gICAgICAgICAgICByZWxQYXRoID0gJy8nICsgcmVsUGF0aDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbm9kZSA9IG5ldyBBanhwTm9kZShyZWxQYXRoLCBvYmplY3QudHlwZSA9PT0gJ0RvY3VtZW50Jyk7XG4gICAgICAgIG5vZGUuZ2V0TWV0YWRhdGEoKS5zZXQoJ3JlcG9zaXRvcnlfaWQnLCB3cy5pZCk7XG4gICAgICAgIG5vZGUuZ2V0TWV0YWRhdGEoKS5zZXQoJ3JlcG9zaXRvcnlfbGFiZWwnLCB3cy5uYW1lKTtcbiAgICAgICAgbm9kZS5nZXRNZXRhZGF0YSgpLnNldCgnZmlsZW5hbWUnLCByZWxQYXRoKTtcbiAgICAgICAgaWYgKHdzLmlkID09PSBjdXJyZW50UmVwb3NpdG9yeSkge1xuICAgICAgICAgICAgcmV0dXJuIFtub2RlXTtcbiAgICAgICAgfVxuICAgICAgICBub2Rlcy5wdXNoKG5vZGUpO1xuICAgIH1cbiAgICByZXR1cm4gbm9kZXM7XG59XG5cbnZhciBEb2NQcmV2aWV3ID0gKGZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gICAgX2luaGVyaXRzKERvY1ByZXZpZXcsIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gICAgZnVuY3Rpb24gRG9jUHJldmlldyhwcm9wcykge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRG9jUHJldmlldyk7XG5cbiAgICAgICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoRG9jUHJldmlldy5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIHByb3BzKTtcbiAgICAgICAgdmFyIG5vZGVzID0gbm9kZXNGcm9tT2JqZWN0KHByb3BzLmFjdGl2aXR5Lm9iamVjdCwgcHJvcHMucHlkaW8pO1xuICAgICAgICBpZiAobm9kZXMubGVuZ3RoICYmICFub2Rlc1swXS5pc0xlYWYoKSkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgICAgICBwcmV2aWV3TG9hZGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIHByZXZpZXdGYWlsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIG5vZGVzOiBub2Rlc1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgcHJldmlld0xvYWRlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgcHJldmlld0ZhaWxlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgbm9kZXM6IG5vZGVzXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKERvY1ByZXZpZXcsIFt7XG4gICAgICAgIGtleTogJ3JlbmRlcicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICAgICB2YXIgcHlkaW8gPSB0aGlzLnByb3BzLnB5ZGlvO1xuICAgICAgICAgICAgdmFyIF9zdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgICAgICAgICB2YXIgcHJldmlld0xvYWRlZCA9IF9zdGF0ZS5wcmV2aWV3TG9hZGVkO1xuICAgICAgICAgICAgdmFyIG5vZGVzID0gX3N0YXRlLm5vZGVzO1xuICAgICAgICAgICAgdmFyIHByZXZpZXdGYWlsZWQgPSBfc3RhdGUucHJldmlld0ZhaWxlZDtcblxuICAgICAgICAgICAgdmFyIHByZXZpZXdOb2RlID0gbm9kZXMubGVuZ3RoID8gbm9kZXNbMF0gOiBudWxsO1xuICAgICAgICAgICAgdmFyIGZQcmV2aWV3ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgdmFyIGZQcmV2aWV3TG9hZGluZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHZhciBmUHJldmlld1N0eWxlID0ge1xuICAgICAgICAgICAgICAgIGhlaWdodDogMjAwLCBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsIGZvbnRTaXplOiA3MFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmIChwcmV2aWV3Tm9kZSAmJiBwcmV2aWV3Tm9kZS5pc0xlYWYoKSkge1xuICAgICAgICAgICAgICAgIGlmIChwcmV2aWV3TG9hZGVkICYmICFwcmV2aWV3RmFpbGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGZQcmV2aWV3ID0gX3JlYWN0MlsnZGVmYXVsdCddLmNyZWF0ZUVsZW1lbnQoRmlsZVByZXZpZXcsIHsgc3R5bGU6IGZQcmV2aWV3U3R5bGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlOiBwcmV2aWV3Tm9kZSwgcHlkaW86IHB5ZGlvLCBsb2FkVGh1bWJuYWlsOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmljaFByZXZpZXc6IHRydWUsIHByb2Nlc3Npbmc6ICFwcmV2aWV3TG9hZGVkIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocHJldmlld0xvYWRlZCAmJiBwcmV2aWV3RmFpbGVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgZlByZXZpZXcgPSBfcmVhY3QyWydkZWZhdWx0J10uY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBzdHlsZTogX2V4dGVuZHMoe30sIGZQcmV2aWV3U3R5bGUsIHsgZmxleERpcmVjdGlvbjogJ2NvbHVtbicgfSksIGNsYXNzTmFtZTogJ21pbWVmb250LWNvbnRhaW5lcicgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9yZWFjdDJbJ2RlZmF1bHQnXS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IGNsYXNzTmFtZTogJ21pbWVmb250IG1kaSBtZGktZGVsZXRlJyB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9yZWFjdDJbJ2RlZmF1bHQnXS5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzcGFuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0eWxlOiB7IGZvbnRTaXplOiAxMyB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0ZpbGUgZGVsZXRlZCdcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5vZGVSZXBvSWQgPSBwcmV2aWV3Tm9kZS5nZXRNZXRhZGF0YSgpLmdldCgncmVwb3NpdG9yeV9pZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5vZGVSZXBvTGFiZWwgPSBwcmV2aWV3Tm9kZS5nZXRNZXRhZGF0YSgpLmdldCgncmVwb3NpdG9yeV9sYWJlbCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb3ZpZGVyID0gbmV3IE1ldGFOb2RlUHJvdmlkZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpZXdOb2RlLm9ic2VydmVPbmNlKCdlcnJvcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5zZXRTdGF0ZSh7IHByZXZpZXdMb2FkZWQ6IHRydWUsIHByZXZpZXdGYWlsZWQ6IHRydWUgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyLmxvYWRMZWFmTm9kZVN5bmMocHJldmlld05vZGUsIGZ1bmN0aW9uIChsb2FkZWROb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGVkTm9kZS5nZXRNZXRhZGF0YSgpLnNldCgncmVwb3NpdG9yeV9pZCcsIG5vZGVSZXBvSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRlZE5vZGUuZ2V0TWV0YWRhdGEoKS5zZXQoJ3JlcG9zaXRvcnlfbGFiZWwnLCBub2RlUmVwb0xhYmVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2Rlc1swXSA9IGxvYWRlZE5vZGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2V0U3RhdGUoeyBwcmV2aWV3TG9hZGVkOiB0cnVlLCBub2Rlczogbm9kZXMgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB0cnVlLCB7IHRtcF9yZXBvc2l0b3J5X2lkOiBub2RlUmVwb0lkIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBmUHJldmlld0xvYWRpbmcgPSBfcmVhY3QyWydkZWZhdWx0J10uY3JlYXRlRWxlbWVudChGaWxlUHJldmlldywgeyBzdHlsZTogZlByZXZpZXdTdHlsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlOiBwcmV2aWV3Tm9kZSwgcHlkaW86IHB5ZGlvLCBsb2FkVGh1bWJuYWlsOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByaWNoUHJldmlldzogZmFsc2UsIHByb2Nlc3Npbmc6IHRydWUgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgYnV0dG9ucyA9IFtdO1xuICAgICAgICAgICAgdmFyIGN1cnJlbnRSZXBvQnV0dG9uID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgdmFyIGN1cnJlbnRSZXBvc2l0b3J5ID0gcHlkaW8udXNlci5nZXRBY3RpdmVSZXBvc2l0b3J5KCk7XG5cbiAgICAgICAgICAgIHZhciBfbG9vcCA9IGZ1bmN0aW9uIChpKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5vZGUgPSBub2Rlc1tpXTtcbiAgICAgICAgICAgICAgICB2YXIgYnV0dG9uID0gX3JlYWN0MlsnZGVmYXVsdCddLmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICB7IHN0eWxlOiB7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIHBhZGRpbmdMZWZ0OiAxMCB9IH0sXG4gICAgICAgICAgICAgICAgICAgIF9yZWFjdDJbJ2RlZmF1bHQnXS5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHN0eWxlOiB7IGZsZXg6IDEsIGZvbnRTaXplOiAxMywgZm9udFdlaWdodDogNTAwLCBjb2xvcjogJ3JnYmEoMCwwLDAsMC4zMyknIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHB5ZGlvLk1lc3NhZ2VIYXNoWydub3RpZmljYXRpb25fY2VudGVyLjE2J10sXG4gICAgICAgICAgICAgICAgICAgICAgICAnICcsXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmdldE1ldGFkYXRhKCkuZ2V0KCdyZXBvc2l0b3J5X2xhYmVsJylcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgX3JlYWN0MlsnZGVmYXVsdCddLmNyZWF0ZUVsZW1lbnQoSWNvbkJ1dHRvbiwgeyBpY29uQ2xhc3NOYW1lOiBcIm1kaSBtZGktb3Blbi1pbi1uZXdcIiwgdG9vbHRpcDogcHlkaW8uTWVzc2FnZUhhc2hbJ25vdGlmaWNhdGlvbl9jZW50ZXIuNiddLCB0b29sdGlwUG9zaXRpb246IFwidG9wLWNlbnRlclwiLCBvbkNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHlkaW8uZ29Ubyhub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gfSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGlmIChub2RlLmdldE1ldGFkYXRhKCkuZ2V0KCdyZXBvc2l0b3J5X2lkJykgPT09IGN1cnJlbnRSZXBvc2l0b3J5KSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRSZXBvQnV0dG9uID0gX3JlYWN0MlsnZGVmYXVsdCddLmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgc3R5bGU6IHsgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJyB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBfcmVhY3QyWydkZWZhdWx0J10uY3JlYXRlRWxlbWVudCgnc3BhbicsIHsgc3R5bGU6IHsgZmxleDogMSB9IH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgJyAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3JlYWN0MlsnZGVmYXVsdCddLmNyZWF0ZUVsZW1lbnQoRmxhdEJ1dHRvbiwgeyBsYWJlbDogcHlkaW8uTWVzc2FnZUhhc2hbJ25vdGlmaWNhdGlvbl9jZW50ZXIuNiddLCBpY29uQ2xhc3NOYW1lOiBcIm1kaSBtZGktb3Blbi1pbi1uZXdcIiwgdG9vbHRpcDogJ09wZW4nLCB0b29sdGlwUG9zaXRpb246IFwidG9wLXJpZ2h0XCIsIG9uQ2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHlkaW8uZ29Ubyhub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0pXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnYnJlYWsnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBidXR0b25zLnB1c2goYnV0dG9uKTtcbiAgICAgICAgICAgICAgICBpZiAoaSA8IG5vZGVzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9ucy5wdXNoKF9yZWFjdDJbJ2RlZmF1bHQnXS5jcmVhdGVFbGVtZW50KERpdmlkZXIsIG51bGwpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9yZXQyID0gX2xvb3AoaSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoX3JldDIgPT09ICdicmVhaycpIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGN1cnJlbnRSZXBvQnV0dG9uKSB7XG4gICAgICAgICAgICAgICAgYnV0dG9ucyA9IFtjdXJyZW50UmVwb0J1dHRvbl07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBfcmVhY3QyWydkZWZhdWx0J10uY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICFwcmV2aWV3RmFpbGVkICYmIF9yZWFjdDJbJ2RlZmF1bHQnXS5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgeyBzdHlsZTogeyBwYWRkaW5nOiA2IH0gfSxcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uc1xuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gRG9jUHJldmlldztcbn0pKF9yZWFjdDJbJ2RlZmF1bHQnXS5Db21wb25lbnQpO1xuXG52YXIgRG9jTGluayA9IChmdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudDIpIHtcbiAgICBfaW5oZXJpdHMoRG9jTGluaywgX1JlYWN0JENvbXBvbmVudDIpO1xuXG4gICAgZnVuY3Rpb24gRG9jTGluayhwcm9wcykge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRG9jTGluayk7XG5cbiAgICAgICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoRG9jTGluay5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHNob3dQb3BvdmVyOiBmYWxzZSxcbiAgICAgICAgICAgIHBvcG92ZXJBbmNob3I6IG51bGxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoRG9jTGluaywgW3tcbiAgICAgICAga2V5OiAncmVuZGVyJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICAgICAgICB2YXIgX3Byb3BzID0gdGhpcy5wcm9wcztcbiAgICAgICAgICAgIHZhciBweWRpbyA9IF9wcm9wcy5weWRpbztcbiAgICAgICAgICAgIHZhciBhY3Rpdml0eSA9IF9wcm9wcy5hY3Rpdml0eTtcbiAgICAgICAgICAgIHZhciBjaGlsZHJlbiA9IF9wcm9wcy5jaGlsZHJlbjtcbiAgICAgICAgICAgIHZhciBsaW5rU3R5bGUgPSBfcHJvcHMubGlua1N0eWxlO1xuXG4gICAgICAgICAgICBpZiAoIWFjdGl2aXR5Lm9iamVjdC5uYW1lKSB7XG4gICAgICAgICAgICAgICAgYWN0aXZpdHkub2JqZWN0Lm5hbWUgPSAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBub2RlcyA9IG5vZGVzRnJvbU9iamVjdChhY3Rpdml0eS5vYmplY3QsIHB5ZGlvKTtcblxuICAgICAgICAgICAgdmFyIG9uQ2xpY2sgPSB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgb25Nb3VzZU92ZXIgPSB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgb25Nb3VzZU91dCA9IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBwb3BvdmVyID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICB2YXIgcGF0aFBhcnRzID0gYWN0aXZpdHkub2JqZWN0Lm5hbWUucmVwbGFjZSgnZG9jOi8vJywgJycpLnNwbGl0KCcvJyk7XG4gICAgICAgICAgICBwYXRoUGFydHMuc2hpZnQoKTtcbiAgICAgICAgICAgIHZhciB0aXRsZSA9ICcvJyArIHBhdGhQYXJ0cy5qb2luKCcvJyk7XG5cbiAgICAgICAgICAgIGlmIChub2Rlcy5sZW5ndGggPiAxKSB7XG5cbiAgICAgICAgICAgICAgICBvbkNsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBweWRpby5nb1RvKG5vZGVzWzBdKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIG9uTW91c2VPdXQgPSBkZWJvdW5jZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzMi5zZXRTdGF0ZSh7IHNob3dQb3BvdmVyOiBmYWxzZSB9KTtcbiAgICAgICAgICAgICAgICB9LCAzNTApO1xuICAgICAgICAgICAgICAgIG9uTW91c2VPdmVyID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMyLnNldFN0YXRlKHsgc2hvd1BvcG92ZXI6IHRydWUsIHBvcG92ZXJBbmNob3I6IGUuY3VycmVudFRhcmdldCB9KTtcbiAgICAgICAgICAgICAgICAgICAgb25Nb3VzZU91dC5jYW5jZWwoKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHZhciBvbk1vdXNlT3ZlcklubmVyID0gZnVuY3Rpb24gb25Nb3VzZU92ZXJJbm5lcihlKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzMi5zZXRTdGF0ZSh7IHNob3dQb3BvdmVyOiB0cnVlIH0pO1xuICAgICAgICAgICAgICAgICAgICBvbk1vdXNlT3V0LmNhbmNlbCgpO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBwb3BvdmVyID0gX3JlYWN0MlsnZGVmYXVsdCddLmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgIFBvcG92ZXIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZW46IHRoaXMuc3RhdGUuc2hvd1BvcG92ZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBhbmNob3JFbDogdGhpcy5zdGF0ZS5wb3BvdmVyQW5jaG9yLFxuICAgICAgICAgICAgICAgICAgICAgICAgb25SZXF1ZXN0Q2xvc2U6IGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVhc29uICE9PSAnY2xpY2tBd2F5Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpczIuc2V0U3RhdGUoeyBzaG93UG9wb3ZlcjogZmFsc2UgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuY2hvck9yaWdpbjogeyBob3Jpem9udGFsOiBcImxlZnRcIiwgdmVydGljYWw6IFwiYm90dG9tXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldE9yaWdpbjogeyBob3Jpem9udGFsOiBcImxlZnRcIiwgdmVydGljYWw6IFwidG9wXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZUxheWVyRm9yQ2xpY2tBd2F5OiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBfcmVhY3QyWydkZWZhdWx0J10uY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgIFBhcGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyB6RGVwdGg6IDIsIHN0eWxlOiB7IHdpZHRoOiAyMDAsIGhlaWdodDogJ2F1dG8nLCBvdmVyZmxvd1k6ICdhdXRvJyB9LCBvbk1vdXNlT3Zlcjogb25Nb3VzZU92ZXJJbm5lciwgb25Nb3VzZU91dDogb25Nb3VzZU91dCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgX3JlYWN0MlsnZGVmYXVsdCddLmNyZWF0ZUVsZW1lbnQoRG9jUHJldmlldywgeyBweWRpbzogcHlkaW8sIGFjdGl2aXR5OiBhY3Rpdml0eSB9KVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobm9kZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgb25DbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcHlkaW8uZ29Ubyhub2Rlc1swXSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIF9yZWFjdDJbJ2RlZmF1bHQnXS5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICdzcGFuJyxcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgIF9yZWFjdDJbJ2RlZmF1bHQnXS5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAnYScsXG4gICAgICAgICAgICAgICAgICAgIHsgdGl0bGU6IHRpdGxlLCBzdHlsZTogX2V4dGVuZHMoeyBjdXJzb3I6ICdwb2ludGVyJywgY29sb3I6ICdyZ2IoNjYsIDE0MCwgMTc5KScgfSwgbGlua1N0eWxlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uTW91c2VPdmVyOiBvbk1vdXNlT3ZlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uTW91c2VPdXQ6IG9uTW91c2VPdXQsXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiBvbkNsaWNrIH0sXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBwb3BvdmVyXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIERvY0xpbms7XG59KShfcmVhY3QyWydkZWZhdWx0J10uQ29tcG9uZW50KTtcblxuRG9jTGluay5Qcm9wVHlwZXMgPSB7XG4gICAgYWN0aXZpdHk6IF9yZWFjdDJbJ2RlZmF1bHQnXS5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIHB5ZGlvOiBfcmVhY3QyWydkZWZhdWx0J10uUHJvcFR5cGVzLmluc3RhbmNlT2YoUHlkaW8pXG59O1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBEb2NMaW5rID0gUHlkaW9Db250ZXh0Q29uc3VtZXIoRG9jTGluayk7XG5leHBvcnRzWydkZWZhdWx0J10gPSBEb2NMaW5rO1xuZXhwb3J0cy5ub2Rlc0Zyb21PYmplY3QgPSBub2Rlc0Zyb21PYmplY3Q7XG4iLCIvKlxuICogQ29weXJpZ2h0IDIwMDctMjAxNyBDaGFybGVzIGR1IEpldSAtIEFic3RyaXVtIFNBUyA8dGVhbSAoYXQpIHB5ZC5pbz5cbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFB5ZGlvLlxuICpcbiAqIFB5ZGlvIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogUHlkaW8gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggUHlkaW8uICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKlxuICogVGhlIGxhdGVzdCBjb2RlIGNhbiBiZSBmb3VuZCBhdCA8aHR0cHM6Ly9weWRpby5jb20+LlxuICovXG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKCd2YWx1ZScgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KF94LCBfeDIsIF94MykgeyB2YXIgX2FnYWluID0gdHJ1ZTsgX2Z1bmN0aW9uOiB3aGlsZSAoX2FnYWluKSB7IHZhciBvYmplY3QgPSBfeCwgcHJvcGVydHkgPSBfeDIsIHJlY2VpdmVyID0gX3gzOyBfYWdhaW4gPSBmYWxzZTsgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlOyB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7IGlmIChkZXNjID09PSB1bmRlZmluZWQpIHsgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpOyBpZiAocGFyZW50ID09PSBudWxsKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gZWxzZSB7IF94ID0gcGFyZW50OyBfeDIgPSBwcm9wZXJ0eTsgX3gzID0gcmVjZWl2ZXI7IF9hZ2FpbiA9IHRydWU7IGRlc2MgPSBwYXJlbnQgPSB1bmRlZmluZWQ7IGNvbnRpbnVlIF9mdW5jdGlvbjsgfSB9IGVsc2UgaWYgKCd2YWx1ZScgaW4gZGVzYykgeyByZXR1cm4gZGVzYy52YWx1ZTsgfSBlbHNlIHsgdmFyIGdldHRlciA9IGRlc2MuZ2V0OyBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpOyB9IH0gfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gJ2Z1bmN0aW9uJyAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ1N1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgJyArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX21hdGVyaWFsVWkgPSByZXF1aXJlKCdtYXRlcmlhbC11aScpO1xuXG52YXIgX0FjdGl2aXR5TGlzdCA9IHJlcXVpcmUoJy4vQWN0aXZpdHlMaXN0Jyk7XG5cbnZhciBfQWN0aXZpdHlMaXN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0FjdGl2aXR5TGlzdCk7XG5cbnZhciBfUHlkaW8kcmVxdWlyZUxpYiA9IFB5ZGlvLnJlcXVpcmVMaWIoJ2Jvb3QnKTtcblxudmFyIFB5ZGlvQ29udGV4dENvbnN1bWVyID0gX1B5ZGlvJHJlcXVpcmVMaWIuUHlkaW9Db250ZXh0Q29uc3VtZXI7XG5cbnZhciBfUHlkaW8kcmVxdWlyZUxpYjIgPSBQeWRpby5yZXF1aXJlTGliKCd3b3Jrc3BhY2VzJyk7XG5cbnZhciBJbmZvUGFuZWxDYXJkID0gX1B5ZGlvJHJlcXVpcmVMaWIyLkluZm9QYW5lbENhcmQ7XG5cbnZhciBJbmZvUGFuZWwgPSAoZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgICBfaW5oZXJpdHMoSW5mb1BhbmVsLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICAgIGZ1bmN0aW9uIEluZm9QYW5lbCgpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEluZm9QYW5lbCk7XG5cbiAgICAgICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoSW5mb1BhbmVsLnByb3RvdHlwZSksICdjb25zdHJ1Y3RvcicsIHRoaXMpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKEluZm9QYW5lbCwgW3tcbiAgICAgICAga2V5OiAncmVuZGVyJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgICAgIHZhciBfcHJvcHMgPSB0aGlzLnByb3BzO1xuICAgICAgICAgICAgdmFyIG5vZGUgPSBfcHJvcHMubm9kZTtcbiAgICAgICAgICAgIHZhciBweWRpbyA9IF9wcm9wcy5weWRpbztcblxuICAgICAgICAgICAgaWYgKHB5ZGlvLmdldFBsdWdpbkNvbmZpZ3MoXCJjb3JlLmFjdGl2aXR5c3RyZWFtc1wiKS5nZXQoXCJBQ1RJVklUWV9TSE9XX0FDVElWSVRJRVNcIikgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBfcmVhY3QyWydkZWZhdWx0J10uY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICBJbmZvUGFuZWxDYXJkLFxuICAgICAgICAgICAgICAgIHsgaWRlbnRpZmllcjogXCJhY3Rpdml0eVwiLCB0aXRsZTogbm9kZS5pc0xlYWYoKSA/IHB5ZGlvLk1lc3NhZ2VIYXNoWydub3RpZmljYXRpb25fY2VudGVyLjExJ10gOiBweWRpby5NZXNzYWdlSGFzaFsnbm90aWZpY2F0aW9uX2NlbnRlci4xMCddIH0sXG4gICAgICAgICAgICAgICAgX3JlYWN0MlsnZGVmYXVsdCddLmNyZWF0ZUVsZW1lbnQoX0FjdGl2aXR5TGlzdDJbJ2RlZmF1bHQnXSwge1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiAnTk9ERV9JRCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHREYXRhOiBub2RlLmdldE1ldGFkYXRhKCkuZ2V0KCd1dWlkJyksXG4gICAgICAgICAgICAgICAgICAgIGJveE5hbWU6ICdvdXRib3gnLFxuICAgICAgICAgICAgICAgICAgICBzdHlsZTogeyBvdmVyZmxvd1k6ICdzY3JvbGwnLCBtYXhIZWlnaHQ6IDM4MCB9LFxuICAgICAgICAgICAgICAgICAgICBsaXN0Q29udGV4dDogXCJOT0RFLVwiICsgKG5vZGUuaXNMZWFmKCkgPyBcIkxFQUZcIiA6IFwiQ09MTEVDVElPTlwiKSxcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRPZlZpZXc6IFwiQUNUT1JcIixcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheUNvbnRleHQ6ICdpbmZvUGFuZWwnXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gSW5mb1BhbmVsO1xufSkoX3JlYWN0MlsnZGVmYXVsdCddLkNvbXBvbmVudCk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IEluZm9QYW5lbCA9IFB5ZGlvQ29udGV4dENvbnN1bWVyKEluZm9QYW5lbCk7XG5leHBvcnRzWydkZWZhdWx0J10gPSBJbmZvUGFuZWw7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcbiIsIi8qXG4gKiBDb3B5cmlnaHQgMjAwNy0yMDE4IENoYXJsZXMgZHUgSmV1IC0gQWJzdHJpdW0gU0FTIDx0ZWFtIChhdCkgcHlkLmlvPlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgUHlkaW8uXG4gKlxuICogUHlkaW8gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBQeWRpbyBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBQeWRpby4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqXG4gKiBUaGUgbGF0ZXN0IGNvZGUgY2FuIGJlIGZvdW5kIGF0IDxodHRwczovL3B5ZGlvLmNvbT4uXG4gKi9cblwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIExpc3RlbmVycyA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTGlzdGVuZXJzKCkge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTGlzdGVuZXJzKTtcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoTGlzdGVuZXJzLCBudWxsLCBbe1xuICAgICAgICBrZXk6IFwiZHluYW1pY0J1aWxkZXJcIixcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGR5bmFtaWNCdWlsZGVyKGNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgIHZhciBweWRpbyA9IGdsb2JhbC5weWRpbztcbiAgICAgICAgICAgIHZhciBNZXNzYWdlSGFzaCA9IHB5ZGlvLk1lc3NhZ2VIYXNoO1xuXG4gICAgICAgICAgICB2YXIgbiA9IHB5ZGlvLmdldFVzZXJTZWxlY3Rpb24oKS5nZXRVbmlxdWVOb2RlKCk7XG4gICAgICAgICAgICBpZiAoIW4pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBidWlsZGVyTWVudUl0ZW1zID0gW107XG4gICAgICAgICAgICB2YXIgbWV0YVZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgaWYgKG4uZ2V0TWV0YWRhdGEoKS5nZXQoXCJtZXRhX3dhdGNoZWRcIikpIHtcbiAgICAgICAgICAgICAgICBtZXRhVmFsdWUgPSBuLmdldE1ldGFkYXRhKCkuZ2V0KFwibWV0YV93YXRjaGVkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnVpbGRlck1lbnVJdGVtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICBuYW1lOiBNZXNzYWdlSGFzaFtcIm1ldGEud2F0Y2guMTFcIl0sXG4gICAgICAgICAgICAgICAgYWx0OiBNZXNzYWdlSGFzaFtcIm1ldGEud2F0Y2guXCIgKyAobi5pc0xlYWYoKSA/IFwiMTJcIiA6IFwiMTJiXCIpXSxcbiAgICAgICAgICAgICAgICBpY29uX2NsYXNzOiBtZXRhVmFsdWUgJiYgbWV0YVZhbHVlID09PSBcIk1FVEFfV0FUQ0hfQ0hBTkdFXCIgPyAnbWRpIG1kaS1jaGVja2JveC1tYXJrZWQtY2lyY2xlLW91dGxpbmUnIDogJ21kaSBtZGktY2hlY2tib3gtYmxhbmstY2lyY2xlLW91dGxpbmUnLFxuICAgICAgICAgICAgICAgIGNhbGxiYWNrOiAoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBseSgnd2F0Y2hfY2hhbmdlJyk7XG4gICAgICAgICAgICAgICAgfSkuYmluZCh0aGlzKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBidWlsZGVyTWVudUl0ZW1zLnB1c2goe1xuICAgICAgICAgICAgICAgIG5hbWU6IE1lc3NhZ2VIYXNoW1wibWV0YS53YXRjaC45XCJdLFxuICAgICAgICAgICAgICAgIGFsdDogTWVzc2FnZUhhc2hbXCJtZXRhLndhdGNoLlwiICsgKG4uaXNMZWFmKCkgPyBcIjEwXCIgOiBcIjEwYlwiKV0sXG4gICAgICAgICAgICAgICAgaWNvbl9jbGFzczogbWV0YVZhbHVlICYmIG1ldGFWYWx1ZSA9PT0gXCJNRVRBX1dBVENIX1JFQURcIiA/ICdtZGkgbWRpLWNoZWNrYm94LW1hcmtlZC1jaXJjbGUtb3V0bGluZScgOiAnbWRpIG1kaS1jaGVja2JveC1ibGFuay1jaXJjbGUtb3V0bGluZScsXG4gICAgICAgICAgICAgICAgY2FsbGJhY2s6IChmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGx5KCd3YXRjaF9yZWFkJyk7XG4gICAgICAgICAgICAgICAgfSkuYmluZCh0aGlzKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBidWlsZGVyTWVudUl0ZW1zLnB1c2goe1xuICAgICAgICAgICAgICAgIG5hbWU6IE1lc3NhZ2VIYXNoW1wibWV0YS53YXRjaC4xM1wiXSxcbiAgICAgICAgICAgICAgICBhbHQ6IE1lc3NhZ2VIYXNoW1wibWV0YS53YXRjaC5cIiArIChuLmlzTGVhZigpID8gXCIxNFwiIDogXCIxNGJcIildLFxuICAgICAgICAgICAgICAgIGljb25fY2xhc3M6IG1ldGFWYWx1ZSAmJiBtZXRhVmFsdWUgPT09IFwiTUVUQV9XQVRDSF9CT1RIXCIgPyAnbWRpIG1kaS1jaGVja2JveC1tYXJrZWQtY2lyY2xlLW91dGxpbmUnIDogJ21kaSBtZGktY2hlY2tib3gtYmxhbmstY2lyY2xlLW91dGxpbmUnLFxuICAgICAgICAgICAgICAgIGNhbGxiYWNrOiAoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBseSgnd2F0Y2hfYm90aCcpO1xuICAgICAgICAgICAgICAgIH0pLmJpbmQodGhpcylcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKG1ldGFWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGJ1aWxkZXJNZW51SXRlbXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHNlcGFyYXRvcjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJ1aWxkZXJNZW51SXRlbXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IE1lc3NhZ2VIYXNoWydtZXRhLndhdGNoLjMnXSxcbiAgICAgICAgICAgICAgICAgICAgYWx0OiBNZXNzYWdlSGFzaFtcIm1ldGEud2F0Y2guXCIgKyAobi5pc0xlYWYoKSA/IFwiOFwiIDogXCI0XCIpXSxcbiAgICAgICAgICAgICAgICAgICAgaWNvbl9jbGFzczogJ21kaSBtZGktY2xvc2UtY2lyY2xlLW91dGxpbmUnLFxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGx5KCd3YXRjaF9zdG9wJyk7XG4gICAgICAgICAgICAgICAgICAgIH0pLmJpbmQodGhpcylcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGJ1aWxkZXJNZW51SXRlbXM7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gTGlzdGVuZXJzO1xufSkoKTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBMaXN0ZW5lcnM7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuIiwiLypcbiAqIENvcHlyaWdodCAyMDA3LTIwMjAgQ2hhcmxlcyBkdSBKZXUgLSBBYnN0cml1bSBTQVMgPHRlYW0gKGF0KSBweWQuaW8+XG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBQeWRpby5cbiAqXG4gKiBQeWRpbyBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFB5ZGlvIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIFB5ZGlvLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICpcbiAqIFRoZSBsYXRlc3QgY29kZSBjYW4gYmUgZm91bmQgYXQgPGh0dHBzOi8vcHlkaW8uY29tPi5cbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmICgndmFsdWUnIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG52YXIgX2dldCA9IGZ1bmN0aW9uIGdldChfeCwgX3gyLCBfeDMpIHsgdmFyIF9hZ2FpbiA9IHRydWU7IF9mdW5jdGlvbjogd2hpbGUgKF9hZ2FpbikgeyB2YXIgb2JqZWN0ID0gX3gsIHByb3BlcnR5ID0gX3gyLCByZWNlaXZlciA9IF94MzsgX2FnYWluID0gZmFsc2U7IGlmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTsgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpOyBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7IHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTsgaWYgKHBhcmVudCA9PT0gbnVsbCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IGVsc2UgeyBfeCA9IHBhcmVudDsgX3gyID0gcHJvcGVydHk7IF94MyA9IHJlY2VpdmVyOyBfYWdhaW4gPSB0cnVlOyBkZXNjID0gcGFyZW50ID0gdW5kZWZpbmVkOyBjb250aW51ZSBfZnVuY3Rpb247IH0gfSBlbHNlIGlmICgndmFsdWUnIGluIGRlc2MpIHsgcmV0dXJuIGRlc2MudmFsdWU7IH0gZWxzZSB7IHZhciBnZXR0ZXIgPSBkZXNjLmdldDsgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTsgfSB9IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09ICdmdW5jdGlvbicgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90ICcgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9tYXRlcmlhbFVpID0gcmVxdWlyZSgnbWF0ZXJpYWwtdWknKTtcblxudmFyIF9tYXRlcmlhbFVpU3R5bGVzID0gcmVxdWlyZSgnbWF0ZXJpYWwtdWkvc3R5bGVzJyk7XG5cbnZhciBfQ2xpZW50ID0gcmVxdWlyZSgnLi9DbGllbnQnKTtcblxudmFyIF9DbGllbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQ2xpZW50KTtcblxudmFyIF9BY3Rpdml0eUxpc3QgPSByZXF1aXJlKCcuL0FjdGl2aXR5TGlzdCcpO1xuXG52YXIgX0FjdGl2aXR5TGlzdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9BY3Rpdml0eUxpc3QpO1xuXG52YXIgX2xvZGFzaERlYm91bmNlID0gcmVxdWlyZSgnbG9kYXNoLmRlYm91bmNlJyk7XG5cbnZhciBfbG9kYXNoRGVib3VuY2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbG9kYXNoRGVib3VuY2UpO1xuXG52YXIgX2NvbG9yID0gcmVxdWlyZSgnY29sb3InKTtcblxudmFyIF9jb2xvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb2xvcik7XG5cbnZhciBVc2VyUGFuZWwgPSAoZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgICBfaW5oZXJpdHMoVXNlclBhbmVsLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICAgIGZ1bmN0aW9uIFVzZXJQYW5lbChwcm9wcykge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgVXNlclBhbmVsKTtcblxuICAgICAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihVc2VyUGFuZWwucHJvdG90eXBlKSwgJ2NvbnN0cnVjdG9yJywgdGhpcykuY2FsbCh0aGlzLCBwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICB1bnJlYWRTdGF0dXM6IDAsXG4gICAgICAgICAgICBvcGVuOiBmYWxzZSxcbiAgICAgICAgICAgIGRhdGE6IFtdXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucmVsb2FkRGF0YSA9ICgwLCBfbG9kYXNoRGVib3VuY2UyWydkZWZhdWx0J10pKHRoaXMucmVsb2FkRGF0YS5iaW5kKHRoaXMpLCA1MDApO1xuICAgICAgICB0aGlzLnJlbG9hZFVucmVhZCA9ICgwLCBfbG9kYXNoRGVib3VuY2UyWydkZWZhdWx0J10pKHRoaXMucmVsb2FkVW5yZWFkLmJpbmQodGhpcyksIDUwMCk7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKFVzZXJQYW5lbCwgW3tcbiAgICAgICAga2V5OiAncmVsb2FkRGF0YScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZWxvYWREYXRhKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICAgICAgX0NsaWVudDJbJ2RlZmF1bHQnXS5sb2FkQWN0aXZpdHlTdHJlYW1zKCdVU0VSX0lEJywgdGhpcy5wcm9wcy5weWRpby51c2VyLmlkLCAnaW5ib3gnKS50aGVuKGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuc2V0U3RhdGUoeyBkYXRhOiBqc29uIH0pO1xuICAgICAgICAgICAgfSlbJ2NhdGNoJ10oZnVuY3Rpb24gKG1zZykge1xuICAgICAgICAgICAgICAgIF90aGlzLnNldFN0YXRlKHsgZXJyb3I6IG1zZyB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZWxvYWRVbnJlYWQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVsb2FkVW5yZWFkKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgICAgIF9DbGllbnQyWydkZWZhdWx0J10uVW5yZWFkSW5ib3godGhpcy5wcm9wcy5weWRpby51c2VyLmlkKS50aGVuKGZ1bmN0aW9uIChjb3VudCkge1xuICAgICAgICAgICAgICAgIF90aGlzMi5zZXRTdGF0ZSh7IHVucmVhZFN0YXR1czogY291bnQgfSk7XG4gICAgICAgICAgICB9KVsnY2F0Y2gnXShmdW5jdGlvbiAobXNnKSB7fSk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ29uU3RhdHVzQ2hhbmdlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIG9uU3RhdHVzQ2hhbmdlKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMub25VbnJlYWRTdGF0dXNDaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLm9uVW5yZWFkU3RhdHVzQ2hhbmdlKHRoaXMuc3RhdGUudW5yZWFkU3RhdHVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnaGFuZGxlVG91Y2hUYXAnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gaGFuZGxlVG91Y2hUYXAoZXZlbnQpIHtcbiAgICAgICAgICAgIC8vIFRoaXMgcHJldmVudHMgZ2hvc3QgY2xpY2suXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgLy9pZih0aGlzLnN0YXRlLnVucmVhZFN0YXR1cyl7XG4gICAgICAgICAgICAvL3RoaXMudXBkYXRlQWxlcnRzTGFzdFJlYWQoKTtcbiAgICAgICAgICAgIC8vfVxuICAgICAgICAgICAgdGhpcy5yZWxvYWREYXRhKCk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBvcGVuOiB0cnVlLFxuICAgICAgICAgICAgICAgIGFuY2hvckVsOiBldmVudC5jdXJyZW50VGFyZ2V0LFxuICAgICAgICAgICAgICAgIHVucmVhZFN0YXR1czogMFxuICAgICAgICAgICAgfSwgdGhpcy5vblN0YXR1c0NoYW5nZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnaGFuZGxlUmVxdWVzdENsb3NlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGhhbmRsZVJlcXVlc3RDbG9zZSgpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIG9wZW46IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnY29tcG9uZW50V2lsbE1vdW50JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgICAgICAgICB0aGlzLnJlbG9hZFVucmVhZCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5weWRpby5vYnNlcnZlKCd3ZWJzb2NrZXRfZXZlbnQ6YWN0aXZpdHknLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMzLnN0YXRlLm9wZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMzLnJlbG9hZERhdGEoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBfdGhpczMucmVsb2FkVW5yZWFkKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3JlbmRlcicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgICAgICB2YXIgX3Byb3BzID0gdGhpcy5wcm9wcztcbiAgICAgICAgICAgIHZhciBweWRpbyA9IF9wcm9wcy5weWRpbztcbiAgICAgICAgICAgIHZhciBpY29uU3R5bGUgPSBfcHJvcHMuaWNvblN0eWxlO1xuICAgICAgICAgICAgdmFyIG11aVRoZW1lID0gX3Byb3BzLm11aVRoZW1lO1xuICAgICAgICAgICAgdmFyIF9zdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgICAgICAgICB2YXIgb3BlbiA9IF9zdGF0ZS5vcGVuO1xuICAgICAgICAgICAgdmFyIGFuY2hvckVsID0gX3N0YXRlLmFuY2hvckVsO1xuICAgICAgICAgICAgdmFyIHVucmVhZFN0YXR1cyA9IF9zdGF0ZS51bnJlYWRTdGF0dXM7XG5cbiAgICAgICAgICAgIHZhciBidXR0b25TdHlsZSA9IHsgYm9yZGVyUmFkaXVzOiAnNTAlJyB9O1xuICAgICAgICAgICAgaWYgKG9wZW4gJiYgaWNvblN0eWxlICYmIGljb25TdHlsZS5jb2xvcikge1xuICAgICAgICAgICAgICAgIGJ1dHRvblN0eWxlID0gX2V4dGVuZHMoe30sIGJ1dHRvblN0eWxlLCB7IGJhY2tncm91bmRDb2xvcjogKDAsIF9jb2xvcjJbJ2RlZmF1bHQnXSkoaWNvblN0eWxlLmNvbG9yKS5mYWRlKDAuOSkudG9TdHJpbmcoKSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBfcmVhY3QyWydkZWZhdWx0J10uY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAnc3BhbicsXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICBfcmVhY3QyWydkZWZhdWx0J10uY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7IHBvc2l0aW9uOiAncmVsYXRpdmUnLCBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyB9LFxuXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWRnZUNvbnRlbnQ6IHRoaXMuc3RhdGUudW5yZWFkU3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kYXJ5OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmFkZ2VTdHlsZTogdGhpcy5zdGF0ZS51bnJlYWRTdGF0dXMgPyBudWxsIDogeyBkaXNwbGF5OiAnbm9uZScgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBfcmVhY3QyWydkZWZhdWx0J10uY3JlYXRlRWxlbWVudChfbWF0ZXJpYWxVaS5JY29uQnV0dG9uLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvblRvdWNoVGFwOiB0aGlzLmhhbmRsZVRvdWNoVGFwLmJpbmQodGhpcyksXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uQ2xhc3NOYW1lOiB0aGlzLnByb3BzLmljb25DbGFzc05hbWUgfHwgXCJtZGkgbWRpLWJlbGxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6ICh1bnJlYWRTdGF0dXMgPyB1bnJlYWRTdGF0dXMgKyAnICcgOiAnJykgKyB0aGlzLnByb3BzLnB5ZGlvLk1lc3NhZ2VIYXNoWydub3RpZmljYXRpb25fY2VudGVyLjQnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3VzZXJBY3Rpb25CdXR0b24gYWxlcnRzQnV0dG9uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb25TdHlsZTogaWNvblN0eWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IGJ1dHRvblN0eWxlXG4gICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICB1bnJlYWRTdGF0dXMgPiAwICYmIF9yZWFjdDJbJ2RlZmF1bHQnXS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7IHN0eWxlOiB7IHdpZHRoOiA2LCBoZWlnaHQ6IDYsIGJvcmRlclJhZGl1czogJzUwJScsIHRvcDogOSwgcmlnaHQ6IDYsIHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBiYWNrZ3JvdW5kQ29sb3I6IG11aVRoZW1lLnBhbGV0dGUuYWNjZW50MUNvbG9yIH0gfSlcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIF9yZWFjdDJbJ2RlZmF1bHQnXS5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICBfbWF0ZXJpYWxVaS5Qb3BvdmVyLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVuOiBvcGVuLFxuICAgICAgICAgICAgICAgICAgICAgICAgYW5jaG9yRWw6IGFuY2hvckVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgYW5jaG9yT3JpZ2luOiB7IGhvcml6b250YWw6ICdsZWZ0JywgdmVydGljYWw6ICd0b3AnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRPcmlnaW46IHsgaG9yaXpvbnRhbDogJ2xlZnQnLCB2ZXJ0aWNhbDogJ3RvcCcgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uUmVxdWVzdENsb3NlOiB0aGlzLmhhbmRsZVJlcXVlc3RDbG9zZS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHsgd2lkdGg6IDMyMCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgekRlcHRoOiAzXG5cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgX3JlYWN0MlsnZGVmYXVsdCddLmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgc3R5bGU6IHsgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgYm9yZGVyUmFkaXVzOiAnMnB4IDJweCAwIDAnLCB3aWR0aDogJzEwMCUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZjhmYWZjJywgYm9yZGVyQm90dG9tOiAnMXB4IHNvbGlkICNFQ0VGRjEnLCBjb2xvcjogbXVpVGhlbWUucGFsZXR0ZS5wcmltYXJ5MUNvbG9yIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9yZWFjdDJbJ2RlZmF1bHQnXS5jcmVhdGVFbGVtZW50KCdzcGFuJywgeyBjbGFzc05hbWU6IFwibWRpIG1kaS1iZWxsXCIsIHN0eWxlOiB7IGZvbnRTaXplOiAxOCwgbWFyZ2luOiAnMTJweCA4cHggMTRweCAxNnB4JyB9IH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3JlYWN0MlsnZGVmYXVsdCddLmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3NwYW4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3R5bGU6IHsgZm9udFNpemU6IDE1LCBmb250V2VpZ2h0OiA1MDAgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB5ZGlvLk1lc3NhZ2VIYXNoWydub3RpZmljYXRpb25fY2VudGVyLjEnXVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmRhdGEgJiYgX3JlYWN0MlsnZGVmYXVsdCddLmNyZWF0ZUVsZW1lbnQoX0FjdGl2aXR5TGlzdDJbJ2RlZmF1bHQnXSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6IHRoaXMuc3RhdGUuZGF0YS5pdGVtcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7IG92ZXJmbG93WTogJ3Njcm9sbCcsIG1heEhlaWdodDogNDIwLCBwYWRkaW5nVG9wOiAyMCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBCeURhdGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5Q29udGV4dDogXCJwb3BvdmVyXCJcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIFVzZXJQYW5lbDtcbn0pKF9yZWFjdDJbJ2RlZmF1bHQnXS5Db21wb25lbnQpO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBVc2VyUGFuZWwgPSAoMCwgX21hdGVyaWFsVWlTdHlsZXMubXVpVGhlbWVhYmxlKSgpKFVzZXJQYW5lbCk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IFVzZXJQYW5lbDtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuIiwiLypcbiAqIENvcHlyaWdodCAyMDA3LTIwMjAgQ2hhcmxlcyBkdSBKZXUgLSBBYnN0cml1bSBTQVMgPHRlYW0gKGF0KSBweWQuaW8+XG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBQeWRpby5cbiAqXG4gKiBQeWRpbyBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFB5ZGlvIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIFB5ZGlvLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICpcbiAqIFRoZSBsYXRlc3QgY29kZSBjYW4gYmUgZm91bmQgYXQgPGh0dHBzOi8vcHlkaW8uY29tPi5cbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmICgndmFsdWUnIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG52YXIgX2dldCA9IGZ1bmN0aW9uIGdldChfeDIsIF94MywgX3g0KSB7IHZhciBfYWdhaW4gPSB0cnVlOyBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHsgdmFyIG9iamVjdCA9IF94MiwgcHJvcGVydHkgPSBfeDMsIHJlY2VpdmVyID0gX3g0OyBfYWdhaW4gPSBmYWxzZTsgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlOyB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7IGlmIChkZXNjID09PSB1bmRlZmluZWQpIHsgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpOyBpZiAocGFyZW50ID09PSBudWxsKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gZWxzZSB7IF94MiA9IHBhcmVudDsgX3gzID0gcHJvcGVydHk7IF94NCA9IHJlY2VpdmVyOyBfYWdhaW4gPSB0cnVlOyBkZXNjID0gcGFyZW50ID0gdW5kZWZpbmVkOyBjb250aW51ZSBfZnVuY3Rpb247IH0gfSBlbHNlIGlmICgndmFsdWUnIGluIGRlc2MpIHsgcmV0dXJuIGRlc2MudmFsdWU7IH0gZWxzZSB7IHZhciBnZXR0ZXIgPSBkZXNjLmdldDsgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTsgfSB9IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09ICdmdW5jdGlvbicgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90ICcgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9weWRpbyA9IHJlcXVpcmUoJ3B5ZGlvJyk7XG5cbnZhciBfcHlkaW8yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcHlkaW8pO1xuXG52YXIgX21hdGVyaWFsVWkgPSByZXF1aXJlKCdtYXRlcmlhbC11aScpO1xuXG52YXIgX3B5ZGlvSHR0cEFwaSA9IHJlcXVpcmUoJ3B5ZGlvL2h0dHAvYXBpJyk7XG5cbnZhciBfcHlkaW9IdHRwQXBpMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3B5ZGlvSHR0cEFwaSk7XG5cbnZhciBfcHlkaW9IdHRwUmVzdEFwaSA9IHJlcXVpcmUoJ3B5ZGlvL2h0dHAvcmVzdC1hcGknKTtcblxudmFyIF9QeWRpbyRyZXF1aXJlTGliID0gX3B5ZGlvMlsnZGVmYXVsdCddLnJlcXVpcmVMaWIoJ2hvYycpO1xuXG52YXIgTW9kZXJuU2VsZWN0RmllbGQgPSBfUHlkaW8kcmVxdWlyZUxpYi5Nb2Rlcm5TZWxlY3RGaWVsZDtcblxudmFyIFdhdGNoU2VsZWN0b3IgPSAoZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgICBfaW5oZXJpdHMoV2F0Y2hTZWxlY3RvciwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgICBmdW5jdGlvbiBXYXRjaFNlbGVjdG9yKHByb3BzKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBXYXRjaFNlbGVjdG9yKTtcblxuICAgICAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihXYXRjaFNlbGVjdG9yLnByb3RvdHlwZSksICdjb25zdHJ1Y3RvcicsIHRoaXMpLmNhbGwodGhpcywgcHJvcHMpO1xuICAgICAgICB2YXIgbm9kZXMgPSB0aGlzLnByb3BzLm5vZGVzO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLnZhbHVlRnJvbU5vZGVzKG5vZGVzKTtcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoV2F0Y2hTZWxlY3RvciwgW3tcbiAgICAgICAga2V5OiAndmFsdWVGcm9tTm9kZXMnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWVGcm9tTm9kZXMoKSB7XG4gICAgICAgICAgICB2YXIgbm9kZXMgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyBbXSA6IGFyZ3VtZW50c1swXTtcblxuICAgICAgICAgICAgdmFyIG1peGVkID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBub2Rlcy5mb3JFYWNoKGZ1bmN0aW9uIChuKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5WYWwgPSBuLmdldE1ldGFkYXRhKCkuZ2V0KCdtZXRhX3dhdGNoZWQnKSB8fCAnJztcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiBuVmFsICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBtaXhlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhbHVlID0gblZhbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IHZhbHVlLCBtaXhlZDogbWl4ZWQgfTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnb25TZWxlY3RvckNoYW5nZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBvblNlbGVjdG9yQ2hhbmdlKHZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICAgICBpZiAodmFsdWUgPT09ICdtaXhlZCcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBfcHJvcHMgPSB0aGlzLnByb3BzO1xuICAgICAgICAgICAgdmFyIHB5ZGlvID0gX3Byb3BzLnB5ZGlvO1xuICAgICAgICAgICAgdmFyIG5vZGVzID0gX3Byb3BzLm5vZGVzO1xuXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2F2aW5nOiB0cnVlIH0pO1xuXG4gICAgICAgICAgICB2YXIgcHJvbXMgPSBub2Rlcy5tYXAoZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgbm9kZVV1aWQgPSBub2RlLmdldE1ldGFkYXRhKCkuZ2V0KCd1dWlkJyk7XG4gICAgICAgICAgICAgICAgdmFyIHVzZXJJZCA9IHB5ZGlvLnVzZXIuaWQ7XG4gICAgICAgICAgICAgICAgdmFyIHN1YnNjcmlwdGlvbiA9IG5ldyBfcHlkaW9IdHRwUmVzdEFwaS5BY3Rpdml0eVN1YnNjcmlwdGlvbigpO1xuICAgICAgICAgICAgICAgIHZhciB0eXBlID0gbmV3IF9weWRpb0h0dHBSZXN0QXBpLkFjdGl2aXR5T3duZXJUeXBlKCk7XG4gICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uLlVzZXJJZCA9IHVzZXJJZDtcbiAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb24uT2JqZWN0SWQgPSBub2RlVXVpZDtcbiAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb24uT2JqZWN0VHlwZSA9IHR5cGUuTk9ERTtcbiAgICAgICAgICAgICAgICB2YXIgZXZlbnRzID0gW107XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSAnTUVUQV9XQVRDSF9DSEFOR0UnIHx8IHZhbHVlID09PSAnTUVUQV9XQVRDSF9CT1RIJykge1xuICAgICAgICAgICAgICAgICAgICBldmVudHMucHVzaCgnY2hhbmdlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gJ01FVEFfV0FUQ0hfUkVBRCcgfHwgdmFsdWUgPT09ICdNRVRBX1dBVENIX0JPVEgnKSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50cy5wdXNoKCdyZWFkJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbi5FdmVudHMgPSBldmVudHM7XG4gICAgICAgICAgICAgICAgdmFyIGFwaSA9IG5ldyBfcHlkaW9IdHRwUmVzdEFwaS5BY3Rpdml0eVNlcnZpY2VBcGkoX3B5ZGlvSHR0cEFwaTJbJ2RlZmF1bHQnXS5nZXRSZXN0Q2xpZW50KCkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBhcGkuc3Vic2NyaWJlKHN1YnNjcmlwdGlvbikudGhlbihmdW5jdGlvbiAob3V0U3ViKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvdmVybGF5ID0gbm9kZS5nZXRNZXRhZGF0YSgpLmdldCgnb3ZlcmxheV9jbGFzcycpIHx8ICcnO1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmdldE1ldGFkYXRhKClbJ2RlbGV0ZSddKCdtZXRhX3dhdGNoZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0TWV0YWRhdGEoKS5zZXQoJ292ZXJsYXlfY2xhc3MnLCBvdmVybGF5LnJlcGxhY2UoJ21kaSBtZGktYmVsbCcsICcnKSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmdldE1ldGFkYXRhKCkuc2V0KCdtZXRhX3dhdGNoZWQnLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3ZlcmxheXMgPSBvdmVybGF5LnJlcGxhY2UoJ21kaSBtZGktYmVsbCcsICcnKS5zcGxpdCgnLCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3ZlcmxheXMucHVzaCgnbWRpIG1kaS1iZWxsJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmdldE1ldGFkYXRhKCkuc2V0KCdvdmVybGF5X2NsYXNzJywgb3ZlcmxheXMuam9pbignLCcpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBub2RlLm5vdGlmeSgnbm9kZV9yZXBsYWNlZCcpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBQcm9taXNlLmFsbChwcm9tcykudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuc2V0U3RhdGUoeyB2YWx1ZTogdmFsdWUsIG1peGVkOiBmYWxzZSB9KTtcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnNldFN0YXRlKHsgc2F2aW5nOiBmYWxzZSB9KTtcbiAgICAgICAgICAgICAgICB9LCAyNTApO1xuICAgICAgICAgICAgfSlbJ2NhdGNoJ10oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLnNldFN0YXRlKHsgc2F2aW5nOiBmYWxzZSB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZW5kZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgICAgIHZhciBfc3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gX3N0YXRlLnZhbHVlO1xuICAgICAgICAgICAgdmFyIG1peGVkID0gX3N0YXRlLm1peGVkO1xuICAgICAgICAgICAgdmFyIHNhdmluZyA9IF9zdGF0ZS5zYXZpbmc7XG5cbiAgICAgICAgICAgIHZhciBtbSA9IF9weWRpbzJbJ2RlZmF1bHQnXS5nZXRJbnN0YW5jZSgpLk1lc3NhZ2VIYXNoO1xuXG4gICAgICAgICAgICBpZiAoc2F2aW5nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9yZWFjdDJbJ2RlZmF1bHQnXS5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICBNb2Rlcm5TZWxlY3RGaWVsZCxcbiAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogXCJzYXZpbmdcIiwgb25DaGFuZ2U6IGZ1bmN0aW9uIChlLCBpLCB2KSB7fSwgZGlzYWJsZWQ6IHRydWUgfSxcbiAgICAgICAgICAgICAgICAgICAgX3JlYWN0MlsnZGVmYXVsdCddLmNyZWF0ZUVsZW1lbnQoX21hdGVyaWFsVWkuTWVudUl0ZW0sIHsgdmFsdWU6IFwic2F2aW5nXCIsIHByaW1hcnlUZXh0OiBtbVsnbWV0YS53YXRjaC5zZWxlY3Rvci5zYXZpbmcnXSArIFwiLi4uXCIgfSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gX3JlYWN0MlsnZGVmYXVsdCddLmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgTW9kZXJuU2VsZWN0RmllbGQsXG4gICAgICAgICAgICAgICAgeyB2YWx1ZTogbWl4ZWQgPyAnbWl4ZWQnIDogdmFsdWUsIG9uQ2hhbmdlOiBmdW5jdGlvbiAoZSwgaSwgdikge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMyLm9uU2VsZWN0b3JDaGFuZ2Uodik7XG4gICAgICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICBtaXhlZCAmJiBfcmVhY3QyWydkZWZhdWx0J10uY3JlYXRlRWxlbWVudChfbWF0ZXJpYWxVaS5NZW51SXRlbSwgeyB2YWx1ZTogXCJtaXhlZFwiLCBwcmltYXJ5VGV4dDogbW1bJ21ldGEud2F0Y2guc2VsZWN0b3IubWl4ZWQnXSArIFwiLi4uXCIgfSksXG4gICAgICAgICAgICAgICAgX3JlYWN0MlsnZGVmYXVsdCddLmNyZWF0ZUVsZW1lbnQoX21hdGVyaWFsVWkuTWVudUl0ZW0sIHsgdmFsdWU6IFwiXCIsIHByaW1hcnlUZXh0OiBtbVsnbWV0YS53YXRjaC5zZWxlY3Rvci5pZ25vcmUnXSB9KSxcbiAgICAgICAgICAgICAgICBfcmVhY3QyWydkZWZhdWx0J10uY3JlYXRlRWxlbWVudChfbWF0ZXJpYWxVaS5NZW51SXRlbSwgeyB2YWx1ZTogXCJNRVRBX1dBVENIX1JFQURcIiwgcHJpbWFyeVRleHQ6IG1tWydtZXRhLndhdGNoLnNlbGVjdG9yLnJlYWQnXSB9KSxcbiAgICAgICAgICAgICAgICBfcmVhY3QyWydkZWZhdWx0J10uY3JlYXRlRWxlbWVudChfbWF0ZXJpYWxVaS5NZW51SXRlbSwgeyB2YWx1ZTogXCJNRVRBX1dBVENIX0NIQU5HRVwiLCBwcmltYXJ5VGV4dDogbW1bJ21ldGEud2F0Y2guc2VsZWN0b3IuY2hhbmdlJ10gfSksXG4gICAgICAgICAgICAgICAgX3JlYWN0MlsnZGVmYXVsdCddLmNyZWF0ZUVsZW1lbnQoX21hdGVyaWFsVWkuTWVudUl0ZW0sIHsgdmFsdWU6IFwiTUVUQV9XQVRDSF9CT1RIXCIsIHByaW1hcnlUZXh0OiBtbVsnbWV0YS53YXRjaC5zZWxlY3Rvci5ib3RoJ10gfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gV2F0Y2hTZWxlY3Rvcjtcbn0pKF9yZWFjdDJbJ2RlZmF1bHQnXS5Db21wb25lbnQpO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBXYXRjaFNlbGVjdG9yO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG4iLCIvKlxuICogQ29weXJpZ2h0IDIwMDctMjAxNyBDaGFybGVzIGR1IEpldSAtIEFic3RyaXVtIFNBUyA8dGVhbSAoYXQpIHB5ZC5pbz5cbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFB5ZGlvLlxuICpcbiAqIFB5ZGlvIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogUHlkaW8gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggUHlkaW8uICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKlxuICogVGhlIGxhdGVzdCBjb2RlIGNhbiBiZSBmb3VuZCBhdCA8aHR0cHM6Ly9weWRpby5jb20+LlxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmUob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmpbXCJkZWZhdWx0XCJdIDogb2JqOyB9XG5cbnZhciBfSW5mb1BhbmVsID0gcmVxdWlyZShcIi4vSW5mb1BhbmVsXCIpO1xuXG5leHBvcnRzLkluZm9QYW5lbCA9IF9pbnRlcm9wUmVxdWlyZShfSW5mb1BhbmVsKTtcblxudmFyIF9Vc2VyUGFuZWwgPSByZXF1aXJlKFwiLi9Vc2VyUGFuZWxcIik7XG5cbmV4cG9ydHMuVXNlclBhbmVsID0gX2ludGVyb3BSZXF1aXJlKF9Vc2VyUGFuZWwpO1xuXG52YXIgX0NsaWVudCA9IHJlcXVpcmUoXCIuL0NsaWVudFwiKTtcblxuZXhwb3J0cy5BU0NsaWVudCA9IF9pbnRlcm9wUmVxdWlyZShfQ2xpZW50KTtcblxudmFyIF9BY3Rpdml0eSA9IHJlcXVpcmUoXCIuL0FjdGl2aXR5XCIpO1xuXG5leHBvcnRzLkFjdGl2aXR5ID0gX2ludGVyb3BSZXF1aXJlKF9BY3Rpdml0eSk7XG5cbnZhciBfQWN0aXZpdHlMaXN0ID0gcmVxdWlyZShcIi4vQWN0aXZpdHlMaXN0XCIpO1xuXG5leHBvcnRzLkFjdGl2aXR5TGlzdCA9IF9pbnRlcm9wUmVxdWlyZShfQWN0aXZpdHlMaXN0KTtcblxudmFyIF9MaXN0ZW5lciA9IHJlcXVpcmUoJy4vTGlzdGVuZXInKTtcblxuZXhwb3J0cy5MaXN0ZW5lciA9IF9pbnRlcm9wUmVxdWlyZShfTGlzdGVuZXIpO1xuXG52YXIgX0NhbGxiYWNrcyA9IHJlcXVpcmUoJy4vQ2FsbGJhY2tzJyk7XG5cbmV4cG9ydHMuQ2FsbGJhY2tzID0gX2ludGVyb3BSZXF1aXJlKF9DYWxsYmFja3MpO1xuXG52YXIgX1dhdGNoU2VsZWN0b3IgPSByZXF1aXJlKCcuL1dhdGNoU2VsZWN0b3InKTtcblxuZXhwb3J0cy5XYXRjaFNlbGVjdG9yID0gX2ludGVyb3BSZXF1aXJlKF9XYXRjaFNlbGVjdG9yKTtcbiJdfQ==
