'use strict';

var memoize    = require('memoizee/plain')
  , defineFile = require('../file');

module.exports = memoize(function (db) {
	return defineFile(db).extend('MsWordFile', {}, {
		accept: { value: ['application/msword', 'application/vnd.openxmlformats' +
			'-officedocument.wordprocessingml.document'] }
	});
}, { normalizer: require('memoizee/normalizers/get-1')() });
