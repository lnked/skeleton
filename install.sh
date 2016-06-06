#!/bin/bash

# Название папки нового проекта
folder_name=$1

# Копировать проект
iscopy=$2

GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

SOURCE="$( cd -P "$( dirname "$SOURCE" )" && pwd )"
ROOT="$( dirname "$SOURCE" )"
FOLDER_NAME='skeleton'

cd $ROOT

echo -e " "

# Создаем папку проекта если ее нет
#
if [ -d "$folder_name" ] ; then
	echo -e "${RED}Папка $folder_name существует${NC}\n"
else
	mkdir $folder_name
	echo -e "${GREEN}Создана папка $folder_name${NC} \n"
fi

# Переходим в папку
#
cd ./$folder_name

# Создаем папку проекта если ее нет
#
if [ "$iscopy" = "iscopy" ] ; then
    cp -r ${SOURCE}/gulp ${ROOT}/$folder_name/gulp
    cp -r ${SOURCE}/gulpfile.js ${ROOT}/$folder_name/gulpfile.js
    cp -r ${SOURCE}/package.json ${ROOT}/$folder_name/package.json
    cp -r ${SOURCE}/node_modules/ ${ROOT}/$folder_name/node_modules
else
    ln -s ${SOURCE}/gulp/ ${ROOT}/$folder_name/
    ln -s ${SOURCE}/gulpfile.js ${ROOT}/$folder_name/
    ln -s ${SOURCE}/package.json ${ROOT}/$folder_name/
    ln -s ${SOURCE}/node_modules/ ${ROOT}/$folder_name/
fi

mkdir frontend public_html frontend/template frontend/styles frontend/scripts
mkdir frontend/images frontend/sprite frontend/favicon frontend/fonts frontend/json frontend/svgstore

# Копируем файлы
cp -r ${SOURCE}/.gitignore ${ROOT}/$folder_name/.gitignore
cp -r ${SOURCE}/.eslintrc.json ${ROOT}/$folder_name/.eslintrc.json

cp -R ${SOURCE}/frontend/* ${ROOT}/$folder_name/frontend/

echo -e "Проект ${GREEN}$folder_name${NC} успешно создан"

cd ${ROOT}/$folder_name/

exit 0