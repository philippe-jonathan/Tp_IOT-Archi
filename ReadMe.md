## Objective
- One stack with two containers : 1-NGINX / 2-Redis
- Get data in Redis database with NGINX

## Problem
- Running on http://localhost:7071
Error: connect ECONNREFUSED 127.0.0.1:6379
    at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1300:16) {
  errno: -111,
  code: 'ECONNREFUSED',
  syscall: 'connect',
  address: '127.0.0.1',
  port: 6379
}

## Run docker compose
- In root project : docker-compose up
