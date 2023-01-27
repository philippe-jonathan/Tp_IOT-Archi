#!/bin/bash
sed -i 's/#auto eth0\n#iface eth0 inet dhcp/auto eth0\niface eth0 inet dhcp/g' /etc/network/interfaces
sed -i 's/127.0.0.1/0.0.0.0/g' /etc/redis/redis.conf
ufw allow 6379
