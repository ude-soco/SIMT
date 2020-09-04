# Semantic Interest Miner Backend

This is the backend of the Semantic Interest Miner web application.

## Before running the application:

Please download word embedding model[(GloVe)](https://drive.google.com/file/d/1FfQgEjR6q1NyFsD_-kOdBCHMXB2QmNxN/view?usp=sharing) 

Please put the model file in the root directory of this folder.




## Steps to run application using docker:

Install docker https://docs.docker.com/get-docker/

Steps to run using docker-compose for the first time

```
docker-compose --compatibility up --build
```


for subsequent runs

to start the server run `docker-compose up`

to stop the server run `docker-compose down`