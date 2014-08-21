'use strict';

var isDate         = require('es5-ext/date/is-date')
  , setPrototypeOf = require('es5-ext/object/set-prototype-of')
  , Database       = require('dbjs');

module.exports = function (t, a) {
	var date = new Date(), db = new Database()
	  , DateType = t(db), obj;

	a(DateType.is(DateType()), true, "No arguments");
	a(DateType.is(DateType(null)), true, "Null");
	date.setMinutes(12);
	a.not(DateType(date), date, "Date: Not UTC: same");
	a(DateType.is(DateType(date)), true, "Date: Not UTC");
	date = DateType.normalize(date);
	a(DateType(date), date, "Date: UTC");
	a.throws(function () { DateType(new Date('Invalid')); }, "Invalid date");
	a.throws(function () { DateType({}); }, "Other object");
	a(isDate(DateType(23423423)), true, "Number");

	date = DateType(2014, 3, 13);
	a.deep([date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()], [2014, 3, 13],
		"Full date arguments");

	obj = db.Object();
	obj.define('foo', { type: DateType });
	obj.foo = new Date(2014, 5, 30);
	a(obj.foo.getUTCDate(), 30, "Assign from normal date");
	return {
		Is: function (a) {
			var date = new Date();
			a(DateType.is(), false, "Undefined");
			a(DateType.is(null), false, "Null");
			setPrototypeOf(date, DateType.prototype);
			date.setUTCHours(14);
			a(DateType.is(date), false, "Date: Not UTC hours");
			date.setUTCHours(0);
			date.setUTCMinutes(12);
			a(DateType.is(date), false, "Date: Not UTC minutes");
			date.setUTCMinutes(0);
			date.setUTCSeconds(12);
			a(DateType.is(date), false, "Date: Not UTC seconds");
			date.setUTCSeconds(0);
			date.setUTCMilliseconds(12);
			a(DateType.is(date), false, "Date: Not UTC milliseconds");
			date.setUTCMilliseconds(0);
			a(DateType.is(date), true, "Date: UTC");
			a(DateType.is({}), false, "Other object");
			a(DateType.is(date.getTime()), false, "Number");
			a(DateType.is(new Date('Invalid')), false, "Invalid date");
		},
		Normalize: function (a) {
			var date = new Date();
			a(DateType.normalize(), null, "Undefined");
			a(DateType.is(DateType.normalize(null)), true, "Null");
			a(DateType.is(DateType.normalize(date)), true, "Date: Not UTC");
			a.not(DateType.normalize(date), date, "Date: Not UTC: Same");
			date.setUTCHours(0);
			date.setUTCMinutes(0);
			date.setUTCSeconds(0);
			date.setUTCMilliseconds(0);
			a(DateType.is(DateType.normalize(date)), true, "Date: UTC");
			a(DateType.normalize({}), null, "Other object");
			a(DateType.normalize(date.getTime()).getTime(), date.getTime(), "Number");
			a(DateType.normalize(new Date('Invalid')), null, "Invalid date");
		},
		Validate: function (a) {
			var date = new Date();
			a.throws(function () { DateType.validate(); }, 'INVALID_DATETIME',
				"Undefined");
			a(isDate(DateType.validate(null)), true, "Null");
			a(isDate(DateType.validate(date)), true, "Date");
			a.throws(function () { DateType.validate(new Date('Invalid')); },
				'INVALID_DATETIME', "Invalid date");
			a.throws(function () { DateType.validate({}); }, 'INVALID_DATETIME',
				"Other object");
			a(isDate(DateType.validate(234234)), true, "Number");
		}
	};
};
