'use strict';

var memoize   = require('memoizee/plain')
  , validDbjs = require('dbjs/valid-dbjs');

module.exports = memoize(function (db) {
	return validDbjs(db).Number.extend('Currency', {
		step: { value: 0.01 },
		symbol: { type: db.String, required: true }
	}, {
		toString: { value: function (descriptor) {
			var num = 0, step;
			step = (descriptor && !isNaN(descriptor.step))
				? Math.max(descriptor.step, this.constructor.step) : this.constructor.step;
			if (step) {
				while (step < 1) {
					++num;
					step *= 10;
				}
			}
			return this.constructor.symbol + this.toFixed(num);
		} }
	});
}, { normalizer: require('memoizee/normalizers/get-1')() });
