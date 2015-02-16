var movie_app = angular.module('movie_app', ['ui.bootstrap']);

movie_app.controller("MovieCtrl", function($scope, $rootScope, $http) {
    var city_state = $rootScope.city.replace(' ', ',') + ',' + $rootScope.state;
    // console.log('city_state: ' + city_state)
    $http({
        url: 'php/get_movies.php',
        dataType: 'json', 
        method: "GET",
        params: {city: city_state}
    }).success(function(data) {
        // var data_array = jQuery.parseJSON(data);
        // console.log(data)
        $scope.theaters = data;
        // var data_array = eval('(' + data_array + ')');
         
    }); 

});

movie_app.filter('removeAmp', function () {
  return function (item) {
      return item.replace(/(&nbsp)*/g,"");
  };
});

movie_app.filter('isnull', function () {
  return function (item) {
    if(item == null) {
        return "Unavailable";
    } else {
        return item;
    }
  };
});