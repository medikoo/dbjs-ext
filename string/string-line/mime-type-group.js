'use strict';

var memoize          = require('memoizee/plain')
  , defineStringLine = require('../string-line');

module.exports = memoize(function (db) {
	return defineStringLine(db).extend('MimeTypeGroup', {
		pattern: { value: /^[a-z]+\/(?:\*|[a-z][a-z0-9\-.+]*)$/ }
	});
}, { normalizer: require('memoizee/normalizers/get-1')() });
