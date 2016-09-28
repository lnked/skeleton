#!/bin/bash

DOMAIN=$1;

sudo bash <<EOF
echo -e "" >> /private/etc/hosts
#
echo -e "127.0.0.1       $DOMAIN" >> /private/etc/hosts
echo -e "::1             $DOMAIN" >> /private/etc/hosts
echo -e "" >> /private/etc/hosts
EOF

cat <<EOT >> /usr/local/etc/nginx/sites-available/$DOMAIN
server {
    listen          80 default;
    server_name     $DOMAIN www.$DOMAIN;
    
    root            /Users/edik/web/$DOMAIN/public_html;
    index           index.php index.html index.htm;

    access_log      off;
    error_log       /Users/edik/web/$DOMAIN/logs/error.log error;

    # location ~* \.(css|js|png|ico|jpe?g|gif|woff|eot|svg|ttf|txt)$ {
    #     expires 30d;
    # }

    # location / {
    #     include /usr/local/etc/nginx/conf.d/php-fpm;
    #     rewrite ^(.*)$ /index.php;
    # }

    location / {
        if (!-d /Users/edik/web/$DOMAIN/public_html) {
            rewrite ^ /index.php last;
        }

        # начало rewrite
        set $rflag 1;   # так как логического объединения в условных выражениях нет, то вводим переменную для сложения двух условий. flag указывает на необходимость сделать переадресацию
        if (-e $request_filename) { # если есть запрошенный файл, то переадресация не нужна
            set $rflag 0;
        }

        if (!-f /Users/edik/web/$DOMAIN/public_html/index.php) { # если нет index.php в корне сайта, то переадресация тоже не нужна, ибо некуда
            set $rflag 0;
        }

        if ($rflag = 1) {  #
            rewrite  ^ /index.php  last;
        }
        # конец rewrite

        if (-f $request_filename) { # для статических файлов включаем кэш на час
            expires  1h;
            break;
        }
    }

    location ~ \.php$ { # этот блок сработает при запросе .php файлов
        include /usr/local/etc/nginx/conf.d/php-fpm;
        root   /Users/edik/web/$DOMAIN/public_html;
        fastcgi_pass   127.0.0.1:9000; # тут висит php-fpm
        fastcgi_index  index.php;
        fastcgi_param  SCRIPT_FILENAME  /Users/edik/web/$DOMAIN/$fastcgi_script_name;
        include fastcgi_params;
        break;
    }

    location ~ \.htm(l?)$ { # этот блок работает при вызове .html или .htm
        # если в корне сайта лежит файл «.parse_html», то обрабатываем HTML как PHP
        fastcgi_param  SCRIPT_FILENAME  /Users/edik/web/$DOMAIN/$fastcgi_script_name;
        include fastcgi_params;
        if (!-f $request_filename) { # даже если запросили .html, это не значит что он у нас есть
            # соотвественно, если файла нет, то тоже делаем rewrite
            rewrite  ^ /index.php  last;
        }
        if (-f /Users/edik/web/$DOMAIN/.parse_html) { # проверяем на наличие метки
            # если в директории сайта лежит ключевой файлик, то все html обрабатываем как php
            fastcgi_pass   127.0.0.1:9000;
        }
        break;
    }

    location ~ /\.ht {
       deny  all;
    }
}
EOT

if [!-f "/usr/local/etc/nginx/sites-enabled/$DOMAIN"]; then
    ln -sfv /usr/local/etc/nginx/sites-available/$DOMAIN /usr/local/etc/nginx/sites-enabled/$DOMAIN
fi

sudo launchctl unload /Library/LaunchDaemons/homebrew.mxcl.nginx.plist
sudo launchctl load /Library/LaunchDaemons/homebrew.mxcl.nginx.plist

./install.sh $DOMAIN

sudo apachectl restart
dscacheutil -flushcache

exit 0