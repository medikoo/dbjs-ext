'use strict';

var Database = require('dbjs');

module.exports = function (t, a) {
	var db = new Database(), Type = t(db);

	a.throws(function () { Type('wrong email@marko'); }, 'INVALID_STRING',
		"Wrong email");
	a(Type('test@example.com'), 'test@example.com', "Email #1");
	a(Type('foo+bar@example.com'), 'foo+bar@example.com', "Email #2");
};
