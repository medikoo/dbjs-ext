'use strict';

var Database = require('dbjs');

module.exports = function (t, a) {
	var db = new Database(), Type = t(db);

	a(Type('raz'), 'raz', "Constructor");
	a(Type(''), '', "Empty");
	a.throws(function () { Type.validate('raz\ndwa'); }, 'INVALID_STRING',
		"Multiline");
};
