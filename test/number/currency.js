'use strict';

var setPrototypeOf = require('es5-ext/object/set-prototype-of')
  , Database       = require('dbjs');

module.exports = function (t, a) {
	var db = new Database(), Currency = t(db)
	  , Type = Currency.extend('CurrencyTest', { symbol: { value: "TEST" } })
	  , obj = Object(23);

	setPrototypeOf(obj, Type.prototype);
	a(obj.toString(), 'TEST23.00');
};
