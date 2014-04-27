'use strict';

var memoize         = require('memoizee/plain')
  , defineImageFile = require('../image-file');

module.exports = memoize(function (db) {
	var Type = defineImageFile(db).extend('JpegFile', {}, {
		type: { value: 'image/jpeg' },
		accept: { value: ['image/jpeg'] }
	});
	db.File.typeMap.set(Type.type, Type);
	return Type;
}, { normalizer: require('memoizee/normalizers/get-1')() });
