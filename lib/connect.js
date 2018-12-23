'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.connect = connect;

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _context = require('./context');

var _context2 = _interopRequireDefault(_context);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function wrapComponent(Component, options) {
  var props = options.props,
      mapStateToProps = options.mapStateToProps,
      mapActionsToProps = options.mapActionsToProps;


  return function (ctx) {
    var wrappedProps = _extends({}, props);

    if (ctx) {
      var storeState = ctx.storeState,
          store = ctx.store;


      wrappedProps = _extends({}, mapStateToProps(storeState, wrappedProps), mapActionsToProps(store.getActions(), wrappedProps), wrappedProps);
    }

    return React.createElement(Component, wrappedProps);
  };
}

function connect(mapStateToProps, mapActionsToProps, context) {
  var ContextToUse = context || _context2.default;

  return function (Component) {

    return function (_React$Component) {
      _inherits(_class, _React$Component);

      function _class(props) {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));
      }

      _createClass(_class, [{
        key: 'render',
        value: function render() {
          var options = { props: this.props, mapStateToProps: mapStateToProps, mapActionsToProps: mapActionsToProps };
          var WrappedComponent = wrapComponent(Component, options);

          return React.createElement(
            ContextToUse.Consumer,
            null,
            WrappedComponent
          );
        }
      }]);

      return _class;
    }(React.Component);
  };
}