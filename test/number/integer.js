'use strict';

var Database = require('dbjs');

module.exports = function (t, a) {
	var db = new Database(), Type = t(db);
	a.throws(function () { Type(undefined); }, 'INVALID_NUMBER', "Undefined");
	a(Type(null), 0, "Null");
	a(Type(false), 0, "Boolean");
	a.throws(function () { Type({}); }, 'INVALID_NUMBER', "Object");
	a.throws(function () { Type('false'); }, 'INVALID_NUMBER',
		"Unconversible string");
	a(Type('0'), 0, "Conversible string");
	a(Type(123), 123, "Number");
	a(Type(123.23), 123, "Float");
	a(Type(123.63), 123, "Float #2");
	a(Type(-123.23), -123, "Float: Negative");
	a(Type(-123.64), -123, "Float: Negative #2");
	a(Type(new Number(123)), 123, "Number object"); //jslint: skip
	return {
		"Is": function (a) {
			a(Type.is(undefined), false, "Undefined");
			a(Type.is(null), false, "Null");
			a(Type.is(false), false, "Boolean");
			a(Type.is({}), false, "Object");
			a(Type.is('false'), false, "Unconrvertable string");
			a(Type.is('0'), false, "Conversible string");
			a(Type.is(123), true, "Integer");
			a(Type.is(new Number(123)), false, "Number object"); //jslint: skip
			a(Type.is(123.23), false, "Float");
			a(Type.is(-123.23), false, "Float: Negative");
		},
		"Normalize": function (a) {
			a(Type.normalize(undefined), null, "Undefined");
			a(Type.normalize(null), 0, "Null");
			a(Type.normalize(false), 0, "Boolean");
			a(Type.normalize({}), null, "Object");
			a(Type.normalize('false'), null, "Unconrvertable string");
			a(Type.normalize('0'), 0, "Conversible string");
			a(Type.normalize(123), 123, "Number");
			a(Type.normalize(new Number(123)), 123, "Number object"); //jslint: skip
			a(Type.normalize(123.23), 123, "Float");
			a(Type.normalize(123.53), 123, "Float #2");
			a(Type.normalize(-123.23), -123, "Float: Negative");
			a(Type.normalize(-123.64), -123, "Float: Negative #2");
		},
		"Validate": function (a) {
			a.throws(function () { Type.validate(); }, 'INVALID_NUMBER', "Undefined");
			a(Type.validate(null), 0, "Null");
			a(Type.validate(false), 0, "Boolean");
			a.throws(function () { Type.validate({}); }, 'INVALID_NUMBER', "Object");
			a.throws(function () { Type.validate('false'); }, 'INVALID_NUMBER',
				"Unconrvertable string");
			a(Type.validate('0'), 0, "Conversible string");
			a(Type.validate(123), 123, "Number");
			a(Type.validate(new Number(123)), 123, //jslint: skip
				"Number object");
			a(Type.validate(123.23), 123, "Float");
			a(Type.validate(-123.23), -123, "Float: Negative");
		}
	};
};
