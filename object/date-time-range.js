'use strict';

var memoize = require('memoizee/lib/regular');

module.exports = memoize(function (db) {
	return db.Object.extend('DateTimeRange', {
		from: { type: db.DateTime, required: true },
		to: { type: db.DateTime, required: true }
	});
});
