(function() {
'use strict';
var yelp_app = angular.module('yelp_app', []);

yelp_app.controller("MusicVenueCtrl", ['$scope', '$rootScope', '$http',
    function($scope, $rootScope, $http) {
    $http({
        url: 'php/yelp_sample.php', 
        method: "GET",
        params: {term: 'hotels',
                location: $rootScope.city_state_country}
    }).success(function(data) {
        var data_array = [];
        data_array.push(jQuery.parseJSON(data));
        data_array = jQuery.parseJSON(data_array);
        $scope.yelp_unavailable = false;
        if(data_array.error) {
            $scope.yelp_unavailable = true;
        }
        $scope.musicvenues = data_array.businesses;
    });
    $scope.select= function(item) {
        var same = (item === $scope.selected) ? true : false;
        $scope.selected = (item === $scope.selected) ? null : item;
    };

    $scope.isActive = function(item) {
        return $scope.selected === item;
    };
}]);

yelp_app.controller("RestaurantCtrl", ['$scope', '$rootScope', '$http',
    function($scope, $rootScope, $http) {
    $http({
        url: 'php/yelp_sample.php', 
        method: "GET",
        params: {term: 'restaurant',
                location: $rootScope.city_state_country}
    }).success(function(data) {
        var data_array = [];
        data_array.push(jQuery.parseJSON(data));
        data_array = jQuery.parseJSON(data_array);
        $scope.yelp_unavailable = false;
        if(data_array.error) {
            $scope.yelp_unavailable = true;
        }
        $scope.restaurants = data_array.businesses;
    });
    $scope.select= function(item) {
        var same = (item === $scope.selected) ? true : false;
        $scope.selected = (item === $scope.selected) ? null : item;
    };

    $scope.isActive = function(item) {
        return $scope.selected === item;
    };
}]);

yelp_app.controller("ClubCtrl", ['$scope', '$rootScope', '$http',
    function($scope, $rootScope, $http) {
    $http({
        url: 'php/yelp_sample.php', 
        method: "GET",
        params: {term: 'happy hour',
                location: $rootScope.city_state_country}
    }).success(function(data) {
        var data_array = [];
        data_array.push(jQuery.parseJSON(data));
        data_array = jQuery.parseJSON(data_array);
        var type = Object.prototype.toString.call(data_array);
        $scope.yelp_unavailable = false;
        if(data_array.error) {
            $scope.yelp_unavailable = true;
        }
        $scope.clubs = data_array.businesses;
    });
    $scope.select= function(item) {
        var same = (item === $scope.selected) ? true : false;
        $scope.selected = (item === $scope.selected) ? null : item;
    };

    $scope.isActive = function(item) {
        return $scope.selected === item;
    };
}]);

yelp_app.controller("GallaryCtrl", ['$scope', '$rootScope', '$http',
    function($scope, $rootScope, $http) {
    $http({
        url: 'php/yelp_sample.php', 
        method: "GET",
        params: {term: 'show',
                location: $rootScope.city_state_country}
    }).success(function(data) {
        var data_array = [];
        data_array.push(jQuery.parseJSON(data));
        data_array = jQuery.parseJSON(data_array);
        $scope.yelp_unavailable = false;
        if(data_array.error) {
            $scope.yelp_unavailable = true;
        }
        $scope.galleries = data_array.businesses;
    }); 
    /*
    * Select and isActive toggle Yelp details
    */
    $scope.select= function(item) {
        $scope.selected = (item === $scope.selected) ? null : item;
        
    };

    $scope.isActive = function(item) {
        return $scope.selected === item;
    };
}]);

yelp_app.filter('toString', function () {
  return function (item) {
      return item.toString();
  };
});
})();