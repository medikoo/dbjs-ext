'use strict';

var memoize = require('memoizee/plain');

module.exports = memoize(function (db) {
	return db.Object.extend('DateTimeRange', {
		from: { type: db.DateTime, required: true },
		to: { type: db.DateTime, required: true }
	});
}, { normalizer: require('memoizee/normalizers/get-1')() });
