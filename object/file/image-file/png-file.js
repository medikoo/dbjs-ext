'use strict';

var File = require('../../file')

  , PngFile;

PngFile = module.exports = require('../image-file').create('PngFile', {}, {
	type: 'image/png'
});
File.types.add(PngFile.type).Namespace = PngFile;
