## Documentation
View documentation and all information in notion : https://hallowed-timimus-dfc.notion.site/Airlux-30a742c5c98c49b1b371ed8b0b422972


## SET UP :
```
# clone repo (uwu)
cd docker
docker compose build

# On one side
docker compose up localapp

# On another
docker compose up pulsor1 pulsor2 pulsor3
# Just ctrl-c to stop pulsors and up again to restart
```

## Integration checklist
- [x] pulsor (nodejs) : need to push to mosquitto and not redis
- [x] broker (mosquitto)
- [x] localapp (nodejs)
- [x] dblocal (redis)
- [x] syncapi (laravel) : remove direct connection to redis since websocket connect trought socket
- [x] dbcloud (mysql)
- [ ] validator (nodejs)
- [ ] dbstats (prometheus)
- [ ] statsapp (grafana)
- [ ] phoneapp (flutter)


## To do
- Confirm services name and rename folders, dockerfiles, services (compose)
- Set up a post merging process (with tech lead (maybe PO ?))


## Assignment
- Dang/Aymeric - websocket
- Jonathan/Loup - validator
- Benoît - Prometheus/Grafana integration
- Artus - sick
