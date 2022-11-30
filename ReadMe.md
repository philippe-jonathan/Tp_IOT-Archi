## Documentation
View documentation and all information in notion : https://hallowed-timimus-dfc.notion.site/Airlux-30a742c5c98c49b1b371ed8b0b422972


## SET UP :
```
# clone repo (uwu)
cd docker
docker compose build
docker compose up

# start mosquitto broker
docker exec -ti brokermosq mosquitto -c /mosquitto/config/mosquitto.conf
```

## Integration checklist
- [x] pulsor (nodejs) : need to push to mosquitto and not redis
- [x] brokermosq (mosquitto)
- [ ] websocket (nodejs)
- [x] dblocal (redis)
- [x] syncapp (laravel) : remove direct connection to redis since websocket connect trought socket
- [x] dbcloud (mysql)
- [ ] validator (nodejs)
- [ ] dbstat (prometheus)
- [ ] statapp (grafana)
- [ ] phoneapp (flutter)


## To do
- Confirm services name and rename folders, dockerfiles, services (compose)
- Set up a post merging process (with tech lead (maybe PO ?))


## Assignment
- Dang - websocket
- Jonathan/Loup - validator
- Benoît/Artus - Prometheus/Grafana integration
- Aymeric - sick last session
