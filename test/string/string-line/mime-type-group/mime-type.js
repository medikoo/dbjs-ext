'use strict';

var isError = require('es5-ext/error/is-error');

module.exports = function (t, a) {
	a(t('application/vnd.3gpp.pic-bw-large'), 'application/vnd.3gpp.pic-bw-large',
		"Valid #1");
	a(t('application/vnd.adobe.air-application-installer-package+zip'),
		'application/vnd.adobe.air-application-installer-package+zip',
		"Valid #2");
	a(t('image/bmp'), 'image/bmp', "Valid #3");
	a(isError(t.prototype.validateCreate('image/*')), true, "Group");
	a(isError(t.prototype.validateCreate('')), true, "Empty");
	a(isError(t.prototype.validateCreate('wrongtext')), true, "Wrong #1");
	a(isError(t.prototype.validateCreate('raz/ sd sfd ')), true, "Wrong #2");
};
