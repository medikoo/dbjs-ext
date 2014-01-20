'use strict';

var Database = require('dbjs');

module.exports = function (t, a) {
	var db = new Database(), week;
	week = t(db, 'Enumweektest', ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU']);

	a(week('MO'), 'MO', "Valid");
	a.throws(function () { week('FOO'); }, 'ENUM_MATCH', "Invalid");
};
