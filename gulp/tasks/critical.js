'use strict';

const gulp      = require('gulp');
const critical  = require('critical'); // .stream;

module.exports = function(config) {
    config = config || {};

	return function(callback) {

		setTimeout(function(){
			critical.generate(config.critical);
		}, 1500);
		
		callback();
	};
};