'use strict';

var isError = require('es5-ext/error/is-error');

module.exports = function (t, a) {
	a(t('raz'), 'raz', "Constructor");
	a(t(''), '', "Empty");
	a(isError(t.prototype.validateCreate('raz\ndwa')), true, "Multiline");
};
