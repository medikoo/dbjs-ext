'use strict';

var memoize   = require('memoizee/lib/regular')
  , validDbjs = require('dbjs/valid-dbjs');

module.exports = memoize(function (db) {
	return validDbjs(db).Number.extend('SquareMeters', { min: { value: 0 } }, {
		toString: { value: function (/*options*/) {
			return Number.prototype.toString.call(this) + 'm²';
		} }
	});
});
