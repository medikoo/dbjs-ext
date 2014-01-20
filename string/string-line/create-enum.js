'use strict';

var validArray       = require('es5-ext/array/valid-array')
  , Map              = require('es6-map')
  , createEnum       = require('../../create-enum')
  , defineStringLine = require('../string-line')

  , isArray = Array.isArray;

module.exports = function (db, name, members) {
	if (isArray(validArray(members)[0])) members = new Map(members);
	return defineStringLine(createEnum(db)).createEnum(name, members);
};
