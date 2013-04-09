'use strict';

module.exports = function (t, a) {
	var pdf = t();
	a.deep(pdf.type, 'application/pdf');
	a(t.File.types.has(pdf.type), true, "Exposed");
	a(t.File.types.getItem(pdf.type).Namespace, t, "Exposed Ns");
};
