## Documentation
POC : prometheus + grafana + mysql

HOW TO RUN :
```
# clone repo (uwu)
docker compose up

# TO OPEN GRAFANA
# go to localhost:3000
#   -   user = admin
#   -   pass = secret

# TO ADD A DATA SOURCE
# go to configuration - data sources
# clic Add data source, select Prometheus
#   -   url = http://host.docker.internal:9090
#   -   Prometheus type = Prometheus
#   -   Prometheus version = 2.40.x (or check at localhost:9090)

# TO ADD A DASHBOARD :
# Select dashboard - import
# choose a Json from grafana folder or find an ID on grafana.com
```