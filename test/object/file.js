'use strict';

module.exports = function (t, a) {
	var file = t('/moo');
	a.deep(file, { dir: '/moo' }, "Constructor: path");
	file = t({ dir: '/moo', url: '/moo' });
	a.deep(file, { dir: '/moo', url: '/moo' }, "Constructor object");
	a(t.type, 'application/octet-stream', "Ns Type");
	a(file.type, 'application/octet-stream', "File Type");
};
