'use strict';

var Database = require('dbjs');

module.exports = function (t, a) {
	var db = new Database(), Type = t(db);

	a(Type('razdwa3'), 'razdwa3', "Valid");
	a.throws(function () { Type.validate(''); }, 'INVALID_STRING', "Empty");
	a.throws(function () { Type.validate('razdwadasda'); }, 'INVALID_STRING',
		"No digit");
	a.throws(function () { Type.validate('982389423'); }, 'INVALID_STRING',
		"No a-z");
	a.throws(function () { Type.validate('raz1'); }, 'STRING_TOO_SHORT',
		"Too short");
};
