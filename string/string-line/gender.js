'use strict';

var memoize    = require('memoizee/lib/regular')
  , createEnum = require('./create-enum')

  , members;

members = [
	['F', { label: 'Female' }],
	['M', { label: 'Male' }]
];

module.exports = memoize(function (db) {
	return createEnum(db, 'Gender', members);
});
