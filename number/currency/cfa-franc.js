'use strict';

var memoize        = require('memoizee/lib/regular')
  , defineCurrency = require('../currency');

module.exports = memoize(function (db) {
	defineCurrency(db);
	return db.Currency.extend('CfaFranc', { symbol: { value: 'CFA' } });
});
