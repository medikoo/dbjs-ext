'use strict';

var Database = require('dbjs');

module.exports = function (t, a) {
	var db = new Database(), Type = t(db);

	a.throws(function () {
		Type('ba7816bf8f01cfea414140de5dae2223b0061a396177a9cb410ff61f20015ad');
	}, 'INVALID_STRING', "Wrong count");
	a.throws(function () {
		Type('ba7816bf8f01cfeą414140de5dae2223b00361a396177a9cb410ff61f20015ad');
	}, 'INVALID_STRING', "Wrong chars");
	a(Type('ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'),
		'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad', "Ok");
};
