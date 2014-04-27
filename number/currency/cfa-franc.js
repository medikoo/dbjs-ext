'use strict';

var memoize        = require('memoizee/plain')
  , defineCurrency = require('../currency');

module.exports = memoize(function (db) {
	defineCurrency(db);
	return db.Currency.extend('CfaFranc', { symbol: { value: 'CFA' } });
}, { normalizer: require('memoizee/normalizers/get-1')() });
