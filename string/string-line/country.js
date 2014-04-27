'use strict';

var memoize    = require('memoizee/plain')
  , createEnum = require('./create-enum')
  , members    = require('./_countries-list');

module.exports = memoize(function (db) {
	return createEnum(db, 'Country', members);
}, { normalizer: require('memoizee/normalizers/get-1')() });
