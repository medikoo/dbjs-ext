'use strict';

var Db = require('dbjs');

module.exports = Db.Number.create('Currency', {
	step: 0.01,
	symbol: Db.String.required
}, {
	toString: function () {
		var num = 0, step = this.ns.__step.__value;
		if (step != null) {
			while (step < 1) {
				++num;
				step *= 10;
			}
		}
		return this.ns.symbol + this.toFixed(num);
	}
});
