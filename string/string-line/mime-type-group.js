'use strict';

module.exports = require('../string-line').create('MimeTypeGroup', {
	pattern: /^[a-z]+\/(?:\*|[a-z][a-z0-9\-.+]*)$/
});
