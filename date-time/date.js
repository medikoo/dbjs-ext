'use strict';

var memoize   = require('memoizee/lib/regular')
  , validDbjs = require('dbjs/valid-dbjs');

module.exports = memoize(function (db) {
	return validDbjs(db).DateTime.extend('Date', {
		step: { value: 1000 * 60 * 60 * 24 }
	}, {
		toString: { value: function (/*options*/) {
			return (new Date(this.getUTCFullYear(), this.getUTCMonth(),
				this.getUTCDate())).toLocaleDateString(this.database.locale);
		} }
	});
});
