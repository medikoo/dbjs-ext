'use strict';

module.exports = function (t, a) {
	var obj = Object(t(0.77));
	obj.__proto__ = t.prototype;

	a(obj.toString(), '77%');

	a.throws(function () { t(34); }, "Out of range");
};
