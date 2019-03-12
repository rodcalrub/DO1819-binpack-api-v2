# BIN-PACK-API

## Behaviour
In the bin packing problem, objects of different volumes must be packed into a finite number of bins or containers each of volume V in a way that minimizes the number of bins used. [See more](https://en.wikipedia.org/wiki/Bin_packing_problem)

The follow image represent the problem:
![alt text](https://i.stack.imgur.com/1bLta.png)

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

#### Stress Info Request

- `GET /api/v1/stress/info` Endpoint that returns the performance info about system status

You will get something similar to this according to your system:
```json
{
  "cpuUsage": 0.058633138304494015,
  "cpuFree": 0.9551193899237405,
  "cpuCount": 8,
  "memInfo": {
    "total": 16271.301,
    "free": 8018.117,
    "used": 8253.184,
    "active": 8253.184,
    "available": 8018.117,
    "buffcache": 0,
    "swaptotal": 2432,
    "swapused": 31,
    "swapfree": 2401
  },
  "freemem": 8017.984,
  "totalmem": 16271.301,
  "freememPercentage": 0.4927684936068178,
  "cpuInfo": {
    "manufacturer": "Intel®",
    "brand": "Core™ i7-8565U",
    "vendor": "GenuineIntel",
    "family": "6",
    "model": "142",
    "stepping": "11",
    "revision": "",
    "voltage": "",
    "speed": "1.80",
    "speedmin": "",
    "speedmax": "1.99",
    "cores": 8,
    "physicalCores": 4,
    "processors": 1,
    "socket": "BGA1528",
    "cache": {
      "l1d": 0,
      "l1i": 0,
      "l2": 1048576,
      "l3": 8388608
    }
  },
  "sysUptime": 683490,
  "processUptime": 2073.671,
  "loadavgLast1Minute": 0,
  "loadavgLast5Minutes": 0,
  "loadavgLast15Minutes": 0,
  "platform": "win32"
}
```
