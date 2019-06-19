"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSelector = useSelector;
exports.useActions = useActions;

var _context = _interopRequireDefault(require("./context"));

var _react = require("react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useSelector(selector) {
  var _useContext = (0, _react.useContext)(_context.default),
      storeState = _useContext.storeState;

  return selector(storeState);
}

function useActions(actionsSelector) {
  var _useContext2 = (0, _react.useContext)(_context.default),
      actions = _useContext2.store.actions;

  if (actionsSelector) {
    return actionsSelector(actions);
  }

  return actions;
}