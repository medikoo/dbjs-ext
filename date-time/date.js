'use strict';

var isDate    = require('es5-ext/date/is-date')
  , memoize   = require('memoizee/plain')
  , validDbjs = require('dbjs/valid-dbjs');

module.exports = memoize(function (db) {
	var DateTime = validDbjs(db).DateTime
	  , validate = DateTime.validate, normalize = DateTime.normalize
	  , DateType;

	DateType = db.DateTime.extend('Date', {
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
		} },
		normalize: { value: function (value/*, descriptor*/) {
			var year, month, date;
			if (!isDate(value)) return normalize.apply(this, arguments);
			if (value instanceof DateType) return normalize.apply(this, arguments);
			year = value.getFullYear();
			month = value.getMonth();
			date = value.getDate();
			value = new Date(value);
			value.setUTCFullYear(year);
			value.setUTCMonth(month);
			value.setUTCDate(date);
			return normalize.call(this, value, arguments[1]);
		} },
		validate: { value: function (value/*, descriptor*/) {
			var year, month, date;
			if (!isDate(value)) return validate.apply(this, arguments);
			if (value instanceof DateType) return validate.apply(this, arguments);
			year = value.getFullYear();
			month = value.getMonth();
			date = value.getDate();
			value = new Date(value);
			value.setUTCFullYear(year);
			value.setUTCMonth(month);
			value.setUTCDate(date);
			return validate.call(this, value, arguments[1]);
		} }
	}, {
		toString: { value: function (descriptor) {
			return (new Date(this.getUTCFullYear(), this.getUTCMonth(),
				this.getUTCDate())).toLocaleDateString(this.database.locale);
		} }
	});
	return DateType;
}, { normalizer: require('memoizee/normalizers/get-1')() });
