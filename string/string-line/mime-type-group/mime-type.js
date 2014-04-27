'use strict';

var memoize             = require('memoizee/plain')
  , defineMimeTypeGroup = require('../mime-type-group');

module.exports = memoize(function (db) {
	return defineMimeTypeGroup(db).extend('MimeType', {
		pattern: { value: /^[a-z]+\/[a-z][a-z0-9\-.+]*$/ }
	});
}, { normalizer: require('memoizee/normalizers/get-1')() });
