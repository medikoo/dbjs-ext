'use strict';

var Database = require('dbjs');

module.exports = function (t, a) {
	var db = new Database(), week;
	t(db);
	week = db.String.createEnum('Enumweektest',
		['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU']);

	a(week('MO'), 'MO', "Valid");
	a.throws(function () { week('FOO'); }, 'ENUM_MATCH', "Invalid");

	return {
		Is: function (a) {
			a(week.is({ toString: function () { return 'MO'; } }), false,
				"Not string");
			a(week.is('TU'), true, "Option");
			a(week.is('FOO'), false, "Other string");
		},
		Normalize: function () {
			a(week.normalize('MO'), 'MO', "Valid");
			a(week.normalize('FOO'), null, "Invalid");
			a(week.normalize({ toString: function () { return 'MO'; } }), 'MO',
				"Coercible");
			a(week.normalize({}), null, "Invalid #2");
		},
		Validate: function () {
			a(week.validate('MO'), 'MO', "Valid");
			a.throws(function () { week.validate('FOO'); }, 'ENUM_MATCH', "Invalid");
			a(week.validate({ toString: function () { return 'MO'; } }), 'MO',
				"Coercible");
			a.throws(function () { week.validate({}); }, 'ENUM_MATCH', "Invalid #2");
		}
	};
};
