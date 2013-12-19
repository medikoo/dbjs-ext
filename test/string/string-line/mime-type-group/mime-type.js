'use strict';

var Database = require('dbjs');

module.exports = function (t, a) {
	var db = new Database(), Type = t(db);

	a(Type('application/vnd.3gpp.pic-bw-large'),
		'application/vnd.3gpp.pic-bw-large',
		"Valid #1");
	a(Type('application/vnd.adobe.air-application-installer-package+zip'),
		'application/vnd.adobe.air-application-installer-package+zip',
		"Valid #2");
	a(Type('image/bmp'), 'image/bmp', "Valid #3");
	a.throws(function () { Type.validate('image/*'); }, 'INVALID_STRING',
		"Group");
	a.throws(function () { Type.validate(''); }, 'INVALID_STRING', "Empty");
	a.throws(function () { Type.validate('wrongtext'); }, 'INVALID_STRING',
		"Wrong #1");
	a.throws(function () { Type.validate('raz/ sd sfd '); }, 'INVALID_STRING',
		"Wrong #2");
};
