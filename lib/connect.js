"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = connect;

var React = _interopRequireWildcard(require("react"));

var _Context = require("./Context");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

function wrapComponent(Component, options) {
  var props = options.props,
      mapStateToProps = options.mapStateToProps,
      mapActionsToProps = options.mapActionsToProps;
  return function (_ref) {
    var storeState = _ref.storeState,
        store = _ref.store;
    props = (_readOnlyError("props"), _objectSpread({}, props, mapStateToProps(storeState), mapActionsToProps(store.getActions())));
    return React.createElement(Component, props);
  };
}

function connect(mapStateToProps, mapActionsToProps) {
  return function (Component) {
    return function (props) {
      var options = {
        props: props,
        mapStateToProps: mapStateToProps,
        mapActionsToProps: mapActionsToProps
      };
      var ContextToUse = props.context || _Context.Context;
      var WrappedComponent = wrapComponent(Component, options);
      return React.createElement(ContextToUse.Consumer, null, React.createElement(WrappedComponent, null));
    };
  };
}