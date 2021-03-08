// services
weatherApp.service("cityService", function () {
  this.city = "Austin, Texas";
});

weatherApp.service("weatherService", [
  "$resource",
  function ($resource) {
    this.GetWeather = function (city, days, key) {
      // defining the API url as the resource
      let weatherAPI = $resource(
        "https://api.openweathermap.org/data/2.5/forecast",
        { callback: "JSON_CALLBACK" },
        { get: { method: "JSONP" } }
      );

      // grabbing the data from the resource with additional parameters
      return weatherAPI.get({
        q: city,
        cnt: days,
        appid: key,
      });
    };
  },
]);
