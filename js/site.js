(function() {
'use strict';
var Site = angular.module('Site', ['ngRoute', 'ngSanitize', 'weather_app', 'yelp_app', 'astro_app', 'movie_app','news_app', 'quote_app', 'time_app', 'mycity-directives', 'events_app', 'map_app', 'places_app', 'twitter_app', 'ngTouch', 'meetup_app']);

Site.controller('ShowHomeController', function($scope, $rootScope, $location, $http, MyService) {
  $rootScope.locs = MyService.get_json_data();
  $rootScope.nameLength = 20; // Yelp uses this!
  $rootScope.times = {
    "fulltime": 0,
    "current": 0,
    "sunrise": 0,
    "sunset": 0
  }

  /*
  * New_city is the user selected city from navbar dropdown menu.
  * Default is false, true when city selected from the dropdown.
  */
  var new_city = $location.hash();
  /* Set defaults */
  $rootScope.city = (new_city) ? new_city.replace(/_/g, ' ') : 'Melbourne';
  $rootScope.city_id = (new_city) ? new_city : 'Melbourne';
  $rootScope.state = (new_city) ? $rootScope.locs[new_city].state : '';
  $rootScope.country = (new_city) ? $rootScope.locs[new_city].country : 'au';
  $rootScope.newsdata = {};
  $rootScope.newsdata['cat'] = (new_city) ? $rootScope.locs[new_city].cat : '547';
  $rootScope.newsdata['subcat'] = (new_city) ? $rootScope.locs[new_city].subcat : '21594';
  $rootScope.map = null;

  /* Create City State County value*/
  $rootScope.city_state_country = '';
  if($rootScope.state) {
      $rootScope.city_state_country = $rootScope.city +', '+ $rootScope.state +', '+$rootScope.country;
  } else {
      $rootScope.city_state_country = $rootScope.city +', '+$rootScope.country;
  }
  
  /*
  * Loop throuth $rootScope.locs to create cities
  * navbar list.
  */

  var cities = $rootScope.locs;
  /* actions array used in navbar */
  $scope.actions = []; 
  for(var city in cities) {

    if(cities.hasOwnProperty(city)) {
      var obj = {};
      // Gets all listings values
      obj['id'] = city;
      var city_st = (cities[city].state) ?
        city.replace(/_/g, ' ') + ', ' + cities[city].state.toUpperCase() :
        city.replace(/_/g, ' ');
      obj['name'] = city_st;
      $scope.actions.push(obj)
    }
  }

  $scope.setAction = function(action) {
    $scope.selectedAction = action;
    $location.hash($scope.selectedAction.id);
  };
});
 
Site.controller('GetHeaderImage', function($scope, $rootScope, $http) {
  var random_num = Math.floor((Math.random() * 10) + 1);
  var city = $rootScope.city_id.toLowerCase();
  if($rootScope.state) {
    var state = $rootScope.state.toLowerCase();
  }
  var country = $rootScope.country.toLowerCase();
  var path = '../all_images/' + city;
  if(state) {
    path += '_' + state;
  }
  
  /* 
  *Get list of files that are prepended with city, state, country
  */
  path += '_' + country;
  $scope.myInterval = 10000; //Carousel delay
  $http({
    url: 'php/get_image_files.php',
    dataType: 'json', 
    method: "GET",
    params: {filename: path}
  }).success(function(data) {
    $scope.slides = data;
  }); 
});

Site.service('MyService', function($http) {
  var myData = null;

  var promise = $http.get('js/city_data.json').success(function (data) {
    myData = data;
  });

  return {
    promise:promise,
    // setData: function (data) {
      // myData = data;
    // },
    get_json_data: function () {
        return myData;
    }
  };
});

Site.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/ShowHome', {
        templateUrl: 'partials/home.html',
        controller: 'ShowHomeController',
        resolve:{
          // Wait for promise
          'MyServiceData':function(MyService){
          return MyService.promise;
        }}
      }).
      // when('/ShowAbout', {
      //   templateUrl: 'partials/about.html',
      //   controller: 'ShowAboutController'
      // }).
      // when('/ShowContact', {
      //   templateUrl: 'partials/contact.html',
      //   controller: 'ShowContactController'
      // }).
      otherwise({
        redirectTo: '/ShowHome'
      });
  }]);

})();