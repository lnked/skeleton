'use strict';

const browserSync = require('browser-sync').create();

module.exports = function(config) {
	config = config || {};

	return function() {
		browserSync.init(config.server);
        browserSync.watch(config.app + '**/*.*').on('change', browserSync.reload);
	};

};