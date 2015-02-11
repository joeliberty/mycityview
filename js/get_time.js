'use strict';

var time_app = angular.module('time_app', []);

time_app.controller("GetTimeCtrl", function($scope, $rootScope, $http) {
    // var self = this;
    var t_city = $rootScope.city_id;
    var city_data = $rootScope.locs;
    // console.log('city_data: ' + city_data[t_city].lat)

    $http({
        url: 'http://api.geonames.org/timezoneJSON',
        dataType: 'jsonp', 
        method: "GET",
        params: {
                
                }
    }).success(function(data) {
        // console.log(data.time)
        // console.log(data.time + ': ' + data.sunrise + ': ' + data.sunset)
        $rootScope.times['fulltime'] = data.time;
        // console.log('from time api: ' + $rootScope.times.fulltime)
        var time_arr = data.time.split(' ');
         // $scope.current_time = time_arr[1];
        $rootScope.times['current'] = time_arr[1];
        var sunrise_arr = data.sunrise.split(' ');
        // $scope.sunrise = sunrise_arr[1];
        $rootScope.times['sunrise'] = sunrise_arr[1];
        var sunset_arr = data.sunset.split(' ');
        // $scope.sunset = sunset_arr[1];
        $rootScope.times['sunset'] = sunset_arr[1];
        // console.log('time: ' + $scope.current_time)
   });
});