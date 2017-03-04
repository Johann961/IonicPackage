var filmApp = angular.module('filmApp', ['ionic', 'ngRoute', 'ngSanitize'])
.run(function($ionicPlatform, $rootScope, $location) {
  $rootScope.goHome = function(){
    $location.path('/films')
  }

  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  })

});

filmApp.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/films',{
      controller: 'listController',
      templateUrl: 'partials/films.html'
    })
    .when('/detail/:id',{
      controller: 'detailController',
      templateUrl: 'partials/detail.html'
    })
    .otherwise({
      redirectTo: '/films'
    });
}]);

filmApp.controller('listController',['$scope', '$http', function($scope, $http){
  $scope.loadFilms = function(){
    $http.get("http://swapi.co/api/films/")
    .success(function(response){
      console.log(response);

      $scope.films = response.results;
    });
  }
  $scope.loadFilms();
}]);

filmApp.controller('detailController',['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
    $http.get("http://swapi.co/api/films/:id")
    .success(function(response){
      $scope.episode = response.data[$routeParams.id];

    });
}]);