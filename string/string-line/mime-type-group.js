'use strict';

var memoize          = require('memoizee/lib/regular')
  , defineStringLine = require('../string-line');

module.exports = memoize(function (db) {
	return defineStringLine(db).extend('MimeTypeGroup', {
		pattern: { value: /^[a-z]+\/(?:\*|[a-z][a-z0-9\-.+]*)$/ }
	});
});
