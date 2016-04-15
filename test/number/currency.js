'use strict';

var arrayContains = require('es5-ext/array/#/contains')
  , assign        = require('es5-ext/object/assign')
  , Database      = require('dbjs');

module.exports = function (t, a) {
	var db   = new Database()
	  , Type = t(db)
	  , supportedLocales, haveEnLocale, havePlLocale, localeOptions;

	a.h1("Format");
	a(Type.format(0.78912), '0.79', "Less than 1");
	a(Type.format(56.78912), '56.79', "Tens");
	a(Type.format(456.78912), '456.79', "Hundreds");
	a(Type.format(3456.78912), '3\'456.79', "Thousands");
	a(Type.format(123456.78912), '123\'456.79', "Hundreds of thousands");
	a(Type.format(7123456.78912), '7\'123\'456.79', "Millions");

	if ((typeof Intl !== 'undefined') && (typeof Intl.NumberFormat === 'function')) {
		supportedLocales = Intl.NumberFormat.supportedLocalesOf(['en', 'pl'],
			{ localeMatcher: 'lookup' });
		haveEnLocale = arrayContains.call(supportedLocales, 'en');
		havePlLocale = arrayContains.call(supportedLocales, 'pl');

		a.h1("Locale support");

		if (haveEnLocale) {
			localeOptions = { locale: 'en', currency: 'USD' };

			a(Type.format(56.79, localeOptions), '$56.79');
			a(Type.format(56.79, assign({ currencyDisplay: 'code' }, localeOptions)), 'USD56.79');
			a(Type.format(56.79, assign({ currencyDisplay: 'name' }, localeOptions)), '56.79 US dollars');
		}

		if (havePlLocale) {
			localeOptions = { locale: 'pl', currency: 'PLN' };

			// Important: Those spaces between digits and symbols are no-brake spaces (Unicode: U+00A0)
			a(Type.format(56.79, localeOptions), '56,79 zł');
			a(Type.format(56.79, assign({ currencyDisplay: 'code' }, localeOptions)), '56,79 PLN');
			a(Type.format(56.79, assign({ currencyDisplay: 'name' }, localeOptions)),
				'56,79 złotego polskiego');
		}
	}
};
