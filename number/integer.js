'use strict';

var memoize   = require('memoizee/lib/regular')
  , validDbjs = require('dbjs/valid-dbjs');

module.exports = memoize(function (db) {
	return validDbjs(db).Number.extend('Integer', { step: { value: 1 } });
});
