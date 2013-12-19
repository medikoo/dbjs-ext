'use strict';

var Database = require('dbjs');

module.exports = function (t, a) {
	var db = new Database(), Type = t(db), file;

	file = Type({ dir: '/moo' });
	a.deep(file, { dir: '/moo' }, "Constructor: path");
	file = Type({ dir: '/moo', url: '/moo' });
	a.deep(file, { dir: '/moo', url: '/moo' }, "Constructor object");
	a(Type.type, 'application/octet-stream', "Constructor Type");
	a(file.type, 'application/octet-stream', "File Type");
};
