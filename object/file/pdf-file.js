'use strict';

var File = require('../file')

  , PdfFile;

PdfFile = module.exports = File.create('PdfFile', {}, {
	type: 'application/pdf',
	accept: ['application/pdf']
});
File.types.add(PdfFile.type).Namespace = PdfFile;
