'use strict';

module.exports = require('../mime-type-group').create('MimeType', {
	pattern: /^[a-z]+\/[a-z][a-z0-9\-.+]*$/
});
