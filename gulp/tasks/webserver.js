'use strict';

module.exports = function(config) {
	config = config || {};

	const browserSync = require('browser-sync').create();
	
	return function() {

		console.log(config.server)
		
		browserSync.init(config.server);
		browserSync.watch(config.app + '**/*.*').on('change', browserSync.reload);

	};

};