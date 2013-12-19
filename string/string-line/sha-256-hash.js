'use strict';

var memoize          = require('memoizee/lib/regular')
  , defineStringLine = require('../string-line');

module.exports = memoize(function (db) {
	return defineStringLine(db).extend('Sha256Hash',
		{ pattern: { value: /^[0-9a-f]{64}$/ } });
});
