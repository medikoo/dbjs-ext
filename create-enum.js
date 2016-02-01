'use strict';

var forEach         = require('es5-ext/object/for-each')
  , isPlainObject   = require('es5-ext/object/is-plain-object')
  , isMap           = require('es6-map/is-map')
  , d               = require('d')
  , memoize         = require('memoizee/plain')
  , validDb         = require('dbjs/valid-dbjs')
  , validNested     = require('dbjs/valid-dbjs-nested-object')
  , defineGetLabels = require('./enum-define-get-labels')

  , defineProperty = Object.defineProperty
  , setProperty;

setProperty = function (value, name) {
	if (isPlainObject(value)) {
		forEach(value, setProperty, validNested(this.get(name), this));
		return;
	}
	this.set(name, value);
};

module.exports = exports = memoize(function (db) {
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
				throw new Error("'" + value + "' is not from specified set", 'ENUM_MATCH');
			} }
		}, {
			toString: { value: function (ignore) {
				try {
					var value     = String.prototype.toString.call(this)
					  , metaValue = this.constructor.meta[value];

					if (metaValue && (metaValue.label != null)) {
						return metaValue.label;
					}

					return value;
				} catch (e) {
					return Object.prototype.toString.call(this);
				}
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
		return defineGetLabels(Type);
	}));
	return db;
}, { normalizer: require('memoizee/normalizers/get-1')() });
