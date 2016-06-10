const fs    = require('fs');
const path  = require('path');

/**
 * Возвращаем имена под-папок
 * @param dir
 */
module.exports = function(dir) {
    return fs.readdirSync(dir).filter(function(file){
        return fs.statSync(path.join(dir, file)).isDirectory();
    });
};