#!/bin/bash

# Название папки нового проекта
FOLDER_NAME=$1

# Копировать проект
iscopy=$2

GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

SOURCE="$( cd -P "$( dirname "$SOURCE" )" && pwd )"
PATH_ROOT="$( dirname "$SOURCE" )"

cd $PATH_ROOT

echo -e " "

# Создаем папку проекта если ее нет
#
if [ -d "$FOLDER_NAME" ] ; then
    echo -e "${RED}Папка $FOLDER_NAME существует${NC}\n"
else
    mkdir $FOLDER_NAME
    echo -e "${GREEN}Создана папка $FOLDER_NAME${NC} \n"
fi

# Переходим в папку
#
cd ./$FOLDER_NAME

# Создаем папку проекта если ее нет
#
if [ "$iscopy" = "iscopy" ] ; then
    ln -s ${SOURCE}/node_modules/ ${PATH_ROOT}/$FOLDER_NAME/node_modules

    cp -r ${SOURCE}/gulpfile.js ${PATH_ROOT}/$FOLDER_NAME/gulpfile.js

    cp -r ${SOURCE}/.bowerrc ${PATH_ROOT}/$FOLDER_NAME/.bowerrc
    cp -r ${SOURCE}/.editorconfig ${PATH_ROOT}/$FOLDER_NAME/.editorconfig
    cp -r ${SOURCE}/package.json ${PATH_ROOT}/$FOLDER_NAME/package.json
    cp -r ${SOURCE}/bower.json ${PATH_ROOT}/$FOLDER_NAME/bower.json
    cp -r ${SOURCE}/yarn.lock ${PATH_ROOT}/$FOLDER_NAME/yarn.lock
else
    mkdir gulpfile.js

    cp -r ${SOURCE}/gulpfile.js/config.js ${PATH_ROOT}/$FOLDER_NAME/gulpfile.js/config.js
    cp -r ${SOURCE}/gulpfile.js/index.js ${PATH_ROOT}/$FOLDER_NAME/gulpfile.js/index.js
    cp -r ${SOURCE}/bower.json ${PATH_ROOT}/$FOLDER_NAME/

    ln -s ${SOURCE}/gulpfile.js/bower.js ${PATH_ROOT}/$FOLDER_NAME/gulpfile.js/bower.js
    ln -s ${SOURCE}/gulpfile.js/tasks ${PATH_ROOT}/$FOLDER_NAME/gulpfile.js/tasks
    ln -s ${SOURCE}/gulpfile.js/utils ${PATH_ROOT}/$FOLDER_NAME/gulpfile.js/utils

    ln -s ${SOURCE}/package.json ${PATH_ROOT}/$FOLDER_NAME/
    ln -s ${SOURCE}/node_modules/ ${PATH_ROOT}/$FOLDER_NAME/
    ln -s ${SOURCE}/.editorconfig ${PATH_ROOT}/$FOLDER_NAME/
    ln -s ${SOURCE}/.bowerrc ${PATH_ROOT}/$FOLDER_NAME/
fi

mkdir logs frontend public_html frontend/template frontend/styles frontend/scripts
mkdir frontend/images frontend/sprite frontend/favicon frontend/fonts frontend/json frontend/svgstore

# Копируем файлы и папки
cp -r ${SOURCE}/frontend/* ${PATH_ROOT}/$FOLDER_NAME/frontend/
cp -r ${SOURCE}/.gitignore ${PATH_ROOT}/$FOLDER_NAME/.gitignore
cp -r ${SOURCE}/.eslintignore ${PATH_ROOT}/$FOLDER_NAME/.eslintignore

echo -e "Проект ${GREEN}$FOLDER_NAME${NC} успешно создан"

cd ${PATH_ROOT}/$FOLDER_NAME/

chown -R 777 logs

# Запуск сборщика и сервера
bower cache clean && bower install && gulp build && gulp --server

exit 0