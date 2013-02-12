'use strict';

var combineErrors = require('dbjs/lib/utils/combine-errors')
  , StringLine    = require('../string-line');

module.exports = StringLine.create('Enum', function (options) {
	if (options == null) return;
	if (Array.isArray(options)) {
		this._options.$setValue(options);
		return;
	}
	this._options.$setValue(null);
	Object.keys(options).forEach(function (name) {
		var option = this.$add(name), value = options[name];
		if (value === true) return;
		option.$setProperties(value);
	}, this._options);
}, {
	setOptions: function (options) {
		var error;
		if (options == null) throw new TypeError('Options cannot be null');
		error = this.validateConstruction(options);
		if (error) throw error;
		this.$construct(options);
	},
	validateConstruction: function (options) {
		var opts, error, errors;
		if (options == null) return null;
		if (Array.isArray(options)) {
			return this.StringLine.validateConstruction.call(this,
				{ options: options });
		}
		opts = [];
		Object.keys(Object(options)).forEach(function (name) {
			var error, value = options[name];
			opts.push(name);
			if (value === true) return;
			if (value == null) {
				error = new TypeError(value + " are not valid option properties");
			} else {
				error = this.prototype.validateCreate(value);
			}
			if (error) {
				if (!errors) errors = [];
				errors.push(error);
			}
		}, this.Object);
		error = this.StringLine.validateConstruction.call(this,
			{ options: opts });
		if (errors) {
			error = combineErrors.apply(this, errors.concat(error));
			if (error) error.message = options + " is not valid options";
		}
		return error;
	},
	options: StringLine.rel({ multiple: true, required: true }),
	is: function (value) {
		if (typeof value !== 'string') return false;
		return this.options.has(value);
	},
	normalize: function (value) {
		return this.options.has(value) ? String(value) : null;
	}
}, {
	validateCreate: function (value) {
		if (!this.ns.options.has(value)) {
			return new TypeError(value + " is not a valid " + this._id_);
		}
		return null;
	}
});
