'use strict';

module.exports = function (t, a) {
	var file = t();
	a.deep(file.type, 'application/msword');
	a(t.File.types.has(file.type), true, "Exposed");
	a(t.File.types.getItem(file.type).Namespace, t, "Exposed Ns");
};
