'use strict';

var File = require('../../file')

  , DocFile;

DocFile = module.exports = require('../ms-word-file')
	.create('MsWordDocFile', {}, { type: 'application/msword' });
File.types.add(DocFile.type).Namespace = DocFile;
