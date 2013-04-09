'use strict';

var File = require('../../file')

  , JpegFile;

JpegFile = module.exports = require('../image-file').create('JpegFile', {}, {
	type: 'image/jpeg'
});
File.types.add(JpegFile.type).Namespace = JpegFile;
