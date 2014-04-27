'use strict';

var memoize         = require('memoizee/plain')
  , defineImageFile = require('../image-file');

module.exports = memoize(function (db) {
	var Type = defineImageFile(db).extend('PngFile', {}, {
		type: { value: 'image/png' },
		accept: { value: ['image/png'] }
	});
	db.File.typeMap.set(Type.type, Type);
	return Type;
}, { normalizer: require('memoizee/normalizers/get-1')() });
