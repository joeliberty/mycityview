(function() {
'use strict';
var yelp_app = angular.module('yelp_app', []);

yelp_app.controller("MusicVenueCtrl", function($scope, $rootScope, $http) {
    // $scope.music_limit = 16;
    $http({
        url: 'php/yelp_sample.php', 
        method: "GET",
        params: {term: 'music venue',
                location: $rootScope.city +',' + $rootScope.state}
    }).success(function(data) {
        var data_array = jQuery.parseJSON(data);
        var data_array = eval('(' + data_array + ')');
        $scope.yelp_unavailable = false;
        if(data_array.error) {
            $scope.yelp_unavailable = true;
        }
        $scope.musicvenues = data_array.businesses;
         
    }); 
});

yelp_app.controller("RestaurantCtrl", function($scope, $rootScope, $http) {
    $scope.restaurant_limit = 16;
    $http({
        url: 'php/yelp_sample.php', 
        method: "GET",
        params: {term: 'restaurant',
                location: $rootScope.city +',' + $rootScope.state}
    }).success(function(data) {
        var data_array = jQuery.parseJSON(data);
        var data_array = eval('(' + data_array + ')');
        $scope.yelp_unavailable = false;
        if(data_array.error) {
            $scope.yelp_unavailable = true;
        }
        $scope.restaurants = data_array.businesses;
    }); 
});

yelp_app.controller("ClubCtrl", function($scope, $rootScope, $http) {
    $http({
        url: 'php/yelp_sample.php', 
        method: "GET",
        params: {term: 'happy hour',
                location: $rootScope.city +',' + $rootScope.state}
    }).success(function(data) {
        var data_array = jQuery.parseJSON(data);
        var data_array = eval('(' + data_array + ')');
        var type = Object.prototype.toString.call(data_array);
        $scope.yelp_unavailable = false;
        if(data_array.error) {
            $scope.yelp_unavailable = true;
        }
        $scope.clubs = data_array.businesses;
    }); 
});

yelp_app.controller("GallaryCtrl", function($scope, $rootScope, $http) {
    $scope.gallery_limit = 16;
    $http({
        url: 'php/yelp_sample.php', 
        method: "GET",
        params: {term: 'art',
                location: $rootScope.city +',' + $rootScope.state}
    }).success(function(data) {
        var data_array = jQuery.parseJSON(data);
        var data_array = eval('(' + data_array + ')');
        $scope.yelp_unavailable = false;
        if(data_array.error) {
            $scope.yelp_unavailable = true;
        }
        $scope.galleries = data_array.businesses;
    }); 
});

yelp_app.controller('ToggleCtrl', function($scope) {
    $scope.custom = true;
    $scope.toggleCustom = function() {
        $scope.custom = $scope.custom === false ? true: false;
    }
});

yelp_app.filter('toString', function () {
  return function (item) {
      return item.toString();
  };
});
})();