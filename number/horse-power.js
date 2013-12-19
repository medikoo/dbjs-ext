'use strict';

var memoize   = require('memoizee/lib/regular')
  , validDbjs = require('dbjs/valid-dbjs');

module.exports = memoize(function (db) {
	return validDbjs(db).Number.extend('HorsePower', { min: { value: 0 } }, {
		toString: { value: function (/*options*/) {
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
});
