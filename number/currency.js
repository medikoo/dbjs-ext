'use strict';

var isNumber  = require('es5-ext/object/is-number-value')
  , memoize   = require('memoizee/plain')
  , validDbjs = require('dbjs/valid-dbjs');

module.exports = memoize(function (db) {
	return validDbjs(db).Number.extend('Currency', {
		step: { value: 0.01 },
		symbol: { type: db.String, required: true },
		isoCode: { type: db.String, required: true },
		format: { type: db.Function, value: function (value/*, options*/) {
			var options = Object(arguments[1]), intPart, numSep, result;
			if (isNaN(value)) return 'Invalid value';
			value = Number(value);
			if (!isFinite(value)) return String(value);
			value = value.toFixed(isNaN(options.fractionDigits) ? 2 : options.fractionDigits).split('.');
			intPart = value[0];
			result = value[1] || '';
			if (result) result = (options.decSep || '.') + result;
			numSep = options.numSep || '\'';
			while (intPart) {
				result = intPart.slice(-3) + result;
				intPart = intPart.slice(0, -3);
				if (intPart) result = numSep + result;
			}
			return (options.prefix || '') + result + (options.postfix || '');
		} }
	}, {
		toString: { value: function (descriptor) {
			var num = 0, step, prefix;
			step = (descriptor && isNumber(descriptor.step)) ? descriptor.step : this.constructor.step;
			if (step) {
				while (step < 1) {
					++num;
					step *= 10;
				}
			}
			if (this.constructor.symbol) prefix = this.constructor.symbol;
			else if (this.constructor.isoCode) prefix = this.constructor.isoCode + ' ';
			else prefix = '';
			return this.constructor.format(this, { fractionDigits: num, prefix: prefix });
		} }
	});
}, { normalizer: require('memoizee/normalizers/get-1')() });
