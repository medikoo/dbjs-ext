'use strict';

module.exports = require('../file').create('MsWordFile', {}, {
	accept: ['application/msword',
		'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
});
