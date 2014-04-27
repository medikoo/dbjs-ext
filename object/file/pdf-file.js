'use strict';

var memoize    = require('memoizee/plain')
  , defineFile = require('../file');

module.exports = memoize(function (db) {
	var Type = defineFile(db).extend('PdfFile', {}, {
		type: { value: 'application/pdf' },
		accept: { value: ['application/pdf'] }
	});
	db.File.typeMap.set(Type.type, Type);
	return Type;
}, { normalizer: require('memoizee/normalizers/get-1')() });
