'use strict';

module.exports = function(config) {
    config = config || {};

    const gulp          = require('gulp');
    const critical      = require('critical'); // .stream;

	return function(callback) {

		setTimeout(function(){
			critical.generate(config.critical);
		}, 1500);
		
		callback();
	};
};