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
    listen       80;
    server_name $DOMAIN www.$DOMAIN;
    root /Users/edik/web/$DOMAIN/public_html;
 
    error_log /Users/edik/web/$DOMAIN/logs/error.log;
    access_log  /Users/edik/web/$DOMAIN/logs/access.log main;

    location / {
        include   /usr/local/etc/nginx/conf.d/php-fpm;
    }
}
EOT

if [ ! -f "/usr/local/etc/nginx/sites-available/$DOMAIN" ]; then
    ln -s /usr/local/etc/nginx/sites-available/$DOMAIN /usr/local/etc/nginx/sites-enabled
fi

sudo launchctl unload /Library/LaunchDaemons/homebrew.mxcl.nginx.plist
sudo launchctl load /Library/LaunchDaemons/homebrew.mxcl.nginx.plist

exit 0