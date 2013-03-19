'use strict';

module.exports = require('dbjs').Number.create('Percentage',
	{ min: 0, max: 1, step: 0.01 }, {
		toString: function () {
			var num, step = this.ns.__step.__value, value = this * 100;
			if (step != null) {
				num = 0;
				step *= 100;
				while (step < 1) {
					++num;
					step *= 10;
				}
				return value.toFixed(num) + '%';
			}
			return value + '%';
		}
	});
