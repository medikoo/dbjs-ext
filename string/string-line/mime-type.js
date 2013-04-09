'use strict';

module.exports = require('../string-line').create('MimeType', {
	pattern: /^[a-z]+\/[a-z][a-z0-9\-.+]*$/
});
