'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _pydioUtilXml = require('pydio/util/xml');

var _pydioUtilXml2 = _interopRequireDefault(_pydioUtilXml);

var _materialUi = require('material-ui');

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

var _DatePanel = require('./DatePanel');

var _DatePanel2 = _interopRequireDefault(_DatePanel);

var _FileFormatPanel = require('./FileFormatPanel');

var _FileFormatPanel2 = _interopRequireDefault(_FileFormatPanel);

var _FileSizePanel = require('./FileSizePanel');

var _FileSizePanel2 = _interopRequireDefault(_FileSizePanel);

var _lodash = require('lodash');

var _Pydio$requireLib = _pydio2['default'].requireLib('boot');

var PydioContextConsumer = _Pydio$requireLib.PydioContextConsumer;

var _Pydio$requireLib2 = _pydio2['default'].requireLib('hoc');

var ModernTextField = _Pydio$requireLib2.ModernTextField;

var AdvancedSearch = (function (_Component) {
    _inherits(AdvancedSearch, _Component);

    _createClass(AdvancedSearch, null, [{
        key: 'styles',
        get: function get() {
            return {
                text: {
                    width: "calc(100% - 32px)",
                    margin: "0 16px"
                }
            };
        }
    }]);

    function AdvancedSearch(props) {
        _classCallCheck(this, AdvancedSearch);

        _Component.call(this, props);

        var pydio = props.pydio;

        var registry = pydio.getXmlRegistry();
        var options = {};
        try {
            options = JSON.parse(_pydioUtilXml2['default'].XPathGetSingleNodeText(registry, 'client_configs/template_part[@ajxpClass="SearchEngine" and @theme="material"]/@ajxpOptions'));
        } catch (e) {}

        this.state = {
            options: options,
            basenameOrContent: props.values['basenameOrContent'] || ''
        };
    }

    AdvancedSearch.prototype.textFieldChange = function textFieldChange(fieldName, value) {
        var _setState, _props$onChange;

        this.setState((_setState = {}, _setState[fieldName] = value, _setState));
        this.props.onChange((_props$onChange = {}, _props$onChange[fieldName] = value, _props$onChange));
    };

    AdvancedSearch.prototype.onChange = function onChange(values) {
        this.props.onChange(values);
    };

    AdvancedSearch.prototype.renderField = function renderField(key, val) {
        var _this = this;

        var text = AdvancedSearch.styles.text;
        var options = this.state.options;

        var fieldname = key === 'basename' || key === 'Content' || key === 'basenameOrContent' ? key : 'ajxp_meta_' + key;

        if (typeof val === 'object') {
            var value = this.props.values[fieldname];
            var label = val.label;
            var renderComponent = val.renderComponent;

            // The field might have been assigned a method already
            if (renderComponent) {
                var component = renderComponent(_extends({}, this.props, {
                    label: label,
                    value: value,
                    fieldname: key,
                    onChange: function onChange(object) {
                        _this.onChange(object);
                    }
                }));
                return _react2['default'].createElement(
                    'div',
                    { style: { margin: '0 16px' } },
                    component
                );
            }
        }

        return _react2['default'].createElement(ModernTextField, {
            key: fieldname,
            value: this.state[fieldname] || this.props.values[fieldname] || '',
            style: text,
            hintText: val,
            onChange: function (e, v) {
                _this.textFieldChange(fieldname, v);
            }
        });
    };

    AdvancedSearch.prototype.render = function render() {
        var _this2 = this;

        var text = AdvancedSearch.styles.text;
        var _props = this.props;
        var pydio = _props.pydio;
        var getMessage = _props.getMessage;
        var values = _props.values;
        var rootStyle = _props.rootStyle;
        var options = this.state.options;

        var headerStyle = { fontSize: 13, color: '#616161', fontWeight: 500, marginBottom: -10, marginTop: 10 };

        return _react2['default'].createElement(
            'div',
            { className: 'search-advanced', style: _extends({}, rootStyle) },
            _react2['default'].createElement(
                _materialUi.Subheader,
                { style: _extends({}, headerStyle, { marginTop: 0 }) },
                getMessage(341)
            ),
            this.renderField('basenameOrContent', getMessage(1)),
            _react2['default'].createElement(_FileFormatPanel2['default'], { values: values, pydio: pydio, inputStyle: text, onChange: function (values) {
                    return _this2.onChange(values);
                } }),
            _react2['default'].createElement(
                _materialUi.Subheader,
                { style: _extends({}, headerStyle, { marginTop: 0 }) },
                getMessage(489)
            ),
            _react2['default'].createElement(
                AdvancedMetaFields,
                _extends({}, this.props, { options: options }),
                function (fields) {
                    return _react2['default'].createElement(
                        'div',
                        null,
                        Object.keys(fields).map(function (key) {
                            return _this2.renderField(key, fields[key]);
                        })
                    );
                }
            ),
            _react2['default'].createElement(
                _materialUi.Subheader,
                { style: _extends({}, headerStyle) },
                getMessage(498)
            ),
            _react2['default'].createElement(_DatePanel2['default'], { values: values, pydio: pydio, inputStyle: text, onChange: function (values) {
                    return _this2.onChange(values);
                } }),
            _react2['default'].createElement(_FileSizePanel2['default'], { values: values, pydio: pydio, inputStyle: text, onChange: function (values) {
                    return _this2.onChange(values);
                } })
        );
    };

    return AdvancedSearch;
})(_react.Component);

AdvancedSearch = PydioContextConsumer(AdvancedSearch);

var AdvancedMetaFields = (function (_Component2) {
    _inherits(AdvancedMetaFields, _Component2);

    function AdvancedMetaFields(props) {
        _classCallCheck(this, AdvancedMetaFields);

        _Component2.call(this, props);
        this.build = _lodash.debounce(this.build, 500);
        this.state = {
            fields: {}
        };
    }

    AdvancedMetaFields.prototype.componentWillMount = function componentWillMount() {
        this.build();
    };

    AdvancedMetaFields.prototype.build = function build() {
        var _this3 = this;

        var options = this.props.options;

        var _extends2 = _extends({}, options);

        var metaColumns = _extends2.metaColumns;
        var reactColumnsRenderers = _extends2.reactColumnsRenderers;

        if (!metaColumns) {
            metaColumns = {};
        }
        if (!reactColumnsRenderers) {
            reactColumnsRenderers = {};
        }

        //const generic = {basename: this.props.getMessage(1)};
        var generic = {};

        // Looping through the options to check if we have a special renderer for any
        var specialRendererKeys = Object.keys(_extends({}, reactColumnsRenderers));
        var standardRendererKeys = Object.keys(_extends({}, metaColumns)).filter(function (key) {
            return specialRendererKeys.indexOf(key) === -1;
        });

        var textFields = {};
        standardRendererKeys.forEach(function (k) {
            textFields[k] = metaColumns[k];
        });

        var renderers = Object.keys(_extends({}, reactColumnsRenderers)).map(function (key) {
            var _ref;

            var renderer = reactColumnsRenderers[key];
            var namespace = renderer.split('.', 1).shift();

            // If the renderer is not loaded in memory, we trigger the load and send to rebuild
            if (!window[namespace]) {
                ResourcesManager.detectModuleToLoadAndApply(renderer, function () {
                    return _this3.build();
                }, true);
                return;
            }

            return _ref = {}, _ref[key] = {
                label: metaColumns[key],
                renderComponent: FuncUtils.getFunctionByName(renderer, global)
            }, _ref;
        }).reduce(function (obj, current) {
            return obj = _extends({}, obj, current);
        }, []);

        var fields = _extends({}, generic, textFields, renderers);

        this.setState({
            fields: fields
        });
    };

    AdvancedMetaFields.prototype.render = function render() {
        return this.props.children(this.state.fields);
    };

    return AdvancedMetaFields;
})(_react.Component);

AdvancedMetaFields.propTypes = {
    children: _propTypes2['default'].func.isRequired
};

exports['default'] = AdvancedSearch;
module.exports = exports['default'];
