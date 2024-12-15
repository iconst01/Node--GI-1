const request = require("request");

const forecast = (latitude, longitude, callback, units) => {
  const url =
    "https://api.weatherstack.com/current?access_key=66f8d3bfe07cc846754d31ce437dc866&query=" +
    latitude +
    "," +
    longitude +
    "&units=f" +
    +units;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const unitSymbol = units === "m" ? "°C" : units === "s" ? "°F" : "°F";
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". It is currently " +
          body.current.temperature +
          "°F. It feels like " +
          body.current.feelslike +
          "°F."
      );
    }
  });
};

module.exports = forecast;
