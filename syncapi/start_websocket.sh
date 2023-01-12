#!/bin/bash

service apache2 restart
php artisan websockets:serve --port=6001

# while [ 1 -le 10 ]
# do
#     sleep 1
# done