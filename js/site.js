var Site = angular.module('Site', ['ngRoute', 'ngSanitize', 'weather_app', 'yelp_app', 'astro_app', 'movie_app','news_app', 'quote_app', 'time_app', 'mycity-directives', 'events_app', 'map_app']);

Site.controller('ShowHomeController', function($scope, $rootScope, $location) {
  $scope.message = 'This row reserved for credits';
  $rootScope.nameLength = 20;
  $rootScope.times = {
    "fulltime": 0,
    "current": 0,
    "sunrise": 0,
    "sunset": 0
  }
  
  // List for db.
  $rootScope.locs = {
    
      

  }
  // console.log('loc_path: ' + $location.absUrl())
  // console.log('loc_hash: ' + $location.hash())

    /*
    * new_city is the user selected city from navbar dropdown menu
    */
    var new_city = $location.hash();
    // var new_city = window.location.hash();
    

    
    /* Set defaults */
    $rootScope.city = (new_city) ? new_city.replace(/_/g, ' ') : 'Melbourne';
    $rootScope.city_id = (new_city) ? new_city : 'Melbourne';
    $rootScope.state = (new_city) ? $rootScope.locs[new_city].state : 'vic';
    $rootScope.country = (new_city) ? $rootScope.locs[new_city].country : 'au';
    $rootScope.newsdata = {};
    $rootScope.newsdata['cat'] = (new_city) ? $rootScope.locs[new_city].cat : '547';
    $rootScope.newsdata['subcat'] = (new_city) ? $rootScope.locs[new_city].subcat : '21594';
    

    /*
    * Loop throuth $rootScope.locs to create cities
    * navbar list.
    */
    var cities = $rootScope.locs;
    $scope.actions = [];
    for(var city in cities) {
      if(cities.hasOwnProperty(city)) {
        var obj = {};
        // Gets all listings values
        obj['id'] = city;
        obj['name'] = city.replace(/_/g, ' ');
        // replace(/_/g, ' ')
        // console.log(city + " -> " + ' value: '+cities[city] );
        $scope.actions.push(obj)
      }
    }

    // $scope.actions = [
    //   {id: 'Melbourne', name: 'Melbourne'},
    //   {id: 'Sydney', name: 'Sydney'},
    //   {id: 'Santa_Fe', name: 'Santa Fe'},
    //   {id: 'Boston', name: 'Boston'},
    //   {id: 'Leesburg', name: 'Leesburg'},
    //   {id: 'Knoxville', name: 'Knoxville'},
    //   {id: 'Tampa', name: 'Tampa'},
    //   {id: 'Los_Angeles', name: 'Los Angeles'},
    //   {id: 'Fairfax', name: 'Fairfax'},
    //   {id: 'Adelaide', name: 'Adelaide'},
    //   {id: 'Brisbane', name: 'Brisbane'},
    //   {id: 'Hobart', name: 'Hobart'},
    //   {id: 'Perth', name: 'Perth'},
    //   {id: 'San_Francisco', name: 'San Francisco'},
    //   {id: 'Paris', name: 'Paris'},
    //   {id: 'London', name: 'London'},
    //   {id: 'Rome', name: 'Rome'},
    //   {id: 'New_York', name: 'New York'},
    //   {id: 'Singapore', name: 'Singapore'}
    // ];


    $scope.setAction = function(action) {
      $scope.selectedAction = action;
      // console.log('$scope.selectedAction: ' + $scope.selectedAction.id)
      $location.hash($scope.selectedAction.id);
      // console.log('location: ' + $location.path())
    };

  // $scope.getParameterByName = function(name) {
  //   name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  //   var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
  //       results = regex.exec(location.search);
  //   return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  // }
  // var city = $scope.getParameterByName('city');
  // console.log('city: ' + city)
});
 
Site.controller('ShowAboutController', function($scope) {
  $scope.message = 'This is the about message';
});

Site.controller('ShowContactController', function($scope) {
  $scope.message = 'This is the contact message';
});

Site.controller('GetHeaderImage', function($scope, $rootScope) {
  var random_num = Math.floor((Math.random() * 10) + 1);
  var city = $rootScope.city_id.toLowerCase();
  var path = 'images/' + city + '/pic' + random_num + '.jpg';
  $scope.headerimage = path;
});

Site.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/ShowHome', {
        templateUrl: 'partials/home.html',
        controller: 'ShowHomeController'
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