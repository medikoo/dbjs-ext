'use strict';

var Database      = require('dbjs')
  , intlSupported = (typeof Intl !== 'undefined') && (typeof Intl.NumberFormat === 'function')
	&& Intl.NumberFormat.supportedLocalesOf(['fr-CI'], { localeMatcher: 'lookup' }).size;

module.exports = function (t, a) {
	var db   = new Database()
	  , Type = t(db)
	  , obj  = new Type(23);

	if (intlSupported) {
		db.locale = 'fr-FR';
		a(obj.toString(), '23,00 CFA');
		a(obj.toString({ currencyDisplay: 'code' }), '23,00 XOF');
	} else {
		a(obj.toString(), 'CFA23.00');
		a(obj.toString({ currencyDisplay: 'code' }), 'XOF23.00');
	}
};
