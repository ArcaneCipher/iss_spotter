const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss.js');

const googleIPv4 = "142.251.46.174";
// const googleIPv6 = "2607:f8b0:4005:802::200e";

/* fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
}); */

fetchCoordsByIP(googleIPv4, (error, coordinates) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned coordinates:' , coordinates);
});