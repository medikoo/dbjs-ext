'use strict';

var d         = require('d/d')
  , lazy      = require('d/lazy')
  , memoize   = require('memoizee/lib/regular')

  , defineProperties = Object.defineProperties

  , getLabels;

getLabels = function () {
	var labels = {}, metaMap = this.meta;
	this.members.forEach(function (name) {
		var meta = metaMap.get(name);
		if (meta.label) labels[name] = meta.label;
	});
	return labels;
};

module.exports = exports = memoize(function (Type) {
	return defineProperties(Type, lazy({
		labels: d(getLabels, { cacheName: '__labels__' })
	}));
});
