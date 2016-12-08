#!/bin/bash

DOMAIN=$1;

if [ ! -z "$DOMAIN" ]; then
    echo -e "create domain $DOMAIN"

sudo bash <<EOF
echo -e "" >> /private/etc/hosts
#
echo -e "127.0.0.1       $DOMAIN" >> /private/etc/hosts
echo -e "::1             $DOMAIN" >> /private/etc/hosts
echo -e "" >> /private/etc/hosts
EOF

if [ ! -f "/usr/local/etc/nginx/sites-available/$DOMAIN" ]; then
cat <<EOT >> /usr/local/etc/nginx/sites-available/$DOMAIN
server {
    listen          80;
    server_name     $DOMAIN www.$DOMAIN;
    
    root            /Users/edik/web/$DOMAIN/public_html;
    index           index.php index.html index.htm;

    access_log      off;
    error_log       /Users/edik/web/$DOMAIN/logs/error.log error;

    charset         utf-8;
    
    location ~* \.(jpe?g|gif|png|zip|tgz|gz|rar|bz2|doc|xls|exe|pdf|ppt|txt|tar|wav|bmp|rtf|html|css|js|ico|woff|woff2|eot|svg|ttf)$ {
        expires 30d;
    }

    location /ajax {
        rewrite ^ /ajax/index.php last;
    }

    location /api {
        rewrite ^ /api/index.php last;
    }

    location /cp {
        rewrite ^ /index.php last;
    }

    location /cp/db {
        rewrite ^ /index.php last;
    }

    location /cp/dumper {
        rewrite ^ /index.php last;
    }
    
    location / {
        include /usr/local/etc/nginx/conf.d/php-fpm;
        rewrite ^ /index.php last;
    }

    location ~ \.php$ {
        include /usr/local/etc/nginx/conf.d/php-fpm;
        rewrite ^(.*)$ /index.php;
        root   /Users/edik/web/$DOMAIN/public_html;
        break;
    }
    
    location ~ \.htm(l?)$ {
        fastcgi_param  SCRIPT_FILENAME  /Users/edik/web/$DOMAIN/\$fastcgi_script_name;
        include fastcgi_params;

        if (!-f \$request_filename) {
            rewrite  ^ /index.php  last;
        }

        if (-f /Users/edik/web/$DOMAIN/.parse_html) {
            fastcgi_pass   127.0.0.1:9000;
        }

        break;
    }
    
    location ~ /\.ht {
       deny all;
    }
}
EOT
fi

# cat <<EOT >> /private/etc/apache2/users/$DOMAIN.conf
# <VirtualHost *:80>
#     ServerName $DOMAIN
#     ServerAlias www.$DOMAIN
#     DirectoryIndex index.php
#     DocumentRoot /Users/edik/web/$DOMAIN/public_html
#     ErrorLog /Users/edik/web/$DOMAIN/logs/error.log 
#     CustomLog /Users/edik/web/$DOMAIN/logs/access.log common

#     <Directory "/Users/edik/web/$DOMAIN/public_html">
#         Options All
#         AllowOverride All
#         Require all granted
#     </Directory>
# </VirtualHost>
# EOT

if [ ! -f "/usr/local/etc/nginx/sites-enabled/$DOMAIN" ]; then
    ln -sfv /usr/local/etc/nginx/sites-available/$DOMAIN /usr/local/etc/nginx/sites-enabled/$DOMAIN
fi

sudo launchctl unload /Library/LaunchDaemons/homebrew.mxcl.nginx.plist
sudo launchctl load /Library/LaunchDaemons/homebrew.mxcl.nginx.plist

/Users/edik/web/skeleton/.install.sh $DOMAIN

# sudo apachectl restart
dscacheutil -flushcache

else
    echo -e "enter a domain name"
fi

# exit 0