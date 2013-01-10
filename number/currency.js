'use strict';

var Db = require('dbjs');

module.exports = Db.Number.create('Currency', {
	step: 0.01,
	symbol: Db.String.required
}, {
	toString: function () {
		return this.ns.symbol + this.toFixed(2);
	}
});
