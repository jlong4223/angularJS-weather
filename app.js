// module
let weatherApp = angular.module("weatherApp", ["ngRoute", "ngResource"]);

// routes
weatherApp.config(function ($routeProvider) {
  $routeProvider

    .when("/", {
      templateUrl: "pages/home.htm",
      controller: "homeController",
    })

    .when("/forecast", {
      templateUrl: "pages/forecast.htm",
      controller: "forecastController",
    });
});

// services
weatherApp.service("cityService", function () {
  this.city = "New York";
  this.state = "NY";
});

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
  function ($scope, cityService, $resource) {
    $scope.city = cityService.city;
    // TODO add state here and add an ng-model

    // defining the API url as the resource
    $scope.weatherAPI = $resource(
      "http://api.openweathermap.org/data/2.5/forecast",
      { callback: "JSON_CALLBACK" },
      { get: { method: "JSONP" } }
    );

    // grabbing the data from the resource with additional parameters
    $scope.weatherResult = $scope.weatherAPI.get({
      //   TODO fix to allow typing in state code (+ ', ' + $scope.state,?)
      q: $scope.city,
      cnt: 2,
      appid: "5b3c5a41e420b342a7d2e498f5e3fd82",
    });

    console.log($scope.weatherResult);
  },
]);

// api http://api.openweathermap.org/data/2.5/forecast/daily?APPID=5b3c5a41e420b342a7d2e498f5e3fd82
