var events_app = angular.module('events_app', []);

events_app.factory('formatDate', function() {
    return {
        yyyy_mm_dd : function(today){
        var day = today.getDate(today);
        if(day < 10) {
            day = '0' + day;
        }
        var month = today.getMonth(today) + 1;
        if(month < 10) {
            month = '0' + month;
        }
        var year = today.getFullYear(today);
        return year + '-' + month + '-' + day; 
        }  
    }
});

events_app.factory('dateSort', function() {
    return {
        comparator : function (a,b){
        if (a.timestamp < b.timestamp) return -1;
        if (a.timestamp > b.timestamp) return 1;
        return 0;
        }
    }
});

events_app.controller("EventsCtrl", function($scope, $rootScope, $http, formatDate, dateSort) {
    var t_city = $rootScope.city_id;
    var city_data = $rootScope.locs;
    var point = city_data[t_city].lat + ',' + city_data[t_city].lon;
    // Get todays date and format it.
    var today = new Date();
    today = formatDate.yyyy_mm_dd(today);
    // Get tomorrows date and format it.
    var now = new Date();
    var tomorrow = new Date(now);
    tomorrow = tomorrow.setDate(now.getDate()+1);
    tomorrow = new Date(tomorrow);
    tomorrow = formatDate.yyyy_mm_dd(tomorrow).toString();

    $scope.events = { events: {name:'Sorry there are no events for ' + $rootScope.city + '.'}};

    var decrypted = CryptoJS.AES.decrypt('U2FsdGVkX19chVesPhEt4kavFEA2gU1flPvBpDcAz0w=', "secret");
    var pass_phrase = decrypted.toString(CryptoJS.enc.Utf8);
    
    if($rootScope.country == 'au') {
        decrypted = CryptoJS.AES.decrypt('U2FsdGVkX19SrczeGTVDtIbwjXRpRU7x+YJ3MxyfSt/sYCmm71NaXfGPs87xYS6C', pass_phrase);
        var username = decrypted.toString(CryptoJS.enc.Utf8);
        decrypted = CryptoJS.AES.decrypt('U2FsdGVkX1+YqEl8lzoQ2ayDSoYlXnezuxWUQPL3BjE=', pass_phrase);
        var password = decrypted.toString(CryptoJS.enc.Utf8);
        $scope.events = { events: {name:'Retrieving Events'}};
        var url = 'php/get_event.php'
        $http({
            url: url,
            dataType: 'json', 
            method: 'GET',
            params: {username: username,
                    password: password,
                    point: point,
                    radius: '100',
                    start_date: today,
                    end_date: tomorrow
                    }
        }).success(function(data) {
            $scope.events = data;
        }); 
    } 
    // decrypted = CryptoJS.AES.decrypt('U2FsdGVkX18KWlc+LIQYiib9sGesYalJZCzXUUTravM=', pass_phrase);
    // var aid = decrypted.toString(CryptoJS.enc.Utf8);
    if($rootScope.country == 'us' || $rootScope.country == 'ca') {
        decrypted = CryptoJS.AES.decrypt('U2FsdGVkX18KWlc+LIQYiib9sGesYalJZCzXUUTravM=', pass_phrase);
        var aid = decrypted.toString(CryptoJS.enc.Utf8);
        $scope.events = { events: {name:'Retrieving Events'}};
        url = 'http://api.seatgeek.com/2/events?lon=' + city_data[t_city].lon + '&lat=' + city_data[t_city].lat + '&range=15mi&aid=' + aid
        $http({
            url: url,
            dataType: 'json', 
            method: "GET"
            
        }).success(function(data) {
            $scope.events = data.events;
        }); 
    }
    var euro_countries = ['uk', 'fr', 'it', 'es', 'nl', 'ie', 'ru', 'fi'];
    // decrypted = CryptoJS.AES.decrypt('U2FsdGVkX1/usFxGy6+N1xBtTWtGqqXfxpFtmVWpZMEHHICHW0qU3kEWOJrSzDbSXnifUlz22zFXPKiWh1E2Nw==', "secret");
    // var apikey = decrypted.toString(CryptoJS.enc.Utf8);
    var is_euro = 0;
    is_euro = euro_countries.indexOf($rootScope.country);
    if(is_euro != -1) {
        decrypted = CryptoJS.AES.decrypt('U2FsdGVkX1/usFxGy6+N1xBtTWtGqqXfxpFtmVWpZMEHHICHW0qU3kEWOJrSzDbSXnifUlz22zFXPKiWh1E2Nw==', "secret");
        var apikey = decrypted.toString(CryptoJS.enc.Utf8);
        $scope.events = { events: {name:'Retrieving Events'}};
        var sw_events = [];
        var url = 'http://api-sandbox.seatwave.com/v2/discovery/events?apikey=' + apikey + '&where=' + $rootScope.city + '&what=concerts&callback=JSON_CALLBACK';
        $http.jsonp(url).success(function(data) {
            if(data.Events.length == 0) {
                $scope.events = { events: {name:'Sorry not events for ' + $rootScope.city +'.'}};
            }
            var event_total = 30;
            var event_cnt = 0;
            $.each(data.Events, function () {
                var sw_event = {};
                var show_date = this.Date.substring(6, 18);
                sw_event['name'] = this.EventGroupName;
                sw_event['location_summary'] = this.VenueName;
                sw_event['type'] = 'Music';
                sw_event['timestamp'] = show_date;
                sw_event['url'] = this.SwURL;
                sw_events.push(sw_event);
            });
            sw_events = sw_events.sort(dateSort.comparator);
        });

        var url = 'http://api-sandbox.seatwave.com/v2/discovery/events?apikey=' + apikey + '&where=' + $rootScope.city + '&what=sports&callback=JSON_CALLBACK';
        $http.jsonp(url).success(function(data) {
            var event_total = 30;
            var event_cnt = 0;
            $.each(data.Events, function () {
                var sw_event = {};
                var show_date = this.Date.substring(6, 18);
                sw_event['name'] = this.EventGroupName;
                sw_event['type'] = 'Sports';
                sw_event['location_summary'] = this.VenueName;
                sw_event['timestamp'] = show_date;
                sw_event['url'] = this.SwURL;
                sw_events.push(sw_event);
            });
            sw_events = sw_events.sort(dateSort.comparator);
        });

        var url = 'http://api-sandbox.seatwave.com/v2/discovery/events?apikey=' + apikey + '&where=' + $rootScope.city + '&what=theater&callback=JSON_CALLBACK';
        $http.jsonp(url).success(function(data) {
            var event_total = 30;
            var event_cnt = 0;
            $.each(data.Events, function () {
                var sw_event = {};
                var show_date = this.Date.substring(6, 18);
                sw_event['name'] = this.EventGroupName;
                sw_event['type'] = 'Theater';
                sw_event['location_summary'] = this.VenueName;
                sw_event['timestamp'] = show_date;
                sw_event['url'] = this.SwURL;
                sw_events.push(sw_event);
            });
        sw_events = sw_events.sort(dateSort.comparator);
        });

        $scope.events = sw_events;
    }
});

events_app.filter('findDateTime', function (formatDate) {
  return function (item) {
    if(item) {
        var show_date = new Date(parseInt(item+0000));
        var time = show_date.toString().substring(16,21);
        show_date = formatDate.yyyy_mm_dd(show_date);
        return show_date + ' @ ' + time;
    }
  };
});

events_app.filter('parseDateTime', function (formatDate) {
  return function (item) {
    if(item) {
        var show_date = new Date(item);
        var time = show_date.toString().substring(16,21);
        show_date = formatDate.yyyy_mm_dd(show_date);
        return show_date + ' @ ' + time;
    }
  };
});
