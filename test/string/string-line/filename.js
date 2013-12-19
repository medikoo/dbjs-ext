'use strict';

var Database = require('dbjs');

module.exports = function (t, a) {
	var db = new Database(), Type = t(db);

	a(Type('raz'), 'raz', "Constructor");
	a.throws(function () { Type.validate(''); }, 'STRING_TOO_SHORT', "Empty");
	a(Type.validate('.'), '.', "Dot");
	a(Type.validate('..'), '..', "Double dot");
	a(Type.validate('/'), '/', "Slash");
	a(Type.validate('c:\\'), 'c:\\', "Windows root");
	a.throws(function () { Type.validate('c:/sdfsfd/'); }, 'INVALID_STRING',
		"Wrong Windows root");
	a(Type.validate('/asdf/asdf/as  df'), '/asdf/asdf/as  df', "Absolute");
	a(Type.validate('asdf/asdf/asdf'), 'asdf/asdf/asdf', "Relative");
	a.throws(function () { Type.validate('/asdfasf\nsdf/sdf'); },
		'INVALID_STRING', "New line");
};
