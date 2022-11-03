#!/bin/bash

sed -i 's/#auto eth0\n#iface eth0 inet dhcp/auto eth0\niface eth0 inet dhcp/g' /etc/network/interfaces
sed -i 's/127.0.0.1/0.0.0.0/g' /etc/mysql/mysql.conf.d/mysqld.cnf
update-rc.d mysql defaults
service mysql start
ufw allow 3306
mysql -uroot -e "CREATE SCHEMA AirLuxDB character set utf8mb4 collate utf8mb4_bin; CREATE TABLE AirLuxDB.captors (uid VARCHAR(255) NOT NULL, captor_id VARCHAR(255) NOT NULL, value VARCHAR(255), updated_at DATE, created_at DATE, UNIQUE INDEX id_UNIQUE (uid ASC));"
mysql -uroot -e "CREATE USER 'root'@'syncapi.docker_iotnetwork' IDENTIFIED BY 'password'; GRANT ALL PRIVILEGES ON *.* TO 'root'@'syncapi.docker_iotnetwork' WITH GRANT OPTION; CREATE USER 'root'@'%' IDENTIFIED BY 'password'; GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;"