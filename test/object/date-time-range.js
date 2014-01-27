'use strict';

var Database = require('dbjs');

module.exports = function (t, a) {
	var db = new Database(), Type = t(db), range, from, to;

	from = new db.DateTime(2013, 2, 23, 12, 32, 43);
	to = new db.DateTime(2013, 3, 23, 15, 30, 43);

	range = new Type({ from: from, to: to });
	a.deep(range, { from: from, to: to });
};
