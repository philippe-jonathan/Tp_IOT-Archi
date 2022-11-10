#!/bin/bash

redis-server /etc/redis/redis.conf
redis-cli -h redis
CONFIG SET protected-mode no
CONFIG SET notify-keyspace-events KEA

while [ 1 -le 10 ]
do
    sleep 1
done