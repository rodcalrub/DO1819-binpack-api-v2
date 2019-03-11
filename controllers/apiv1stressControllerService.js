'use strict'
const v8 = require('v8');

function generateRandomBins(nBins, maxWidth, maxHeight){

  var nB = nBins || 300;
  var mW = maxWidth || 300;
  var mH = maxHeight || 200;

  var randomBins = [];
  for(let i=0; i<nB;i++){
    var bin = {
      width: Math.floor((Math.random() * mW) + 1),
      height: Math.floor((Math.random() * mH) + 1)
    };
    randomBins.push(bin);
  }
  return randomBins;
}


module.exports.getStress = function getStress(req, res, next) {
  var pack = require('bin-pack');

  //-----------------TOTAL TIME INIT------------//
  //Memoria inicial utilizada al arrancar el sistema
  var initialMemUsed = process.memoryUsage().heapUsed / 1024 / 1024;

  //Tiempo inicial
  var totalBeginHR = process.hrtime();
  var totalBegin = totalBeginHR[0] * 1000000 + totalBeginHR[1] / 1000;

  //Recogemos los valores de la petición
  var nBins = req.nBins.value;
  var maxWidth = req.maxWidth.value;
  var maxHeight = req.maxHeight.value;

  //Datos del proceso. v8 es de node y nos da esa información
  var heapStats = v8.getHeapStatistics();

  // Round stats to MB
  var roundedHeapStats = Object.getOwnPropertyNames(heapStats).reduce(function (map, stat) {
    map[stat] = Math.round((heapStats[stat] / 1024 / 1024) * 1000) / 1000;
    return map;
  }, {});

    var results = {
      problem: "Bin Pack Problem",
      parameters:[
        {id: "nBins", value: nBins },
        {id: "maxWidth", value: maxWidth },
        {id: "maxHeight", value: maxHeight }
      ],
      info:{
        initialMemory:Math.round((initialMemUsed) * 1000) / 1000,
        heapStats:roundedHeapStats
      },
      result:{
        stages:[
          {
            id: "ProblemGeneration",
            duration: -1,
            memory: -1
          },
          {
            id: "ProblemSolving",
            duration: -1,
            memory: -1
          }
        ],
        total:{
          duration:0,
          memory:0
        }
      }
    }

    //-----------------GENERATE PROBLEM ----------------//

    var beginHR = process.hrtime()
    var begin = beginHR[0] * 1000000 + beginHR[1] / 1000;
    
    var randomBins = generateRandomBins(nBins, maxWidth, maxHeight);

    var endHR = process.hrtime()
    var end = endHR[0] * 1000000 + endHR[1] / 1000;
    var duration = (end - begin) / 1000;
    var roundedDuration = Math.round(duration * 1000) / 1000;

    //Generate Problem Duration
    results.result.stages[0].duration = roundedDuration;

    //Generate Problem Memory
    const genMemUsed = process.memoryUsage().heapUsed / 1024 / 1024;

    results.result.stages[0].memory = Math.round((genMemUsed - initialMemUsed) * 1000) / 1000;


    //-----------------SOLVING PROBLEM-----------------//
    var beginHR = process.hrtime()
    var begin = beginHR[0] * 1000000 + beginHR[1] / 1000;

    //Resolve problem
    var binPackSolution = pack(randomBins);

    var endHR = process.hrtime()
    var end = endHR[0] * 1000000 + endHR[1] / 1000;
    var duration = (end - begin) / 1000;
    var roundedDuration = Math.round(duration * 1000) / 1000;
    
    //Solving Problem Duration
    results.result.stages[1].duration = roundedDuration;
    
    var finalMemUsed = process.memoryUsage().heapUsed / 1024 / 1024;
    
    //Solving Problem Memory    
    results.result.stages[1].memory = Math.round((finalMemUsed - genMemUsed) * 1000) / 1000;


    //-----------------TOTAL TIME END------------//

    var totalEndHR = process.hrtime()
    var totalEnd = totalEndHR[0] * 1000000 + totalEndHR[1] / 1000;
    var totalDuration = (totalEnd - totalBegin) / 1000;
    var roundedDuration = Math.round(totalDuration * 1000) / 1000;
    
    results.result.total.duration = roundedDuration;
    results.result.total.memory = Math.round((finalMemUsed - initialMemUsed) * 1000) / 1000;;
    

    res.send(results);
};

module.exports.getStressInfo = function getStressInfo(req, res, next) {
  var os = require('os-utils');
  var si = require('systeminformation');

  si.cpu(function (cpuInfo) {
    si.mem(function (memInfo) {

      // Round mem stats to MB
      var roundedMemInfo = Object.getOwnPropertyNames(memInfo).reduce(function (map, stat) {
        map[stat] = Math.round((memInfo[stat] / 1024 / 1024) * 1000) / 1000;
        return map;
      }, {});

      var p = os.platform();

      os.cpuUsage(function (cpuUsage) {

        os.cpuFree(function (cpuFree) {

          res.send({
            "cpuUsage": cpuUsage,
            "cpuFree": cpuFree,
            "cpuCount": os.cpuCount(),
            "memInfo": roundedMemInfo,
            "freemem": Math.round((os.freemem() * 1000)) / 1000,
            "totalmem": Math.round((os.totalmem() * 1000)) / 1000,
            "freememPercentage": os.freememPercentage(),
            "cpuInfo": cpuInfo,
            "sysUptime": os.sysUptime(),
            "processUptime": os.processUptime(),
            "loadavgLast1Minute": os.loadavg(1),
            "loadavgLast5Minutes": os.loadavg(5),
            "loadavgLast15Minutes": os.loadavg(15),
            "platform": os.platform()
          });


        });
      });


    });
  });
};