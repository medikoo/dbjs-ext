'use strict';

var memoize    = require('memoizee/plain')
  , createEnum = require('./create-enum')

  , members;

members = [
	['F', { label: 'Female' }],
	['M', { label: 'Male' }]
];

module.exports = memoize(function (db) {
	return createEnum(db, 'Gender', members);
}, { normalizer: require('memoizee/normalizers/get-1')() });
