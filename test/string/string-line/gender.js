'use strict';

var toArray  = require('es6-iterator/to-array')
  , Database = require('dbjs');

module.exports = function (t, a) {
	var db = new Database(), Type = t(db);
	a.deep(toArray(Type.members), ['F', 'M']);
};
