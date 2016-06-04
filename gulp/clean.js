const del = require('del');

/**
 * Очищаем папку с компилированным проектом.
 * @param path
 * @param build
 */
module.exports = function(path, build) {
	if (build === true)
	{
		del([path + '*']);
	}
};