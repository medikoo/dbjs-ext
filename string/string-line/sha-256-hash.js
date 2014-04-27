'use strict';

var memoize          = require('memoizee/plain')
  , defineStringLine = require('../string-line');

module.exports = memoize(function (db) {
	return defineStringLine(db).extend('Sha256Hash',
		{ pattern: { value: /^[0-9a-f]{64}$/ } });
}, { normalizer: require('memoizee/normalizers/get-1')() });
