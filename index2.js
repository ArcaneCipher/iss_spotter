const { nextISSTimesForMyLocation } = require("./iss_promised");
const { printPassTimes } = require('./printPassTimes.js');

//Using async call
(async () => {
  try {
    const passTimes = await nextISSTimesForMyLocation();
    printPassTimes(passTimes);
  } catch (error) {
    console.log("It didn't work: ", error.message);
  }
})();

// Call 
/* nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  }); */