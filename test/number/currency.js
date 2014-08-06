'use strict';

var setPrototypeOf = require('es5-ext/object/set-prototype-of')
  , Database       = require('dbjs');

module.exports = function (t, a) {
	var db = new Database(), Currency = t(db)
	  , Type = Currency.extend('CurrencyTest', { symbol: { value: "TEST" } })
	  , obj = Object(23);

	setPrototypeOf(obj, Type.prototype);
	a(obj.toString(), 'TEST23.00');

	a.h1("Format");
	a(Currency.format(0.78912), '0.79', "Less than 1");
	a(Currency.format(56.78912), '56.79', "Tens");
	a(Currency.format(456.78912), '456.79', "Hundreds");
	a(Currency.format(3456.78912), '3\'456.79', "Thousands");
	a(Currency.format(123456.78912), '123\'456.79', "Hundreds of thousands");
	a(Currency.format(7123456.78912), '7\'123\'456.79', "Millions");
};
