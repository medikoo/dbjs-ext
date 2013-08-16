'use strict';

var File = require('../../file')

  , PngFile;

PngFile = module.exports = require('../image-file').create('PngFile', {}, {
	type: 'image/png',
	accept: ['image/png']
});
File.types.add(PngFile.type).Namespace = PngFile;
