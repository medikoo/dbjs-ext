'use strict';

var memoize    = require('memoizee/lib/regular')
  , createEnum = require('./create-enum')
  , members    = require('./_countries-list');

module.exports = memoize(function (db) {
	return createEnum(db, 'Country', members);
});
