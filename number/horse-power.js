'use strict';

module.exports = require('dbjs').Number.create('HorsePower', { min: 0 }, {
	toString: function () {
		var num = 0, step = this.ns.__step.__value;
		if (step != null) {
			while (step < 1) {
				++num;
				step *= 10;
			}
		}
		return this.toFixed(num) + 'HP';
	}
});
