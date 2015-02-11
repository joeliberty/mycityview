var yelp_app = angular.module('yelp_app', []);

yelp_app.controller("MusicVenueCtrl", function($scope, $rootScope, $http) {
    // $scope.music_limit = 16;
    $http({
        url: 'yelp_sample.php', 
        method: "GET",
        params: {term: 'music venue',
                location: $rootScope.city +',' + $rootScope.state}
    }).success(function(data) {
        var data_array = jQuery.parseJSON(data);
        var data_array = eval('(' + data_array + ')');
        // console.log(data_array.businesses)
        $scope.musicvenues = data_array.businesses;
         
    }); 
});

yelp_app.controller("RestaurantCtrl", function($scope, $rootScope, $http) {
    $scope.restaurant_limit = 16;
    $http({
        url: 'yelp_sample.php', 
        method: "GET",
        params: {term: 'restaurant',
                location: $rootScope.city +',' + $rootScope.state}
    }).success(function(data) {
        var data_array = jQuery.parseJSON(data);
        var data_array = eval('(' + data_array + ')');
        // var type = Object.prototype.toString.call(data_array);
        $scope.restaurants = data_array.businesses;
        // console.log('forcast: ' + $scope.forcast)
    }); 
});

yelp_app.controller("ClubCtrl", function($scope, $rootScope, $http) {
    $http({
        url: 'yelp_sample.php', 
        method: "GET",
        params: {term: 'happy hour',
                location: $rootScope.city +',' + $rootScope.state}
    }).success(function(data) {
        var data_array = jQuery.parseJSON(data);
        var data_array = eval('(' + data_array + ')');
        var type = Object.prototype.toString.call(data_array);
        $scope.clubs = data_array.businesses;
        // for (var i=0;i<data_array.businesses.length;i++) {
        //      var grp_ob = data_array.businesses[i];
             // for(var key in grp_ob) {
             //     if(grp_ob.hasOwnProperty(key)) {
             //         // Gets all listings values
             //         console.log(key + " -> " + ' value: '+grp_ob[key] );
             //         if (key == 'location') {
             //             var location = grp_ob[key];
             //              for(var loc in location) {
             //                if(location.hasOwnProperty(loc)) {
             //                  console.log(loc + " -> " + ' value: '+location[loc] );
                            
             //                }
             //              }
             //         }
             //     }
             // }
         // }
    }); 
});

yelp_app.controller("GallaryCtrl", function($scope, $rootScope, $http) {
    $scope.gallery_limit = 16;
    $http({
        url: 'yelp_sample.php', 
        method: "GET",
        params: {term: 'art',
                location: $rootScope.city +',' + $rootScope.state}
    }).success(function(data) {
        var data_array = jQuery.parseJSON(data);
        var data_array = eval('(' + data_array + ')');
        // console.log(data_array)
        // var type = Object.prototype.toString.call(data_array);
        $scope.galleries = data_array.businesses;

        // Copyright is hidden till last element is displayed
        // $('#copyright').css('display', 'inline-block');
        // console.log('forcast: ' + $scope.forcast)
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

