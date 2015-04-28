(function() {
'use strict';
var movie_app = angular.module('movie_app', ['ui.bootstrap']);

movie_app.controller("MovieCtrl", ['$scope', '$rootScope', '$http',
  function($scope, $rootScope, $http) {
    var city_state = $rootScope.city.replace(' ', ',') + ',' + $rootScope.state;
    // console.log('city_state: ' + city_state)
    $scope.good_data = true;
    $scope.theaters = { events: {name:'Unavailable'}};
    $http({
        url: 'php/get_movies.php',
        dataType: 'json', 
        method: "GET",
        params: {city: city_state}
    }).success(function(data) {
        if(data.length > 0) {
          $scope.theaters = data;
        }
    }); 

}]);

movie_app.filter('movie_times', function () {
  return function (item) {
      return item.replace(/(&nbsp)*/g,"");
  };
});

// movie_app.filter('movie_address', function () {
//   return function (item) {
//     /* Check for bad movie info */
//     if(item == null || item.indexOf(';&#')) {
//       return "";
//     }
//     /* Return good movie info */
//     // Remove ampersand
//     item.replace(/(&nbsp)*/g,"");
//     item.toUpperCase();
//     return item;
//   };
// });

movie_app.filter('theater_name', function () {
  return function (item,scope) {
    /* Check for bad movie info */
    if(item === null || item.indexOf(';&#') != -1){
      scope.good_data = false;
      return "Unavailable";
    }
    /* Return good movie info */
    // Remove ampersand
    item.replace(/(&nbsp)*/g,"");
    return item;
  };
});
})();