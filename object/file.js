'use strict';

var Db       = require('dbjs')
  , Filename = require('../string/string-line/filename')
  , MimeType = require('../string/string-line/mime-type')
  , Url      = require('../string/string-line/url')
  , UInteger = require('../number/integer/u-integer')

  , File;

File = module.exports = require('dbjs').create('File', function (data) {
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
	type: MimeType.rel({ required: true, value: 'application/octet-stream' }),
	accept: MimeType.rel({ required: true, value: function () {
		return this.types;
	}, multiple: true }),
	types: MimeType.rel({ multiple: true }),
	createByType: function (type) {
		var args = Array.prototype.slice.call(arguments, 1);
		if (!this.types.has(type)) return this.apply(null, args);
		return this.types.getItem(type).Namespace.apply(null, args);
	}
});

File.types._itemPrototype_.set('Namespace', Db.Base);
