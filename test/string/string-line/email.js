'use strict';

var Database = require('dbjs');

module.exports = function (t, a) {
	var db = new Database(), Type = t(db);

	a.throws(function () { Type('wrong email@marko'); }, 'INVALID_STRING',
		"Wrong email");
	a(Type('test@example.com'), 'test@example.com');
	a(Type('foo+bar@example.com'), 'foo+bar@example.com');
	a(Type('revisión@minec.test.sv'), 'revisión@minec.test.sv');
	a(Type('üñîçøðé@example.com'), 'üñîçøðé@example.com');
};
