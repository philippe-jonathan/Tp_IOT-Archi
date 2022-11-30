#!/bin/bash

#cp /var/www/sync-api/.env.example .env
source /etc/apache2/envvars
/usr/sbin/apache2 -V
/etc/init.d/apache2 start


apt-get install pecl install redis; \
    docker-php-ext-enable redis


su user
export COMPOSER_HOME="$HOME/.config/composer";
cd /var/www/
composer install
composer require predis/predis
#docker system prune -agit clone https://github.com/phpredis/phpredis.git
###cd phpredis
#phpize
#./configure
make && make install
#cd ..

php artisan optimize
composer dump-autoload
php artisan key:generate
#php artisan redis:suscribe
