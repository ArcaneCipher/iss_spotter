const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss.js');
const { fetchISSFlyOverTimes } = require('./iss.js');

const googleIPv4 = "142.251.46.174";
const coords = { latitude: 37.3860517, longitude: -122.0838511 };

/* fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
}); */

/* fetchCoordsByIP(googleIPv4, (error, coordinates) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned coordinates:' , coordinates);
}); */

fetchISSFlyOverTimes(coords, (error, issPassOverTimes) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned coordinates:' , issPassOverTimes);
});