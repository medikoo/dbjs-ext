'use strict';

var Database      = require('dbjs')
  , intlSupported = (typeof Intl !== 'undefined') && (typeof Intl.NumberFormat === 'function')
	&& Intl.NumberFormat.supportedLocalesOf(['es-GT'], { localeMatcher: 'lookup' }).size;

module.exports = function (t, a) {
	var db   = new Database()
	  , Type = t(db)
	  , obj  = new Type(23);

	if (intlSupported) {
		db.locale = 'es-GT';
		a(obj.toString(), '23,00 Q');
		a(obj.toString({ currencyDisplay: 'code' }), '23,00 GTQ');
	} else {
		a(obj.toString(), 'Q23.00');
		a(obj.toString({ currencyDisplay: 'code' }), 'GTQ23.00');
	}
};
