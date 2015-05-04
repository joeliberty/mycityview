(function() {
'use strict';
var Site = angular.module('Site', ['ngRoute', 'ui.bootstrap', 'ngSanitize', 'weather_app', 'yelp_app', 'astro_app', 'movie_app','faroo_app', 'quote_app', 'time_app', 'mycity-directives', 'events_app', 'map_app', 'places_app', 'twitter_app', 'ngTouch', 'meetup_app', 'rates_app', 'nearby_app']);

Site.controller('ShowHomeController', ['$scope', '$rootScope', '$location', '$http', 'MyService',
  function($scope, $rootScope, $location, $http, MyService) {
  $rootScope.locs = MyService.get_json_data();
  $rootScope.nameLength = 20; // Yelp uses this!
  $rootScope.times = {
    "fulltime": 0,
    "current": 0,
    "sunrise": 0,
    "sunset": 0
  };

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
  $rootScope.newsdata.cat = (new_city) ? $rootScope.locs[new_city].cat : '547';
  $rootScope.newsdata.subcat = (new_city) ? $rootScope.locs[new_city].subcat : '21594';
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
      obj.id = city;
      var city_st = (cities[city].state) ?
        city.replace(/_/g, ' ') + ', ' + cities[city].state.toUpperCase() :
        city.replace(/_/g, ' ');
      obj.name = city_st;
      $scope.actions.push(obj);
    }
  }

  $scope.setAction = function(action) {
    $scope.selectedAction = action;
    $location.hash($scope.selectedAction.id);
  };

  $scope.mobileAndTabletcheck = function() {
    var check = false;
    (function(a) {if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };

  $rootScope.isMobile = $scope.mobileAndTabletcheck();

}]);
 
Site.controller('GetHeaderImage', ['$scope', '$rootScope', '$http',
  function($scope, $rootScope, $http) {
  var random_num = Math.floor((Math.random() * 10) + 1);
  var city = $rootScope.city_id.toLowerCase();
  var state;
  if($rootScope.state) {
    state = $rootScope.state.toLowerCase();
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
}]);

Site.service('MyService', ['$http',
  function($http) {
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
}]);

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