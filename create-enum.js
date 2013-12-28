'use strict';

var forEach   = require('es5-ext/object/for-each')
  , isMap     = require('es6-map/is-map')
  , d         = require('d/d')
  , lazy      = require('d/lazy')
  , memoize   = require('memoizee/lib/regular')
  , validDb   = require('dbjs/valid-dbjs')

  , setProperty = function (value, name) { this.set(name, value); }
  , defineProperties = Object.defineProperties
  , defineProperty = Object.defineProperty

  , getLabels;

getLabels = function () {
	var labels = {}, metaMap = this.meta;
	this.members.forEach(function (name) {
		var meta = metaMap.get(name);
		if (meta.label) labels[name] = meta.label;
	});
	return labels;
};

module.exports = memoize(function (db) {
	validDb(db);
	defineProperty(db.Base, 'createEnum', d(function (name, members, metaDef) {
		var Type, meta, TypeMeta;
		if (members && isMap(members)) {
			meta = members;
			members = members.keys();
		}
		Type = this.extend(name, {
			members: { type: this, multiple: true },
			meta: { type: db.Object, nested: true },
			is: { value: function (value) {
				if (!Object.getPrototypeOf(this).is.call(this, value)) return false;
				return this.members.has(value);
			} },
			normalize: { value: function (value) {
				value = Object.getPrototypeOf(this).normalize.call(this, value);
				if (value == null) return value;
				return this.members.has(value) ? value : null;
			} },
			validate: { value: function (value) {
				var Error;
				value = Object.getPrototypeOf(this).validate.call(this, value);
				if (this.members.has(value)) return value;
				Error = this.database.Error;
				throw new Error("'" + value + "' is not from specified set",
					'ENUM_MATCH');
			} }
		});
		TypeMeta = db.Object;
		if (metaDef) {
			if (metaDef.__id__) TypeMeta = metaDef;
			else TypeMeta = db.Object.extend(name + 'Meta', metaDef);
		}
		Type.meta._descriptorPrototype_.setProperties({
			type: TypeMeta,
			nested: true
		});
		if (members != null) Type.members = members;
		if (meta) {
			meta.forEach(function (data, key) {
				forEach(data, setProperty, this.get(key));
			}, Type.meta);
		}
		defineProperties(Type, lazy({
			labels: d(getLabels, { cacheName: '__labels__' })
		}));
		return Type;
	}));
	return db;
});
