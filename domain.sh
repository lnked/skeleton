#!/bin/bash

DOMAIN=$1;

FILE=/usr/local/etc/nginx/sites-enabled/$DOMAIN;

sudo bash <<EOF
echo -e "" >> /private/etc/hosts
echo -e "127.0.0.1       $DOMAIN" >> /private/etc/hosts
echo -e "::1             $DOMAIN" >> /private/etc/hosts
echo -e "" >> /private/etc/hosts
EOF

cat <<EOT >> /usr/local/etc/nginx/sites-available/$DOMAIN
server {
    listen          80;
    index           index.html index.htm index.php;
    server_name     $DOMAIN www.$DOMAIN;
    root            /Users/edik/web/$DOMAIN/public_html;
    
    #
    error_log       /Users/edik/web/$DOMAIN/logs/error.log;
    access_log      /Users/edik/web/$DOMAIN/logs/access.log main;

    location ~* \.(css|js|png|ico|jpe?g|gif|woff|eot|svg|ttf|txt)$ {
        expires 30d;
    }

    location / {
        rewrite ^(.*)$ /index.php;
        include   /usr/local/etc/nginx/conf.d/php-fpm;
    }

    location ~* \.(htm|html)$ {}

    location = /favicon.ico {
        log_not_found off;
        access_log off;
    }

    location = /robots.txt {
        allow all;
        log_not_found off;
        access_log off;
    }

    ## Disable viewing .htaccess & .htpassword
    location ~ /\.ht {
        deny  all;
    }
}
}
EOT

if [ ! -f "/usr/local/etc/nginx/sites-available/$DOMAIN" ]; then
    ln -s /usr/local/etc/nginx/sites-available/$DOMAIN /usr/local/etc/nginx/sites-enabled
fi

sudo launchctl unload /Library/LaunchDaemons/homebrew.mxcl.nginx.plist
sudo launchctl load /Library/LaunchDaemons/homebrew.mxcl.nginx.plist

./install.sh $DOMAIN

exit 0