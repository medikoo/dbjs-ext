'use strict';

var setPrototypeOf = require('es5-ext/object/set-prototype-of')
  , Database       = require('dbjs');

module.exports = function (t, a) {
	var db = new Database(), Type = t(db), obj = Object(Type(0.77));
	setPrototypeOf(obj, Type.prototype);

	a(obj.toString(), '77%');
};
