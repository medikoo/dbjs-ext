'use strict';

var memoize   = require('memoizee/lib/regular')
  , validDbjs = require('dbjs/valid-dbjs');

module.exports = memoize(function (db) {
	return validDbjs(db).Number.extend('Percentage',
		{ min: { value: 0 }, max: { value: 1 }, step: { value: 0.01 } }, {
			toString: { value: function (/*options*/) {
				var num, step = this.constructor.step, value = this * 100;
				if (!step) return value + '%';
				num = 0;
				step *= 100;
				while (step < 1) {
					++num;
					step *= 10;
				}
				return value.toFixed(num) + '%';
			} }
		});
});
