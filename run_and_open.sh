docker-compose up -d MongoDBHotel SQLServerSecurity

sleep 20

docker-compose up -d hotel security gateway web

sleep 10

start https://localhost:4200