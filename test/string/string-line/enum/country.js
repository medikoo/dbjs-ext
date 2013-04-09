'use strict';

module.exports = function (t, a) {
	a(t.options.has('PL'), true, "Country");
	a(t.options.has('Foo'), false, "Not found");
	a(t.options.has('CH'), true, "Other country");
};
