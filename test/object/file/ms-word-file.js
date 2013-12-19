'use strict';

var Database = require('dbjs');

module.exports = function (t, a) {
	var db = new Database(), Type = t(db);

	a.deep(Type().type, 'application/octet-stream');
};
