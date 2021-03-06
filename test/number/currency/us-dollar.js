'use strict';

var Database      = require('dbjs')
  , intlSupported = (typeof Intl !== 'undefined') && (typeof Intl.NumberFormat === 'function')
	&& Intl.NumberFormat.supportedLocalesOf(['en'], { localeMatcher: 'lookup' }).size;

module.exports = function (t, a) {
	var db   = new Database()
	  , Type = t(db)
	  , obj  = new Type(23);

	if (intlSupported) {
		db.locale = 'en';
		a(obj.toString(), '23,00 $');
		a(obj.toString({ currencyDisplay: 'code' }), '23,00 USD');
	} else {
		a(obj.toString(), '$23.00');
		a(obj.toString({ currencyDisplay: 'code' }), 'USD23.00');
	}
};
