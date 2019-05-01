'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSelector = useSelector;
exports.useActions = useActions;

var _context = require('./context');

var _context2 = _interopRequireDefault(_context);

var _react = require('react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useSelector(selector) {
  var _useContext = (0, _react.useContext)(_context2.default),
      storeState = _useContext.storeState;

  return selector(storeState);
}

function useActions(actionsSelector) {
  var _useContext2 = (0, _react.useContext)(_context2.default),
      actions = _useContext2.store.actions;

  if (actionsSelector) {
    return actionsSelector(actions);
  }

  return actions;
}