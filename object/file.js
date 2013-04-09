'use strict';

var Filename = require('../string/string-line/filename')
  , MimeType = require('../string/string-line/mime-type')
  , Url      = require('../string/string-line/url')
  , UInteger = require('../number/integer/u-integer');

module.exports = require('dbjs').create('File', function (data) {
	if (typeof data === 'string') {
		this.dir = data;
		return;
	}
	this.ns.Object.prototype.$construct.call(this, data);
}, {
	dir: Filename.required,
	url: Url,
	name: Filename,
	size: UInteger,
	type: MimeType.rel({ required: true,
		value: function () { return this.ns.type; } }),
	validateConstruction: function (data) {
		if (typeof data === 'string') {
			return this.validateCreateProperty('dir', data);
		}
		return this.ns.Object.prototype.validateConstruction.call(this, data);
	}
}, {
	dir: Filename.rel('/'),
	url: Url.rel({ value: '/' }),
	type: MimeType.rel({ required: true, value: 'application/octet-stream' })
});
