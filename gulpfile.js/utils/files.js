const fs    = require('fs');
const path  = require('path');

function prepareFiles(dir, files)
{
    const response = [];

    if (files.length)
    {
        files.forEach((file) => {
            const basename = path.basename(file);
            const template = basename.split('.');
            const extension = template[template.length - 1];

            if (['js', 'jsx'].indexOf(extension) >= 0)
            {
                response.push(
                    path.resolve(dir, file)
                );
            }
        });
    }

    return response;
}

/**
 * Возвращаем имена файлов
 * @param dir
 */
module.exports = function(dir) {
    return prepareFiles(dir, fs.readdirSync(dir).filter((folder) => {
        return fs.statSync(path.join(dir, folder)).isFile();
    }));
};
