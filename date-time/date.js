'use strict';

module.exports = require('dbjs').DateTime.create('Date', {
	is: function (value) {
		return (value && value.getUTCHours &&
			(Object.getPrototypeOf(value) === this.prototype) &&
			(value.getUTCHours() === 12) &&
			(value.getUTCMinutes() === 0) && (value.getUTCSeconds() === 0) &&
			(value.getUTCMilliseconds() === 0)) || false;
	},
	normalize: function (value) {
		if (this.is(value)) return value;
		value = Object.getPrototypeOf(this).normalize.call(this, value);
		if (value == null) return null;
		value = new Date(value.getTime());
		value.__proto__ = this.prototype;
		value.$construct();
		return value;
	}
}, {
	$construct: function (ignore) {
		this.setTime(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate(),
			12));
	},
	toString: function () {
		var proto = this.__proto__, value;
		this.__proto__ = Date.prototype;
		value = this.toLocaleDateString();
		this.__proto__ = proto;
		return value;
	}
});
