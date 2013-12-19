'use strict';

var Database = require('dbjs');

module.exports = function (t, a) {
	var db = new Database(), Type = t(db);

	a.deep(Type({ dir: '/moo', width: '34', height: 23.43 }),
		{ dir: '/moo', width: 34, height: 23 });
};
