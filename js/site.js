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
      "Melbourne": {"cat": 547, "subcat": 21594, "state": "", "country": "au", "lon": "144.97","lat": "-37.82"},
      "New_York": {"cat": 7, "subcat": 297, "state": "ny", "country": "us", "lon": "-74.01","lat": "40.71"},
      "Boston": {"cat": 7, "subcat": 250, "state": "ma", "country": "us", "lon": "-71.06","lat": "42.36"},
      "Leesburg": {"cat": 7, "subcat": 323, "state": "va", "country": "us", "lon": "-77.57","lat": "39.12"},
      "Knoxville": {"cat": 7, "subcat": 317, "state": "tn", "country": "us", "lon": "-83.92091","lat": "35.96049"},
      "Tampa": {"cat": 7, "subcat": 316, "state": "fl", "country": "us", "lon": "-82.46","lat": "27.95"},
      "Los_Angeles": {"cat": 7, "subcat": 277, "state": "ca", "country": "us", "lon": "-118.25","lat": "34.05"},
      "Fairfax": {"cat": 7, "subcat": 323, "state": "va", "country": "us", "lon": "-77.31","lat": "38.84"},
      "Adelaide": {"cat": 547, "subcat": 21584, "state": "", "country": "au", "lon": "138.59988","lat": "-34.9261"},
      "Brisbane": {"cat": 547, "subcat": 21587, "state": "", "country": "au", "lon": "153.02342","lat": "-27.46846"},
      "Hobart": {"cat": 547, "subcat": 22569, "state": "", "country": "au", "lon": "147.33162","lat": "-42.88164"},
      "Perth": {"cat": 547, "subcat": 21595, "state": "", "country": "au", "lon": "115.85741","lat": "-31.95264"},
      "San_Francisco": {"cat": 7, "subcat": 312, "state": "ca", "country": "us", "lon": "-122.42","lat": "37.78"},
      "Paris": {"cat": 19, "subcat": 951, "state": "", "country": "fr", "lon": "2.3412","lat": "48.8569"},
      "London": {"cat": 19, "subcat": 1748, "state": "", "country": "uk", "lon": "-0.13","lat": "51.51"},
      "Rome": {"cat": 19, "subcat": 957, "state": "", "country": "it", "lon": "12.5","lat": "41.9"},
      "Singapore": {"cat": 1070, "subcat": 29032, "state": "", "country": "sg", "lon": "103.85","lat": "1.29"},
      "Hagerstown": {"cat": 7, "subcat": 280, "state": "md", "country": "us", "lon": "-77.72","lat": "39.64"},
      "Madrid": {"cat": 1070, "subcat": 27034, "state": "", "country": "es", "lon": "-3.7","lat": "40.42"},
      "Toledo": {"cat": 1070, "subcat": 27034, "state": "", "country": "es", "lon": "-4.02","lat": "39.86"},
      "Granada": {"cat": 1070, "subcat": 27034, "state": "", "country": "es", "lon": "-3.61","lat": "37.19"},
      "Seville": {"cat": 1070, "subcat": 27034, "state": "", "country": "es", "lon": "-6","lat": "37.39"},
      "Costa_del_Sol": {"cat": 1070, "subcat": 27034, "state": "", "country": "es", "lon": "-15.39","lat": "27.95"},
      "Amsterdam": {"cat": 1070, "subcat": 28050, "state": "", "country": "nl", "lon": "4.89","lat": "52.37"},
      "Auckland": {"cat": 19, "subcat": 989, "state": "", "country": "nz", "lon": "174.77","lat": "-36.87"},
      "Montreal": {"cat": 19, "subcat": 919, "state": "", "country": "ca", "lon": "-73.59","lat": "45.51"},
      "Toronto": {"cat": 19, "subcat": 917, "state": "", "country": "ca", "lon": "-79.42","lat": "43.7"},
      "Dublin": {"cat": 19, "subcat": 956, "state": "", "country": "ie", "lon": "-6.27","lat": "53.34"},
      "Kuala_Lumpur": {"cat": 19, "subcat": 895, "state": "", "country": "my", "lon": "101.69","lat": "3.14"},
      "Jakarta": {"cat": 19, "subcat": 895, "state": "", "country": "my", "lon": "106.8","lat": "-6.58"},
      "Moscow": {"cat": 19, "subcat": 967, "state": "", "country": "ru", "lon": "37.62","lat": "55.75"},
      "Helsinki": {"cat": 19, "subcat": 950, "state": "", "country": "fi", "lon": "24.94","lat": "60.17"},
      "McCrae": {"cat": 547, "subcat": 21594, "state": "", "country": "au", "lon": "144.93","lat": "-38.35"},
      "Sydney": {"cat": 547, "subcat": 21113, "state": "", "country": "au", "lon": "151.21","lat": "-33.87"}

  }
  // console.log('loc_path: ' + $location.absUrl())
  // console.log('loc_hash: ' + $location.hash())

    /*
    * new_city is the user selected city from navbar dropdown menu
    */
    var new_city = $location.hash();
    // console.log('new_city: ' + new_city)
    // var new_city = window.location.hash();
    

    
    /* Set defaults */
    $rootScope.city = (new_city) ? new_city.replace(/_/g, ' ') : 'Melbourne';
    $rootScope.city_id = (new_city) ? new_city : 'Melbourne';
    $rootScope.state = (new_city) ? $rootScope.locs[new_city].state : '';
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
        // console.log('state: ' + cities[city].state)
        obj['id'] = city;
        var city_st = (cities[city].state) ?
          city.replace(/_/g, ' ') + ', ' + cities[city].state.toUpperCase() :
          city.replace(/_/g, ' ');
        obj['name'] = city_st;
        // obj['name'] = city.replace(/_/g, ' ');
        // replace(/_/g, ' ')
        // console.log(city + " -> " + ' value: '+cities[city] );
        $scope.actions.push(obj)
      }
    }

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

Site.controller('GetHeaderImage', function($scope, $rootScope, $http) {
  var random_num = Math.floor((Math.random() * 10) + 1);
  var city = $rootScope.city_id.toLowerCase();
  if($rootScope.state) {
    var state = $rootScope.state.toLowerCase();
  }
  var country = $rootScope.country.toLowerCase();
  // var path = 'images/' + city + '/pic' + random_num + '.jpg';
  var path = '../all_images/' + city;
  // var path = '/all_images/' + city;
  if(state) {
    path += '_' + state;
  }
  // console.log('path: ' + path)
  /*When getting just 1 file
  path += '_' + country + '_pic' + random_num + '.jpg';
  console.log('path: ' + path)
  $scope.headerimage = path;
  */

  /* Get list of files that are prepended with city, state, country */
  path += '_' + country;
  // console.log('path: ' + path)
  $scope.myInterval = 10000;
  $http({
    url: 'php/get_image_files.php',
    dataType: 'json', 
    method: "GET",
    params: {filename: path}
  }).success(function(data) {
    $scope.slides = data;
    // $scope.theaters = data;
    // var data_array = eval('(' + data_array + ')');
    // $scope.headerimage = path;
  }); 

  //path += '_' + country + '_pic' + random_num + '.jpg';
  // console.log('path: ' + path)
  // $scope.headerimage = path;
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