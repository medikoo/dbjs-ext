'use strict';

var setPrototypeOf = require('es5-ext/object/set-prototype-of')
  , Database       = require('dbjs');

module.exports = function (t, a) {
	var db = new Database(), Type = t(db), obj = Object(Type(342));

	setPrototypeOf(obj, Type.prototype);
	a(obj.toString(), '342HP');

	a.throws(function () { Type(-34); }, 'NUMBER_TOO_SMALL', "Out of range");
};
