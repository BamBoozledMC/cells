'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _pydio = require('pydio');

var _pydio2 = _interopRequireDefault(_pydio);

var RoleMessagesConsumerMixin = {
    contextTypes: {
        messages: _propTypes2['default'].object,
        getMessage: _propTypes2['default'].func,
        getPydioRoleMessage: _propTypes2['default'].func,
        getRootMessage: _propTypes2['default'].func
    }
};

var RoleMessagesProviderMixin = {

    childContextTypes: {
        messages: _propTypes2['default'].object,
        getMessage: _propTypes2['default'].func,
        getPydioRoleMessage: _propTypes2['default'].func,
        getRootMessage: _propTypes2['default'].func
    },

    getChildContext: function getChildContext() {
        var messages = this.context.pydio.MessageHash;
        return {
            messages: messages,
            getMessage: function getMessage(messageId) {
                var namespace = arguments.length <= 1 || arguments[1] === undefined ? 'pydio_role' : arguments[1];

                return messages[namespace + (namespace ? "." : "") + messageId] || messageId;
            },
            getPydioRoleMessage: function getPydioRoleMessage(messageId) {
                return messages['role_editor.' + messageId] || messageId;
            },
            getRootMessage: function getRootMessage(messageId) {
                return messages[messageId] || messageId;
            }
        };
    }

};

function withRoleMessages(PydioComponent) {

    return (function (_Component) {
        _inherits(WithRoleMessages, _Component);

        function WithRoleMessages() {
            _classCallCheck(this, WithRoleMessages);

            _get(Object.getPrototypeOf(WithRoleMessages.prototype), 'constructor', this).apply(this, arguments);
        }

        _createClass(WithRoleMessages, [{
            key: 'render',
            value: function render() {
                var pydio = this.props.pydio;

                if (!pydio) {
                    pydio = _pydio2['default'].getInstance();
                }
                var messages = pydio.MessageHash;
                var getMessage = function getMessage(messageId) {
                    var namespace = arguments.length <= 1 || arguments[1] === undefined ? 'pydio_role' : arguments[1];

                    return messages[namespace + (namespace ? "." : "") + messageId] || messageId;
                };
                var getPydioRoleMessage = function getPydioRoleMessage(messageId) {
                    return messages['role_editor.' + messageId] || messageId;
                };
                var getAdminMessage = function getAdminMessage(messageId) {
                    return messages['ajxp_admin.' + messageId] || messageId;
                };
                var getRootMessage = function getRootMessage(messageId) {
                    return messages[messageId] || messageId;
                };

                return _react2['default'].createElement(PydioComponent, _extends({}, this.props, {
                    getMessage: getMessage,
                    getPydioRoleMessage: getPydioRoleMessage,
                    getRootMessage: getRootMessage,
                    getAdminMessage: getAdminMessage
                }));
            }
        }]);

        return WithRoleMessages;
    })(_react.Component);
}

exports.RoleMessagesConsumerMixin = RoleMessagesConsumerMixin;
exports.RoleMessagesProviderMixin = RoleMessagesProviderMixin;
exports.withRoleMessages = withRoleMessages;
