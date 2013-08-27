'use strict';

var isError = require('es5-ext/error/is-error');

module.exports = function (t, a) {
	a(t('razdwa3'), 'razdwa3', "Valid");
	a(isError(t.prototype.validateCreate('')), true, "Empty");
	a(isError(t.prototype.validateCreate('razdwadasda')), true, "No digit");
	a(isError(t.prototype.validateCreate('982389423')), true, "No a-z");
	a(isError(t.prototype.validateCreate('raz1')), true, "Too short");
};
