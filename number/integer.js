'use strict';

var memoize   = require('memoizee/plain')
  , validDbjs = require('dbjs/valid-dbjs');

module.exports = memoize(function (db) {
	return validDbjs(db).Number.extend('Integer', { step: { value: 1 } });
}, { normalizer: require('memoizee/normalizers/get-1')() });
