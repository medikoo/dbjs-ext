'use strict';

var Database = require('dbjs');

module.exports = function (t, a) {
	var db = new Database(), Type = t(db);

	a(Type('raz'), 'raz', "Constructor");
	a.throws(function () { Type.validate(''); }, 'STRING_TOO_SHORT', "Empty");
	a(Type.validate('relative'), 'relative', "Relative");
	a(Type.validate('../'), '../', "Double dot");
	a(Type.validate('/'), '/', "Slash");
	a(Type.validate('https://www.medikoo.com'), 'https://www.medikoo.com',
		"Https");
	a(Type.validate('http://medikoo.com'), 'http://medikoo.com', "Http");
	a.throws(function () { Type.validate('asfafa sdfdsf/fefe'); },
		'INVALID_STRING', "Space");
	a(Type.validate('/asdf/asdf/ass'), '/asdf/asdf/ass', "Absolute");
	a(Type.validate('asdf/asdf/asdf'), 'asdf/asdf/asdf', "Relative");
	a.throws(function () { Type.validate('/asdfasf\nsdf/sdf'); },
		'INVALID_STRING', "New line");
};
