## Documentation
POC : mosquitto + nodejs

HOW TO RUN :
```
# clone repo (uwu)
cd docker
docker compose build
docker compose run

# run mosquitto broker
docker exec -ti brokermosq mosquitto -c /mosquitto/config/mosquitto.conf

# subscribe with node app
docker exec -ti pubsubjs node sub.js

# publish with node app
docker exec -ti pubsubjs node pub.js
```