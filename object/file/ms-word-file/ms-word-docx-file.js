'use strict';

var memoize          = require('memoizee/lib/regular')
  , defineMsWordFile = require('../ms-word-file');

module.exports = memoize(function (db) {
	var Type = defineMsWordFile(db).extend('MsWordDocFile', {}, {
		type: { value: 'application/vnd.openxmlformats-officedocument.' +
			'wordprocessingml.document' },
		accept: { value: ['application/vnd.openxmlformats-officedocument.' +
			'wordprocessingml.document'] }
	});
	db.File.typeMap.set(Type.type, Type);
	return Type;
});
