const { nextISSTimesForMyLocation } = require("./iss_promised");
const { printPassTimes } = require('./printPassTimes.js');

// Call 
nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });