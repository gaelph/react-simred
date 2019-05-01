'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _provider = require('./provider');

Object.defineProperty(exports, 'Provider', {
  enumerable: true,
  get: function get() {
    return _provider.Provider;
  }
});

var _connect = require('./connect');

Object.defineProperty(exports, 'connect', {
  enumerable: true,
  get: function get() {
    return _connect.connect;
  }
});

var _hooks = require('./hooks');

Object.defineProperty(exports, 'useSelector', {
  enumerable: true,
  get: function get() {
    return _hooks.useSelector;
  }
});
Object.defineProperty(exports, 'useActions', {
  enumerable: true,
  get: function get() {
    return _hooks.useActions;
  }
});