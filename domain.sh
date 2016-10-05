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
    listen          80;
    server_name     $DOMAIN www.$DOMAIN;
    
    root            /Users/edik/web/$DOMAIN/public_html;
    index           index.php index.html index.htm;

    access_log      off;
    error_log       /Users/edik/web/$DOMAIN/logs/error.log error;

    location ~ /\.ht {
       deny  all;
    }
    
    # Match assets
    location ~* \.(jpe?g|gif|png|zip|tgz|gz|rar|bz2|doc|xls|exe|pdf|ppt|txt|tar|wav|bmp|rtf|html|css|js|ico|woff|woff2|eot|svg|ttf)$ {
        expires 30d;
    }
    
    location ~ \.htm(l?)$ {
        fastcgi_param  SCRIPT_FILENAME  /Users/edik/web/$DOMAIN/$fastcgi_script_name;
        include fastcgi_params;
        if (!-f $request_filename) {
            rewrite  ^ /index.php  last;
        }
        if (-f /Users/edik/web/$DOMAIN/.parse_html) {
            fastcgi_pass   127.0.0.1:9000;
        }
        break;
    }

    location ~ \.php$ {
        include /usr/local/etc/nginx/conf.d/php-fpm;
        rewrite ^(.*)$ /index.php;
        root   /Users/edik/web/$DOMAIN/public_html;
        break;
    }

    location /cp {
        rewrite ^ /cp/index.php last;
    }

    location / {
        if (!-d /Users/edik/web/$DOMAIN/public_html) {
            rewrite ^ /index.php last;
        }
    
        set $rflag 1;
        if (-e $request_filename) {
            set $rflag 0;
        }

        if (!-f /Users/edik/web/$DOMAIN/public_html/index.php) {
            set $rflag 0;
        }

        if ($rflag = 1) {
            rewrite  ^ /index.php  last;
        }

        if (-f $request_filename) {
            expires  1h;
            break;
        }
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