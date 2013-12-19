'use strict';

var memoize          = require('memoizee/lib/regular')
  , defineStringLine = require('../string-line');

module.exports = memoize(function (db) {
	return defineStringLine(db).extend('Password', { pattern: { value:
		new RegExp('^[\\u0009 -\\u2027\\u2030-\\uffff]*(?=[\\u0009 -\\u2027' +
			'\\u2030-\\uffff]*\\d)(?=[\\u0009 -\\u2027\\u2030-\\uffff]*[a-zA-Z])' +
			'[\\u0009 -\\u2027\\u2030-\\uffff]*$') }, min: { value: 5 } });
});
