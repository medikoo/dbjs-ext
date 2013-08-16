'use strict';

var File = require('../../file')

  , DocxFile;

DocxFile = module.exports = require('../ms-word-file')
	.create('MsWordDocxFile', {}, {
		type:
			'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		accept: [
			'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
		]
	});
File.types.add(DocxFile.type).Namespace = DocxFile;
