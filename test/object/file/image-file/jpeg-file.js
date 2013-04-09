'use strict';

module.exports = function (t, a) {
	var img = t({ width: '34', height: 23.43 });
	a.deep(img, { width: 34, height: 23 }, "Dimensions");
	a(img.type, 'image/jpeg', "Type");
	a(t.File.types.has(img.type), true, "Exposed");
	a(t.File.types.getItem(img.type).Namespace, t, "Exposed Ns");
};
