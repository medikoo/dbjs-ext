'use strict';

module.exports = function (t, a) {
	var img = t({ width: '34', height: 23.43 });
	a.deep(img, { width: 34, height: 23 }, "Dimensions");
	a(img.type, 'image/png', "Type");
};
