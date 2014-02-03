'use strict';

var memoize   = require('memoizee/lib/regular')
  , validDbjs = require('dbjs/valid-dbjs');

module.exports = memoize(function (db) {
	return validDbjs(db).Number.extend('Currency', {
		step: { value: 0.01 },
		symbol: { type: db.String, required: true }
	}, {
		toString: { value: function (descriptor) {
			var num = 0, step = this.constructor.step;
			if (step) {
				while (step < 1) {
					++num;
					step *= 10;
				}
			}
			return this.constructor.symbol + this.toFixed(num);
		} }
	});
});
