'use strict';

module.exports = function(config) {
	config = config || {};

	const browserSync = require('browser-sync').create();
	
	return function() {

		if (typeof config.proxy !== 'undefined')
		{
			// config.proxy = config.proxy;
		}

		if (typeof config.port !== 'undefined')
		{
			config.port = config.port;
		}

		if (typeof config.server !== 'undefined')
		{
			config.server = config.server;
		}

		browserSync.init(config);

		browserSync.watch(config.app + '**/*.*').on('change', browserSync.reload);
	};

};