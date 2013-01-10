'use strict';

module.exports = require('dbjs').String.create('StringLine', {
	pattern: /^[\u0009 -\u2027\u2030-\uffff]*$/
});
