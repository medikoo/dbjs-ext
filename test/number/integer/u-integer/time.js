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
	a(Type(123), 123, "Integer");
	a.throws(function () { Type(-123); }, 'NUMBER_TOO_SMALL',
		"Integer: Negative");
	a(Type(123.23), 123, "Float");
	a(Type(123.63), 123, "Float #2");
	a.throws(function () { Type(-123.34); }, 'NUMBER_TOO_SMALL',
		"Float: Negative");
	a.throws(function () { Type(86400000); }, 'NUMBER_TOO_LARGE',
		"TOO LARGE");
	a(Type(86399999), 86399999, "Maximum possible value");
	a(Type(new Number(123)), 123, "Number object"); //jslint: ignore

	a(Type(23), 23, "One argument");
	a(Type(13, 24), 13 * 1000 * 60 * 60 + 24 * 1000 * 60, "Two arguments");
	a(Type(13, 24, 54), 13 * 1000 * 60 * 60 + 24 * 1000 * 60 + 54 * 1000,
		"Three arguments");
	a(Type(13, 24, 54, 645), 13 * 1000 * 60 * 60 + 24 * 1000 * 60 + 54 * 1000 +
		645, "Four arguments");
	return {
		"Is": function (a) {
			a(Type.is(undefined), false, "Undefined");
			a(Type.is(null), false, "Null");
			a(Type.is(false), false, "Boolean");
			a(Type.is({}), false, "Object");
			a(Type.is('false'), false, "Unconrvertable string");
			a(Type.is('0'), false, "Conversible string");
			a(Type.is(123), true, "Integer");
			a(Type.is(-123), false, "Integer: Negative");
			a(Type.is(new Number(123)), false, "Number object"); //jslint: ignore
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
			a(Type.normalize(123), 123, "Integer");
			a(Type.normalize(-123), null, "Integer: Negative");
			a(Type.normalize(new Number(123)), 123, "Number object"); //jslint: ignore
			a(Type.normalize(123.23), 123, "Float");
			a(Type.normalize(123.53), 123, "Float #2");
			a(Type.normalize(-123.23), null, "Float: Negative");
		},
		"Validate": function (a) {
			a.throws(function () { Type.validate(); }, 'INVALID_NUMBER', "Undefined");
			a(Type.validate(null), 0, "Null");
			a(Type.validate(false), 0, "Boolean");
			a.throws(function () { Type.validate({}); }, 'INVALID_NUMBER', "Object");
			a.throws(function () { Type.validate('false'); }, 'INVALID_NUMBER',
				"Unconrvertable string");
			a(Type.validate('0'), 0, "Conversible string");
			a(Type.validate(123), 123, "Integer");
			a.throws(function () { Type.validate(-123); }, 'NUMBER_TOO_SMALL',
				"Integer: Negative");
			a(Type.validate(new Number(123)), 123, //jslint: ignore
				"Number object");
			a(Type.validate(123.23), 123, "Float");
			a.throws(function () { Type.validate(-123.34); }, 'NUMBER_TOO_SMALL',
				"Float: Negative");
		}
	};
};
