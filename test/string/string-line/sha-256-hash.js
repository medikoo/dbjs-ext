'use strict';

module.exports = function (t, a) {
	a.throws(function () {
		t('ba7816bf8f01cfea414140de5dae2223b0061a396177a9cb410ff61f20015ad');
	}, "Wrong count");
	a.throws(function () {
		t('ba7816bf8f01cfeą414140de5dae2223b00361a396177a9cb410ff61f20015ad');
	}, "Wrong chars");
	a(t('ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'),
		'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad', "Ok");
};
