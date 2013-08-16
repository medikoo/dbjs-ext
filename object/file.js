'use strict';

var Db            = require('dbjs')
  , Filename      = require('../string/string-line/filename')
  , MimeTypeGroup = require('../string/string-line/mime-type-group')
  , MimeType      = require('../string/string-line/mime-type-group/mime-type')
  , Url           = require('../string/string-line/url')
  , UInteger      = require('../number/integer/u-integer')

  , File;

File = module.exports = require('dbjs').create('File', {
	dir: Filename.required,
	url: Url,
	name: Filename,
	size: UInteger,
	type: MimeType.rel({ required: true,
		value: function () { return this.ns.type; },
		validateRelation: function (value) {
			var accept = this.obj.ns.accept;
			if (!accept || !accept.count) return null;
			value = String(value);
			if (accept.values.some(function (mime) {
					if (mime.slice(-2) === '/*') {
						if (value.indexOf(mime.slice(0, -2)) === 0) return true;
					} else {
						if (value === mime) return true;
					}
				})) {
				return null;
			}
			return new TypeError("Unsupported mime type");
		} })
}, {
	dir: Filename.rel('/'),
	url: Url.rel({ value: '/' }),
	type: MimeType.rel({ required: true, value: 'application/octet-stream' }),
	accept: MimeTypeGroup.rel({ value: null, multiple: true }),
	types: MimeType.rel({ multiple: true }),
	createByType: function (type) {
		var args = Array.prototype.slice.call(arguments, 1);
		if (!this.types.has(type)) return this.apply(null, args);
		return this.types.getItem(type).Namespace.apply(null, args);
	}
});

File.types._itemPrototype_.set('Namespace', Db.Base);
