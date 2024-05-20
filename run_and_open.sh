#!/bin/bash

# Ejecutar Docker Compose
docker-compose up -d

# Esperar un momento para asegurarse de que los servicios estén en funcionamiento
sleep 5

# Abrir el navegador web en localhost:4200
start http://localhost:4200