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
# FOLDER_NAME='skeleton'

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
    cp -r ${SOURCE}/gulpfile.js ${PATH_ROOT}/$FOLDER_NAME/gulpfile.js
    cp -r ${SOURCE}/package.json ${PATH_ROOT}/$FOLDER_NAME/package.json
    cp -r ${SOURCE}/node_modules/ ${PATH_ROOT}/$FOLDER_NAME/node_modules
else
    ln -s ${SOURCE}/gulpfile.js ${PATH_ROOT}/$FOLDER_NAME/
    ln -s ${SOURCE}/package.json ${PATH_ROOT}/$FOLDER_NAME/
    ln -s ${SOURCE}/node_modules/ ${PATH_ROOT}/$FOLDER_NAME/
fi

mkdir logs frontend public_html frontend/template frontend/styles frontend/scripts
mkdir frontend/images frontend/sprite frontend/favicon frontend/fonts frontend/json frontend/svgstore

# Копируем файлы
cp -r ${SOURCE}/.gitignore ${PATH_ROOT}/$FOLDER_NAME/.gitignore
cp -r ${SOURCE}/.eslintrc.json ${PATH_ROOT}/$FOLDER_NAME/.eslintrc.json

cp -R ${SOURCE}/frontend/* ${PATH_ROOT}/$FOLDER_NAME/frontend/

echo -e "Проект ${GREEN}$FOLDER_NAME${NC} успешно создан"

cd ${PATH_ROOT}/$FOLDER_NAME/

# Запуск сборщика и сервера
gulp build && gulp --server

exit 0