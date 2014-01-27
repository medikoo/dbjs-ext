'use strict';

var Database = require('dbjs');

module.exports = function (t, a) {
	var db = new Database(), Type = t(db), range, date, from, to;

	date = new db.Date(2013, 2, 23);
	from = db.Time(12, 32, 43);
	to = db.Time(15, 30, 43);

	range = new Type({ date: date, from: from, to: to });
	a.deep(range, { date: date, from: from, to: to });
};
