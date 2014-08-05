'use strict';

var memoize        = require('memoizee/plain')
  , defineCurrency = require('../currency');

module.exports = memoize(function (db) {
	defineCurrency(db);
	return db.Currency.extend('ArgentinePeso', {
		symbol: { value: '$' },
		isoCode: { value: 'ARS' }
	});
}, { normalizer: require('memoizee/normalizers/get-1')() });
