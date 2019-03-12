'use strict'
var pack = require('bin-pack');

module.exports.newProblem = function newProblem(req, res, next) {

  console.log(Date()+ ": New POST request to /api/v1/problems");

  var id = req.problem.value.id;
  var bins = req.problem.value.problem.bins;

  if(!bins){
    res.send({message:"You must insert some bins",code:422});//Unprocesable Entity
    console.log(Date()+ ": You must insert some bins. ")
  }else{
    //Create the response schema
    var results = {
      id: id,
      problem:{
        bins: bins
      },
      solution:{
        width:0,
        height:0
      },
      stats:{
        solvingTime: 0
      }
    };

    //Start to monitorize the time
    var beginHR = process.hrtime()
    var begin = beginHR[0] * 1000000 + beginHR[1] / 1000;

    //Execute the algorithm
    var solution = pack(bins);

    //End to monitorize the time
    var endHR = process.hrtime()
    var end = endHR[0] * 1000000 + endHR[1] / 1000;

    //Calculate final time of execution (in ms)
    var solutionSolvingTime = (end - begin) / 1000;
    results.solution.stats.solvingTime = solutionSolvingTime;

    results.solution.width = solution.width;
    results.solution.height = solution.height;

    //Send the resutls
    res.status(200).send(results);
  }

  
};