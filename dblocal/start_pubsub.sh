#!/bin/bash

redis-server
#/etc/init.d/redis-server stop
#chmod a+rwx /var/log/redis/redis-server.log
#/etc/init.d/redis-server start /etc/redis/redis.conf
redis-cli -x CONFIG SET protected-mode no
#redis-cli -x CONFIG SET notify-keyspace-events KEA

while [ 1 -le 10 ]
do
    sleep 1
done