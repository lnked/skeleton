'use strict';

const browserSync = require('browser-sync').create();

module.exports = function(config) {
	config = config || { server: {} };

	return function() {
		browserSync.init(config.server);
        browserSync.watch(config.app + '**/*.*').on('change', browserSync.reload);
	};

};