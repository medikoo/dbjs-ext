'use strict';

var uInteger = require('../../number/integer/u-integer');

module.exports = require('../file').create('ImageFile', {
	width: uInteger,
	height: uInteger
});
