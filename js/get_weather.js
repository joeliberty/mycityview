(function() {
'use strict';

var weather_app = angular.module('weather_app', []);

weather_app.controller("CurWeatherCtrl", ['$scope', '$rootScope', '$http',
    function($scope, $rootScope, $http) {
    $http({
        url: 'http://api.openweathermap.org/data/2.5/weather',
        dataType: 'json', 
        method: "GET",
        params: {q: $rootScope.city_state_country,
            appid: "4e5600686359104d6dd1ad18d82bd70b"}
    }).success(function(data) {
        $scope.cur_temp = data.main.temp;
        $scope.temp_max = data.main.temp_max;
        $scope.imagepath = 'http://openweathermap.org/img/w/' + data.weather[0]['icon'] + '.png';
        $scope.description = data.weather[0]['description'];
    }); 
}]);

weather_app.controller("DayForcastCtrl", ['$scope', '$rootScope', '$http',
    function($scope, $rootScope, $http) {
    var url= 'http://api.openweathermap.org/data/2.5/forecast';
    $http({
        url: url,
        dataType: 'json', 
        method: "GET",
        params: {q: $rootScope.city_state_country,
            appid: "4e5600686359104d6dd1ad18d82bd70b"
        }
    }).success(function(data) {
        var date_time = '';
        if($rootScope.times.fulltime) {
            // console.log('using api time')
            date_time = new Date($rootScope.times.fulltime);
        } else {
            // console.log('using computer time')
            date_time = new Date();
        }
        var weather_data = [];
        var cnt = 0;
        var done = false;
        var grp_ob = data.list;
        for(var key in grp_ob) {
            if(grp_ob.hasOwnProperty(key)) {
                if(done) { break; }
                var data_list = {};
                var all_weather = grp_ob[key];
                // Check dates
                if(all_weather.dt == 'undefined') { continue; }
                var full_w_date = new Date(all_weather.dt * 1000);
                if(full_w_date < date_time) { continue; }
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
        $scope.daycast = weather_data;
    });
}]);

weather_app.filter('temp', function($filter, $rootScope) {
    return function(input, t_array) {
        if(input) {
            // conver from kelvin to celcius
            input = input - 273.15;
            var precision = t_array[0];
            var temp_type = t_array[1];
            precision = 1;
            var numberFilter = $filter('number');

            var degree = (temp_type == 'C') ? '\u00B0C' : '\u00B0F';

            if(input && temp_type == 'F') {
                input = (input* 9.0 / 5.0 + 32).toFixed(2);
            }
            return numberFilter(input, precision) + degree;
        } else {
            return '';
        }
    };
});
})();