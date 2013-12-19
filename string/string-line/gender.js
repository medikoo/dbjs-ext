'use strict';

var Map              = require('es6-map')
  , memoize          = require('memoizee/lib/regular')
  , createEnum       = require('../../create-enum')
  , defineStringLine = require('../string-line')

  , members;

members = new Map([
	['F', { label: 'Female' }],
	['M', { label: 'Male' }]
]);

module.exports = memoize(function (db) {
	return defineStringLine(createEnum(db)).createEnum('Gender', members);
});
