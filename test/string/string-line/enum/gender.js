'use strict';

module.exports = function (t, a) {
	a.deep(t.options.values.sort(), ['F', 'M']);
};
