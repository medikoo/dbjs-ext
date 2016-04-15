'use strict';

var memoize       = require('memoizee/plain')
  , validDbjs     = require('dbjs/valid-dbjs')
  , camelToHyphen = require('es5-ext/string/#/camel-to-hyphen');

module.exports = memoize(function (db) {
	return validDbjs(db).Number.extend('Currency', {
		step: { value: 0.01 },
		// Possible values:
		// * symbol - uses symbol if provided
		// * code - uses isoCode if provided
		// * name - uses hyphenated class name
		currencyDisplay: { type: db.String, value: 'symbol' },
		// ISO 4217 currency code
		isoCode: { type: db.String, required: true },
		// Currency symbol such as € or $
		symbol: { type: db.String, required: true },
		format: { type: db.Function, value: function (value/*, options*/) {
			var options               = Object(arguments[1])
			  , locale                = options.locale
			  , currency              = options.currency
			  , currencyDisplay       = options.currencyDisplay
			  , minimumFractionDigits = options.minimumFractionDigits
			  , maximumFractionDigits = options.maximumFractionDigits
			  , intPart, fraction, decSep, numSep, prefix;

			options.style = 'currency';

			// Handle non-numbers forst
			if (isNaN(value)) return 'Invalid value';
			value = Number(value);
			if (!isFinite(value)) return String(value);

			// Use Intl if available and we have what we need
			if ((typeof Intl !== 'undefined') && (typeof Intl.NumberFormat === 'function')
					&& locale && currency) {
				return value.toLocaleString(locale, {
					style: 'currency',
					minimumFractionDigits: minimumFractionDigits,
					maximumFractionDigits: maximumFractionDigits,
					currencyDisplay: currencyDisplay,
					currency: currency
				});
			}

			// Try our best without Intl
			value = value.toFixed(isNaN(minimumFractionDigits) ? 2
				: minimumFractionDigits).split('.');
			intPart = value[0];
			fraction = value[1] || '';
			decSep = options.decSep || '.';
			numSep = options.numSep || '\'';

			if (currencyDisplay === 'name') {
				prefix = camelToHyphen.call(this.__id__);
			} else {
				if (currencyDisplay === 'symbol') prefix = options.symbol;
				if (currencyDisplay === 'code' || !prefix) prefix = currency;
				if (!prefix) prefix = '';
			}

			if (fraction) fraction = decSep + fraction;
			while (intPart) {
				fraction = intPart.slice(-3) + fraction;
				intPart = intPart.slice(0, -3);
				if (intPart) fraction = numSep + fraction;
			}
			return prefix + fraction + (options.postfix || '');
		} }
	}, {
		toString: { value: function (descriptor) {
			var num = 0
			  , step = (descriptor && (descriptor.step != null) && !isNaN(descriptor.step)) ?
					Math.max(descriptor.step, this.constructor.step) : this.constructor.step
			  , currencyDisplay = (descriptor && (descriptor.currencyDisplay != null)) ?
					descriptor.currencyDisplay : this.constructor.currencyDisplay
			  , isoCode = (descriptor && (descriptor.isoCode != null)) ?
					descriptor.isoCode : this.constructor.isoCode
			  , symbol = (descriptor && (descriptor.symbol != null)) ?
					descriptor.symbol : this.constructor.symbol;

			if (step) {
				while (step < 1) {
					++num;
					step *= 10;
				}
			}

			return this.constructor.format(this, {
				locale: this.database.locale,
				minimumFractionDigits: num || null,
				maximumFractionDigits: num || null,
				currencyDisplay: currencyDisplay,
				currency: isoCode,
				symbol: symbol
			});
		} }
	});
}, { normalizer: require('memoizee/normalizers/get-1')() });
