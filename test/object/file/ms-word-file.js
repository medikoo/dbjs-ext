'use strict';

module.exports = function (t, a) {
	a.deep(t().type, 'application/octet-stream');
};
