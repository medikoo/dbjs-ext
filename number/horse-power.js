'use strict';

var memoize   = require('memoizee/plain')
  , validDbjs = require('dbjs/valid-dbjs');

module.exports = memoize(function (db) {
	return validDbjs(db).Number.extend('HorsePower', { min: { value: 0 } }, {
		toString: { value: function (descriptor) {
			var num = 0, step = this.constructor.step;
			if (step) {
				while (step < 1) {
					++num;
					step *= 10;
				}
			}
			return this.toFixed(num) + 'HP';
		} }
	});
}, { normalizer: require('memoizee/normalizers/get-1')() });
