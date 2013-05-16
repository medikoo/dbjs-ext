'use strict';

module.exports = function (t, a) {
	var obj = Object(t(342));
	obj.__proto__ = t.prototype;

	a(obj.toString(), '342HP');

	a.throws(function () { t(-34); }, "Out of range");
};
