# BIN-PACK-API

## Overview
This is a Bin-Pack API for stress analysis and benchmarking. 

This server was generated with [oas-generator](https://github.com/isa-group/oas-generator); bin-pack algorithm is taken from [npmjs](https://www.npmjs.com/package/bin-pack).

There is a **on-line demo** deployment available at: https://do1819-bin-pack-api.herokuapp.com/


### Running the API using docker

If you have docker, you can use it out of the box: `docker run -p 12345:80 -d sojerdev/bin-pack-api` to run the container at port `12345`


### Running the API using node

To run the server, just use:

```
npm install 
npm start
```

Then, if running in localhost, you can check the swagger UI doc portal in: `http://localhost:8080/`

### Using the API

#### Stress request

In order to send a request, either GET or POST can be used:

- `GET /api/v1/stress/10000/150/150` would generate and solve a bin-pack problem with 10000 bins (each of them with a random width up to 150 and random height up to 150).

#### Bin-pack problem solving

In order to solve a given bin-pack problem you should send a POST to `/api/v1/problems` endpoint: 

`POST /api/v1/problems`
```json
{
  "id": "BinPackProblem",
  "problem": {
    "bins": [
      {
        "width": 0,
        "height": 0
      }
    ]
  }
}
```
will get: 
```json
{
  "id": "BinPackProblem",
  "problem": {
    "bins": [
      {
        "width": 0,
        "height": 0
      }
    ]
  },
  "solution": {
    "bins": [
      {
        "width": 0,
        "height": 0
      }
    ]
  },
  "stats": {
    "solvingTime": 0
  }
}
```
