'use strict';

var memoize       = require('memoizee/plain')
  , defineInteger = require('../u-integer');

module.exports = memoize(function (db) {
	defineInteger(db);
	return db.UInteger.extend('Time', {
		max: { value: 86399999 },
		_validateCreate_: { value: function (value/*[, mn[, s[, ms]]]*/) {
			var l = arguments.length;
			if (!l) {
				value = 0;
			} else if (l === 1) {
				value = Number(value);
			} else {
				value = Number(value) * 1000 * 60 * 60;
				value += Number(arguments[1]) * 1000 * 60;
				if (l > 2) value += Number(arguments[2]) * 1000;
				if (l > 3) value += Number(arguments[3]);
			}
			return [this.validate(value)];
		} }
	});
}, { normalizer: require('memoizee/normalizers/get-1')() });
