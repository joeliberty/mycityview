'use strict';

var weather_app = angular.module('weather_app', []);

weather_app.controller("CurWeatherCtrl", function($scope, $rootScope, $http) {
    // console.log($rootScope.city +' '+ $rootScope.state +' '+$rootScope.country)
    var state = ($rootScope.state) ? $rootScope.state : ' ';
    $http({
        url: 'http://api.openweathermap.org/data/2.5/weather',
        dataType: 'json', 
        method: "GET",
        params: {q: $rootScope.city +','+ state +','+$rootScope.country,
                units: 'metric'}
    }).success(function(data) {
        // console.log(data)
        $scope.cur_temp = data.main.temp;
        $scope.temp_max = data.main.temp_max;
        $scope.imagepath = 'http://openweathermap.org/img/w/' + data.weather[0]['icon'] + '.png';
        $scope.description = data.weather[0]['description'];
        // $scope.coords = data.coord;
        // console.log('lat: ' + data.coord.lat)
        // console.log('lon: ' + data.coord.lon)
        // console.log('lat: ' + $scope.coords.lat)
        // self.setLatLng($scope.coords);
    }); 

    // this.setLatLng = function(latLng) {
    //     console.log('lat: ' + latLng.lat + ' lon: ' + latLng.lon)
    //     var tz = new TimeZoneDB;
    //     tz.getJSON({
    //         key: "5RA5S5NN25IA",
    //         lat: latLng.lat,
    //         lng: latLng.lon
    //     }, function(data){
    //         console.log('timestamp: ' + data.timestamp);
    //         var timestamp = data.timestamp;
    //         var gmtoffset = data.gmtOffset;
    //         var num = timestamp - gmtoffset;
    //         var date = new Date(num * 1000);
    //         console.log('date: ' + date)
    //         $rootScope.localtime = date.getHours();
    //         console.log('localtime: ' + $rootScope.localtime)
    //     });
    // };
});

weather_app.controller("DayForcastCtrl", function($scope, $rootScope, $http) {
    if(!$rootScope.times.fulltime) {
        setTimeout(function(){
            // console.log('waiting')
            //wait;
        },1000)
    }
    var self = this;
    $http({
        url: 'http://api.openweathermap.org/data/2.5/forecast', 
        dataType: 'jsonp', 
        method: "GET",
        params: {q: $rootScope.city +','+ $rootScope.state +','+$rootScope.country,
                units: 'metric',
                cnt: 1}
    }).success(function(data) {
        // console.log('cur_time1: ' + $rootScope.times.fulltime)
        // var date_time = new Date($rootScope.times.fulltime);
        // console.log('date_time: ' + date_time)
        
        // if(!$rootScope.times.fulltime) {
        //     console.log('waiting')
        //     var timeOut = setTimeout(function () { }, 3000);
        // }
        // clearTimeout(timeOut);

        var date_time = '';
        if($rootScope.times.fulltime) {
            // console.log('using api time')
            date_time = new Date($rootScope.times.fulltime);
        } else {
            // console.log('using computer time')
            date_time = new Date();
        }
        // console.log('date_time: ' + date_time);
        // var c_hour = $scope.current_time //date_time.getHours();
        // console.log('c_hour: ' + c_hour)
        var weather_data = [];
        var cnt = 0;
        var done = false;
        var grp_ob = data.list;
        // var start = false;
        for(var key in grp_ob) {
            if(grp_ob.hasOwnProperty(key)) {
                if(done) { break; }
                var data_list = {};
                var all_weather = grp_ob[key];
                // Check dates
                var full_w_date = new Date(all_weather.dt * 1000);
                // console.log('test: ' + full_w_date)
                if(full_w_date < date_time) { continue; }
                // console.log('passed: ' + full_w_date)
                // Add temp
                // console.log(full_w_date)
                // console.log(all_weather.dt)
                // console.log(all_weather.main)
                // console.log(all_weather['main'].temp)
                data_list.temps = all_weather['main'].temp;
                // Add hour
                var t_date = full_w_date.toString();
                var t_hour = t_date.slice(16, 21);
                data_list.times = t_hour;
                // Add icon path
                var icon = all_weather['weather'][0]['icon'];
                var url = 'http://openweathermap.org/img/w/' + icon + '.png';
                data_list.icons = String(url);
                // Add description
                data_list.descripts = String(all_weather['weather'][0]['description']);
                cnt = cnt + 1;
                if(cnt > 11) { done = true; }
                weather_data.push(data_list);
            }
        }
        // console.log(weather_data)
        // $scope.chunkedData = self.chunk(weather_data, 3);
        $scope.daycast = weather_data;
        // console.log($scope.daycast)
    });

    this.chunk = function(arr, size)  {
      var newArr = [];
      for (var i=0; i<arr.length; i+=size) {
        newArr.push(arr.slice(i, i+size));
      }
      // console.log(newArr)
      return newArr;
    }
});

// weather_app.factory('weatherService', function($http, $rootScope) {
//     return { 
//       getWeather: function() {
//         var weather = { temp: {}, clouds: null };
//         $http({
//         url: 'http://api.openweathermap.org/data/2.5/weather',
//         dataType: 'json', 
//         method: "GET",
//         params: {q: $rootScope.city +' '+ $rootScope.state +' '+$rootScope.country,
//                 units: 'metric'}
//     }).success(function(data) {
//         // $http.jsonp('http://api.openweathermap.org/data/2.5/weather?q=Melbourne,au&units=metric&callback=JSON_CALLBACK').success(function(data) {
           
//         if (data) {
//                 if (data.main) {
//                     weather.temp.current = data.main.temp;
//                     weather.temp.min = data.main.temp_min;
//                     weather.temp.max = data.main.temp_max;
//                     weather.farenheit = (data.main.temp * 9.0 / 5.0 + 32).toFixed(2);
//                 }
//                 weather.clouds = data.clouds ? data.clouds.all : undefined;
//             }
//         });

//         return weather;
//       }
//     }; 
// });

weather_app.filter('temp', function($filter) {
    return function(input, t_array) {
        // console.log('input: ' + input)
        // console.log('pre: ' + t_array[0])
        // console.log('type: ' +t_array[1])
        var precision = t_array[0];
        var temp_type = t_array[1];
        // if (!precision) {
            precision = 1;
        // }
        // console.log('type: ' + type)
        var numberFilter = $filter('number');

        var degree = (temp_type == 'C') ? '\u00B0C' : '\u00B0F';
        // return numberFilter(input, precision) + '\u00B0C';
        // weather.farenheit = (data.main.temp * 9.0 / 5.0 + 32).toFixed(2);

        if(input && temp_type == 'F') {
            input = (input* 9.0 / 5.0 + 32).toFixed(2);
        }
        return numberFilter(input, precision) + degree;
        
    };
});

// weather_app.controller('WeatherCtrl', function ($scope, weatherService) {
//     $scope.weather = weatherService.getWeather();
// });

// weather_app.directive('weatherIcon', function() {
//     return {
//         restrict: 'E', replace: true,
//         scope: {
//             cloudiness: '@'
//         },
//         controller: function($scope) {
//             $scope.imgurl = function() {
//                 var baseUrl = 'https://ssl.gstatic.com/onebox/weather/128/';
//                 if ($scope.cloudiness < 20) {
//                     return baseUrl + 'sunny.png';
//                 } else if ($scope.cloudiness < 90) {
//                    return baseUrl + 'partly_cloudy.png';
//                 } else {
//                     return baseUrl + 'cloudy.png';
//                 }
//             };
//         },
//         template: '<div ><img ng-src="{{ imgurl() }}"></div>'
//     };
// });
