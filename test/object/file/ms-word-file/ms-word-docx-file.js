'use strict';

module.exports = function (t, a) {
	a.deep(t().type,
		'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
};
