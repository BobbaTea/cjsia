
server {
    root /var/www/abobba/access;
    index index.html index.php index.htm index.nginx-debian.html;
    server_name access.abobba.com;
    location / {
            try_files $uri $uri/ =404;
    }
    location /static/ {
            alias /var/www/abobba/static/;
    }
    location ~ \.php$ {
            include snippets/fastcgi-php.conf;
            fastcgi_pass unix:/run/php/php7.0-fpm.sock;
    }
    location ~ /\.ht {
            deny all;
    }
    location ~ /\.{
            deny all;
            return 404;
    }
listen [::]:443 ssl ipv6only=on; # managed by Certbot
listen 443 ssl; # managed by Certbot
ssl_certificate /etc/letsencrypt/live/abobba.com/fullchain.pem; # managed by Certbot
ssl_certificate_key /etc/letsencrypt/live/abobba.com/privkey.pem; # managed by Certbot
include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
if ($host = access.abobba.com) {
    return 301 https://$host$request_uri;
} 
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name access.abobba.com;
return 404; 
}