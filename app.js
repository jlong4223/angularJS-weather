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
  this.city = "New York, NY";
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
  function ($scope, cityService) {
    $scope.city = cityService.city;
  },
]);
