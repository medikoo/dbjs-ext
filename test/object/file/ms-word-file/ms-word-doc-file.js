'use strict';

var Database = require('dbjs');

module.exports = function (t, a) {
	var db = new Database(), Type = t(db), file;

	file = new Type();
	a.deep(file.type, 'application/msword');
	a(db.File.typeMap.get(file.type), Type, "Exposed");
};
