'use strict';

var memoize          = require('memoizee/plain')
  , defineStringLine = require('../string-line');

module.exports = memoize(function (db) {
	return defineStringLine(db).extend('Filename', {
		pattern: { value: /^(?:[a-zA-Z]:\\)?[\u0009 -9;-\uffff]*$/ },
		min: { value: 1 }
	});
}, { normalizer: require('memoizee/normalizers/get-1')() });
