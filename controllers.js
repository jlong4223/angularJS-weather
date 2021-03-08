// controllers
weatherApp.controller("homeController", [
  "$scope",
  "cityService",
  function ($scope, cityService) {
    $scope.city = cityService.city;
    $scope.$watch("city", function () {
      cityService.city = $scope.city;
    });
  },
]);

weatherApp.controller("forecastController", [
  "$scope",
  "cityService",
  "$resource",
  "$routeParams",
  function ($scope, cityService, $resource, $routeParams) {
    $scope.city = cityService.city;

    // TODO have a ng-model that allows user to select day as well
    $scope.days = $routeParams.days || "2";

    // defining the API url as the resource
    $scope.weatherAPI = $resource(
      "http://api.openweathermap.org/data/2.5/forecast",
      { callback: "JSON_CALLBACK" },
      { get: { method: "JSONP" } }
    );

    // grabbing the data from the resource with additional parameters
    $scope.weatherResult = $scope.weatherAPI.get({
      q: $scope.city,
      cnt: $scope.days,
      appid: "5b3c5a41e420b342a7d2e498f5e3fd82",
    });

    $scope.convertToF = function (degK) {
      return Math.round((degK - 273) * 1.8 + 32);
    };

    $scope.convertToDate = function (dt) {
      return new Date(dt * 1000);
    };

    console.log($scope.weatherResult);
  },
]);

// api http://api.openweathermap.org/data/2.5/forecast?q=London,us&cnt=2&appid=5b3c5a41e420b342a7d2e498f5e3fd82
