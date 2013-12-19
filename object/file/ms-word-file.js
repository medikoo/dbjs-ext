'use strict';

var memoize    = require('memoizee/lib/regular')
  , defineFile = require('../file');

module.exports = memoize(function (db) {
	return defineFile(db).extend('MsWordFile', {}, {
		accept: { value: ['application/msword', 'application/vnd.openxmlformats' +
			'-officedocument.wordprocessingml.document'] }
	});
});
