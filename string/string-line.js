'use strict';

var memoize   = require('memoizee/lib/regular')
  , validDbjs = require('dbjs/valid-dbjs');

module.exports = memoize(function (db) {
	return validDbjs(db).String.extend('StringLine',
		{ pattern: { value: /^[\u0009 -\u2027\u2030-\uffff]*$/ } });
});
