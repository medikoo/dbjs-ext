'use strict';

var memoize       = require('memoizee/lib/regular')
  , defineInteger = require('../integer');

module.exports = memoize(function (db) {
	defineInteger(db);
	return db.Integer.extend('UInteger', { min: { value: 0 } });
});
