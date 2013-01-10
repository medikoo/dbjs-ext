'use strict';

var Filename = require('../string/string-line/filename')
  , Url      = require('../string/string-line/url');

module.exports = require('dbjs').create('File', function (data) {
	if (typeof data === 'string') {
		this.dir = data;
		return;
	}
	this.ns.Object.prototype.$construct.call(this, data);
}, {
	dir: Filename.required,
	url: Url,
	validateConstruction: function (data) {
		if (typeof data === 'string') {
			return this.validateCreateProperty('dir', data);
		}
		return this.ns.Object.prototype.validateConstruction.call(this, data);
	}
}, {
	dir: Filename.rel('/'),
	url: Url.rel({ value: '/' })
});
