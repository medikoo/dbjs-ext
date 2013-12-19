'use strict';

var Database = require('dbjs');

module.exports = function (t, a) {
	var db = new Database(), Type = t(db), img;

	img = new Type({ width: '34', height: 23.43 });
	a.deep(img, { width: 34, height: 23 }, "Dimensions");
	a(img.type, 'image/png', "Type");
	a(db.File.typeMap.get(img.type), Type, "Exposed");
};
