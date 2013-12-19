'use strict';

var memoize             = require('memoizee/lib/regular')
  , defineMimeTypeGroup = require('../mime-type-group');

module.exports = memoize(function (db) {
	return defineMimeTypeGroup(db).extend('MimeType', {
		pattern: { value: /^[a-z]+\/[a-z][a-z0-9\-.+]*$/ }
	});
});
