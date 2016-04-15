'use strict';

var Database = require('dbjs');

module.exports = function (t, a) {
	var db   = new Database()
	  , Type = t(db)
	  , obj  = new Type(23);

	db.locale = 'en';
	a(obj.toString(), '$23.00');
};
