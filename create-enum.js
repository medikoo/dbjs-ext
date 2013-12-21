'use strict';

var forEach   = require('es5-ext/object/for-each')
  , isMap     = require('es6-map/is-map')
  , d         = require('d/d')
  , memoize   = require('memoizee/lib/regular')
  , validDb   = require('dbjs/valid-dbjs')
  , DbjsError = require('dbjs/_setup/error')

  , setProperty = function (value, name) { this.set(name, value); }
  , defineProperty = Object.defineProperty;

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
				value = Object.getPrototypeOf(this).validate.call(this, value);
				if (this.members.has(value)) return value;
				throw new DbjsError("Value not from specified set", 'ENUM_MATCH');
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
		return Type;
	}));
	return db;
});
