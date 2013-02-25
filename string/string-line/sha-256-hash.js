'use strict';

module.exports = require('../string-line').create('Sha256Hash', {
	pattern: /^[0-9a-f]{64}$/
});
