const needle = require("needle");

/**
 * Requests user's ip address from https://www.ipify.org/
 * Input: None
 * Returns: Promise of request for ip data, returned as JSON string
 */
const fetchMyIP = function () {
  return needle("get", "https://api.ipify.org?format=json").then((response) => {
    // Check for HTTP errors
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${response.body}`;
      throw new Error(msg);
    }
    const ip = response.body.ip; // retrieve the ip from the body value from the response object
    if (!ip) {
      throw new Error("Invalid IP address in response");
    }
    return ip;
  });
};

/**
 * Makes a request to ipwho.is using the provided IP address to get its geographical information (latitude/longitude)
 * Input: IP address as a string
 * Returns: Promise of request for lat/lon
 */
const fetchCoordsByIP = function (ip) {
  return needle("get", `https://ipwho.is/${ip}`).then((response) => {
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${response.body}`;
      throw new Error(msg);
    }

    const body = response.body; //retrieve body from response

    // Check if the API returned a successful response
    if (!body.success) {
      const message = `Server returned error. Message: ${body.message} when fetching for IP ${body.ip}`;
      throw new Error(message);
    }

    const { latitude, longitude } = body; // Destructure latitude and longitude from body

    if (latitude === undefined || longitude === undefined) {
      throw new Error("Invalid coordinates in response");
    }

    return { latitude, longitude };
  });
};

/**
 * Requests data from https://iss-flyover.herokuapp.com using provided lat/long data
 * Input: Body containing geo data response from ipwho.is
 * Returns: Promise of request for fly over data, returned as JSON string
 */
const fetchISSFlyOverTimes = function (coords) {
  const { latitude, longitude } = coords; // Destructure latitude and longitude from coords
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;

  return needle("get", url).then((response) => {
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS flyover times. Response: ${response.body}`;
      throw new Error(msg);
    }

    const body = response.body;

    // Check if the API returned a successful response
    if (body.message !== 'success') {
      const message = `Server returned error. Message: ${body.message}`;
      throw new Error(message);
    }

    const passTimes = body.response;  // changed the name from response to passtimes for clarification
    if (!passTimes) {
      throw new Error('Invalid pass times in response');
    }

    return passTimes;
  });
};

/**
 * Input: None
 * Returns: Promise for fly over data for users location
 */
// Using async version
const nextISSTimesForMyLocation = async function() {
  try {
    const ip = await fetchMyIP();
    const coords = await fetchCoordsByIP(ip);
    const passTimes = await fetchISSFlyOverTimes(coords);
    return passTimes;
  } catch (error) {
    throw error;
  }
};



/* const nextISSTimesForMyLocation = function () {
  return fetchMyIP()
    .then((ip) => fetchCoordsByIP(ip))
    .then((coords) => fetchISSFlyOverTimes(coords))
}; */

module.exports = { nextISSTimesForMyLocation };
