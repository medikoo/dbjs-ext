'use strict';

var memoize    = require('memoizee/plain')
  , defineDate = require('../date-time/date')
  , defineTime = require('../number/integer/u-integer/time');

module.exports = memoize(function (db) {
	defineDate(db);
	defineTime(db);

	return db.Object.extend('OneDayTimeRange', {
		date: { type: db.Date, required: true },
		from: { type: db.Time, required: true },
		to: { type: db.Time, required: true }
	});
}, { normalizer: require('memoizee/normalizers/get-1')() });
