'use strict';

var Db = require('dbjs');

module.exports = Db.Number.create('SquareMeters', {
	min: 0
}, {
	toString: function () {
		return Number.prototype.toString.call(this) + 'm2';
	}
});
