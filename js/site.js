var Site = angular.module('Site', ['ngRoute', 'ngSanitize', 'weather_app', 'yelp_app', 'astro_app', 'movie_app','news_app', 'quote_app', 'time_app', 'mycity-directives', 'events_app', 'map_app', 'places_app']);

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
    
      "Santa_Fe": {"cat": 7, "subcat": 294, "state": "nm", "country": "us", "lon": "-105.94","lat": "35.69"},
      "Melbourne": {"cat": 547, "subcat": 21594, "state": "vic", "country": "au", "lon": "144.97","lat": "-37.82"},
      "New_York": {"cat": 7, "subcat": 297, "state": "ny", "country": "us", "lon": "-74.01","lat": "40.71"},
      "Boston": {"cat": 7, "subcat": 250, "state": "ma", "country": "us", "lon": "-71.06","lat": "42.36"},
      "Leesburg": {"cat": 7, "subcat": 323, "state": "va", "country": "us", "lon": "-77.57","lat": "39.12"},
      "Knoxville": {"cat": 7, "subcat": 317, "state": "tn", "country": "us", "lon": "-83.92091","lat": "35.96049"},
      "Tampa": {"cat": 7, "subcat": 316, "state": "fl", "country": "us", "lon": "-82.46","lat": "27.95"},
      "Los_Angeles": {"cat": 7, "subcat": 277, "state": "ca", "country": "us", "lon": "-118.25","lat": "34.05"},
      "Fairfax": {"cat": 7, "subcat": 323, "state": "va", "country": "us", "lon": "-77.31","lat": "38.84"},
      "Adelaide": {"cat": 547, "subcat": 21584, "state": "", "country": "au", "lon": "138.59988","lat": "-34.9261"},
      "Brisbane": {"cat": 547, "subcat": 21587, "state": "qld", "country": "au", "lon": "153.02342","lat": "-27.46846"},
      "Hobart": {"cat": 547, "subcat": 22569, "state": "tas", "country": "au", "lon": "147.33162","lat": "-42.88164"},
      "Perth": {"cat": 547, "subcat": 21595, "state": "wa", "country": "au", "lon": "115.85741","lat": "-31.95264"},
      "San_Francisco": {"cat": 7, "subcat": 312, "state": "ca", "country": "us", "lon": "-122.42","lat": "37.78"},
      "Paris": {"cat": 19, "subcat": 951, "state": "", "country": "fr", "lon": "2.3412","lat": "48.8569"},
      "London": {"cat": 19, "subcat": 1748, "state": "", "country": "uk", "lon": "-0.13","lat": "51.51"},
      "Rome": {"cat": 19, "subcat": 957, "state": "", "country": "it", "lon": "12.5","lat": "41.9"},
      "Singapore": {"cat": 1070, "subcat": 29032, "state": "", "country": "sg", "lon": "103.85","lat": "1.29"},
      "Hagerstown": {"cat": 7, "subcat": 280, "state": "", "country": "us", "lon": "-77.72","lat": "39.64"},
      "Madrid": {"cat": 1070, "subcat": 27034, "state": "", "country": "es", "lon": "-3.7","lat": "40.42"},
      "Toledo": {"cat": 1070, "subcat": 27034, "state": "", "country": "es", "lon": "-4.02","lat": "39.86"},
      "Granada": {"cat": 1070, "subcat": 27034, "state": "", "country": "es", "lon": "-3.61","lat": "37.19"},
      "Seville": {"cat": 1070, "subcat": 27034, "state": "", "country": "es", "lon": "-6","lat": "37.39"},
      "Costa_del_Sol": {"cat": 1070, "subcat": 27034, "state": "", "country": "es", "lon": "-15.39","lat": "27.95"},
      "Sydney": {"cat": 547, "subcat": 21113, "state": "nsw", "country": "au", "lon": "151.21","lat": "-33.87"}

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
    $rootScope.map = null;
    

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