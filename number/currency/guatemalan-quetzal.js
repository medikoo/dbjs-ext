'use strict';

var memoize        = require('memoizee/plain')
  , defineCurrency = require('../currency');

module.exports = memoize(function (db) {
	defineCurrency(db);
	return db.Currency.extend('GuatemalanQuetzal', { symbol: { value: 'Q' } });
}, { normalizer: require('memoizee/normalizers/get-1')() });
