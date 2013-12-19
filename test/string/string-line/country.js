'use strict';

var Database = require('dbjs');

module.exports = function (t, a) {
	var db = new Database(), Type = t(db);
	a(Type.members.has('PL'), true, "Country");
	a(Type.members.has('Foo'), false, "Not found");
	a(Type.members.has('CH'), true, "Other country");

	a(Type.meta.PL.label, "Poland", "Label");
};
