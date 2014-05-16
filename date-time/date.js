'use strict';

var memoize   = require('memoizee/plain')
  , validDbjs = require('dbjs/valid-dbjs');

module.exports = memoize(function (db) {
	return validDbjs(db).DateTime.extend('Date', {
		step: { value: 1000 * 60 * 60 * 24 },
		_validateCreate_: { value: function (value/*[, mth[, d[, h]]]*/) {
			var l = arguments.length, year, month, day;
			if (!l) {
				value = new Date();
				year = value.getFullYear();
				month = value.getMonth();
				day = value.getDate();
				value.setUTCFullYear(year);
				value.setUTCMonth(month);
				value.setUTCDate(day);
			} else if (l === 1) {
				value = new Date(value);
			} else {
				value = new Date(Date.UTC(value, arguments[1], (l > 2) ? arguments[2] : 1,
					(l > 3) ? arguments[3] : 0));
			}
			return [this.validate(value)];
		} }
	}, {
		toString: { value: function (descriptor) {
			return (new Date(this.getUTCFullYear(), this.getUTCMonth(),
				this.getUTCDate())).toLocaleDateString(this.database.locale);
		} }
	});
}, { normalizer: require('memoizee/normalizers/get-1')() });
