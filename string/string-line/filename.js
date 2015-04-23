'use strict';

var memoize          = require('memoizee/plain')
  , defineStringLine = require('../string-line');

module.exports = memoize(function (db) {
	return defineStringLine(db).extend('Filename', {
		pattern: { value: /^(?:[a-zA-Z]:\\)?[\u0009 -9;-\uffff]*$/ },
		min: { value: 1 },
		adapt: { value: function (name) {
			var prefix = '';
			name = String(name);
			if (/[a-zA-Z]:/.test(name.slice(0, 2))) {
				prefix = name.slice(0, 2);
				name = name.slice(2);
			}
			return prefix + String(name).replace(/[\0-\u0008\u0010-\u001f:]/g, '-');
		}, type: db.Function }
	});
}, { normalizer: require('memoizee/normalizers/get-1')() });
