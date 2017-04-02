'use strict';

const $ = require('gulp-load-plugins')();

let is, m, env;

is = {
    pretty: false,  // short: p
    build: false,   // short: b
    react: false,   // short: r
    mail: false,    // short: m
    lint: false,    // short: l
    watch: false,   // short: w
    uncss: false,   // short: u
    server: false,  // short: s
    notify: false,  // short: n
    htmlmin: false  // short: h
};

if (typeof $.util.env !== 'undefined')
{
    for (env in $.util.env)
    {
        for (m in is)
        {
            if (env == m.substr(0, 1))
            {
                env = m;
            }
        }

        if (env == 'min')
        {
            is.htmlmin = true;
        }

        if (typeof (is[env]) !== 'undefined')
        {
            is[env] = !is[env];
        }
    }
}

global.is = is;