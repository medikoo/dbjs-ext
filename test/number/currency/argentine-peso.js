'use strict';

var Database      = require('dbjs')
  , intlSupported = (typeof Intl !== 'undefined') && (typeof Intl.NumberFormat === 'function')
	&& Intl.NumberFormat.supportedLocalesOf(['es-AR'], { localeMatcher: 'lookup' }).size;

module.exports = function (t, a) {
	var db   = new Database()
	  , Type = t(db)
	  , obj  = new Type(23);

	if (intlSupported) {
		db.locale = 'es-AR';
		a(obj.toString(), '$ 23,00');
		a(obj.toString({ currencyDisplay: 'code' }), 'ARS 23,00');
	} else {
		a(obj.toString(), '$23.00');
		a(obj.toString({ currencyDisplay: 'code' }), 'ARS23.00');
	}
};
