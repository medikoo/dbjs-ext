'use strict';

var memoize        = require('memoizee/plain')
  , defineUInteger = require('../../number/integer/u-integer')
  , defineFile     = require('../file');

module.exports = memoize(function (db) {
	defineUInteger(db);
	return defineFile(db).extend('ImageFile', {
		width: { type: db.UInteger },
		height: { type: db.UInteger }
	}, {
		accept: { value: ['image/*'] }
	});
}, { normalizer: require('memoizee/normalizers/get-1')() });
