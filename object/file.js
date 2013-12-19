'use strict';

var memoize         = require('memoizee/lib/regular')
  , defineFilename  = require('../string/string-line/filename')
  , defineMimeGroup = require('../string/string-line/mime-type-group')
  , defineMimeType  = require('../string/string-line/mime-type-group/mime-type')
  , defineUrl       = require('../string/string-line/url')
  , defineUInteger  = require('../number/integer/u-integer');

module.exports = memoize(function (db) {
	defineFilename(db);
	defineMimeGroup(db);
	defineMimeType(db);
	defineUrl(db);
	defineUInteger(db);

	return db.Object.extend('File', {
		path: { type: db.Filename, required: true },
		url: { type: db.Url },
		name: { type: db.Filename },
		size: { type: db.UInteger },
		type: { type: db.MimeType, required: true,
			value: function () { return this.constructor.type; } }
	}, {
		dir: { type: db.Filename, value: '/' },
		url: { type: db.Url, value: '/' },
		type: { type: db.MimeType, required: true,
			value: 'application/octet-stream' },
		accept: { type: db.MimeTypeGroup, multiple: true },
		types: { type: db.MimeType, multiple: true },
		typeMap: { type: db.Object, nested: true },
		createByType: function (type) {
			var args = Array.prototype.slice.call(arguments, 1)
			  , Type = this.typeMap.get(type) || this;
			return Type.apply(null, args);
		}
	});
});
