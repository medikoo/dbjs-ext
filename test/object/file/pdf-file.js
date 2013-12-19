'use strict';

var Database = require('dbjs');

module.exports = function (t, a) {
	var db = new Database(), Type = t(db), pdf;

	pdf = new Type();
	a(pdf.type, 'application/pdf');
	a(db.File.typeMap.get(pdf.type), Type, "Exposed");
};
