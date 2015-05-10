'use strict';

var memoize          = require('memoizee/plain')
  , defineStringLine = require('../string-line');

module.exports = memoize(function (db) {
	return defineStringLine(db).extend('Email', { pattern: { value:
		new RegExp('^(?:[a-z0-9!#$%&\'*+/=?^_`{|}~\u007f-\uffff-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`' +
			'{|}~\\u007f-\\uffff-]+)*|"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-' +
			'\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*")@(?:(?:[a-z0-9](?:[a-' +
			'z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]' +
			'|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9]' +
			'[0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-' +
			'\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])$') } });
}, { normalizer: require('memoizee/normalizers/get-1')() });
