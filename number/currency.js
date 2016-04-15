'use strict';

var memoize       = require('memoizee/plain')
  , validDbjs     = require('dbjs/valid-dbjs')
  , isNumber      = require('es5-ext/object/is-number-value')
  , isString      = require('es5-ext/string/is-string')
  , camelToHyphen = require('es5-ext/string/#/camel-to-hyphen')
  , max           = Math.max;

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
			var options = Object(arguments[1])
			  , locale  = options.locale
			  , intPart, fraction, decSep, numSep, prefix;

			options.style = 'currency';

			// Handle non-numbers forst
			if (isNaN(value)) return 'Invalid value';
			value = Number(value);
			if (!isFinite(value)) return String(value);

			// Use Intl if available and we have what we need
			if ((typeof Intl !== 'undefined') && (typeof Intl.NumberFormat === 'function')
					&& locale && options.currency) {
				// Sanitize options to prevent breaking something if Intl API changes
				delete options.locale;
				delete options.symbol;
				delete options.decSep;
				delete options.numSep;
				return value.toLocaleString(locale, options);
			}

			// Try our best without Intl
			value = value.toFixed(isNaN(options.minimumFractionDigits) ? 2
				: options.minimumFractionDigits).split('.');
			intPart = value[0];
			fraction = value[1] || '';
			decSep = options.decSep || '.';
			numSep = options.numSep || '\'';

			if (options.currencyDisplay === 'name') {
				prefix = camelToHyphen.call(this.__id__);
			} else {
				if (options.currencyDisplay === 'symbol') prefix = options.symbol;
				if (options.currencyDisplay === 'code' || !prefix) prefix = options.currency;
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
			  , step = (descriptor && isNumber(descriptor.step)) ?
					max(descriptor.step, this.constructor.step) : this.constructor.step
			  , currencyDisplay = (descriptor && isString(descriptor.currencyDisplay)) ?
					descriptor.currencyDisplay : this.constructor.currencyDisplay
			  , isoCode = (descriptor && isString(descriptor.isoCode)) ?
					descriptor.isoCode : this.constructor.isoCode
			  , symbol = (descriptor && isString(descriptor.symbol)) ?
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
