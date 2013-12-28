'use strict';

var Map        = require('es6-map')
  , Database   = require('dbjs')
  , createEnum = require('../create-enum');

module.exports = function (t, a) {
	var db = new Database();
	createEnum(db);
	a.deep(db.String.createEnum('Enumweektest', new Map([
		['foo', { label: "Foo" }],
		['bar', { label: "Bar" }],
		['car', { label: "Car" }]
	])).labels, { foo: "Foo", bar: "Bar", car: "Car" });
};
