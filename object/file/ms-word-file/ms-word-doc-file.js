'use strict';

var memoize          = require('memoizee/plain')
  , defineMsWordFile = require('../ms-word-file');

module.exports = memoize(function (db) {
	var Type = defineMsWordFile(db).extend('MsWordDocFile', {}, {
		type: { value: 'application/msword' },
		accept: { value: ['application/msword'] }
	});
	db.File.typeMap.set(Type.type, Type);
	return Type;
}, { normalizer: require('memoizee/normalizers/get-1')() });
