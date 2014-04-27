'use strict';

var memoize       = require('memoizee/plain')
  , defineInteger = require('../integer');

module.exports = memoize(function (db) {
	defineInteger(db);
	return db.Integer.extend('UInteger', { min: { value: 0 } });
}, { normalizer: require('memoizee/normalizers/get-1')() });
