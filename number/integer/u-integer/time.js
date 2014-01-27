'use strict';

var memoize       = require('memoizee/lib/regular')
  , defineInteger = require('../u-integer');

module.exports = memoize(function (db) {
	defineInteger(db);
	return db.UInteger.extend('Time', { max: { value: 86399999 } });
});
