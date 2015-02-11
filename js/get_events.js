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
            // console.log('a: ' + a.timestamp)
            // console.log('b: ' + b.timestamp)
        if (a.timestamp < b.timestamp) return -1;
        if (a.timestamp > b.timestamp) return 1;
        return 0;
        }
    }
});

events_app.controller("EventsCtrl", function($scope, $rootScope, $http, formatDate, dateSort) {
    // $scope.shared = mapService; 
    // console.log('shared')
    // console.log($scope.shared)
    var t_city = $rootScope.city_id;
    var city_data = $rootScope.locs;
    // console.log('country: ' + $rootScope.country)
    var point = city_data[t_city].lat + ',' + city_data[t_city].lon;
    // console.log('point send: ' + point)
    // Get todays date and format it.
    var today = new Date();
    today = formatDate.yyyy_mm_dd(today);
    // console.log('today: ' + today)
    // Get tomorrows date and format it.
    var now = new Date();
    var tomorrow = new Date(now);
    tomorrow = tomorrow.setDate(now.getDate()+1);
    tomorrow = new Date(tomorrow);
    tomorrow = formatDate.yyyy_mm_dd(tomorrow).toString();
    // console.log('tomorrow: ' + tomorrow)

    $scope.events = { events: {name:'No Events'}};

    // http://api.eventfinda.com.au/v2/events.json?point=-37.8175,144.967&radius=10&start_date=2015-02-01&end_date=2015-02-03

    if($rootScope.country == 'au') {
        $scope.events = { events: {name:'Retrieving Events'}};
        var url = ''
        $http({
            url: url,
            dataType: 'json', 
            method: 'GET',
            params: {username: '',
                    password: '',
                    point: point,
                    radius: '100',
                    start_date: today,
                    end_date: tomorrow
                    }
        }).success(function(data) {
            
            $scope.events = data;
            // var grp_ob = data;
            // for(var key in grp_ob) {
            //     if(grp_ob.hasOwnProperty(key)) {
            //         // Gets all listings values
            //         // console.log(key + " -> " + ' value: '+grp_ob[key] );
            //         var event = grp_ob[key];
            //         for(var details in event) {
            //             if(event.hasOwnProperty(details)) {
            //                 // Gets all listings values
            //                 console.log(details + " -> " + ' value: '+event[details] );
            //             }
            //         }
            //     }
            // }
        

        }); 
    } 

    if($rootScope.country == 'us') {
        $scope.events = { events: {name:'Retrieving Events'}};
        url = ''
        $http({
            url: url,
            dataType: 'json', 
            method: "GET"
        }).success(function(data) {
            // console.log(data.events)
            $scope.events = data.events;
            // console.log($scope.events)
        }); 
    }
    var euro_countries = ['gb', 'fr', 'it', 'es'];
    var is_euro = 0;
    is_euro = euro_countries.indexOf($rootScope.country);
    // console.log('is_euro: ' + is_euro)
    // console.log('$rootScope.country: ' + $rootScope.country)
    if(is_euro != -1) {
        // if($rootScope.country == 'gb' || $rootScope.country == 'fr') {
        // var url = 'http://api-sandbox.seatwave.com/v2/discovery/events?apikey=af96e20b18044e8bb8e62152f134eec3&what=concerts&where=london&callback=?'
        // var url = 'http://api-sandbox.seatwave.com/v2/discovery/genres?apikey=af96e20b18044e8bb8e62152f134eec3&callback=?'
        // $.getJSON(url, null, function (webResponse) {
        //     console.log(webResponse.Events.length + ' genres returned');
        //         $.each(webResponse.Events, function () {
        //             this.Date.substring(6, 4);
        //             console.log(this.Date)
        //             // console.log(this)
        //             // console.log(this.Name);
        //             // console.log(this.Id);
        //         });

        // });

        $scope.events = { events: {name:'Retrieving Events'}};
        var sw_events = [];
        // var url = 'http://api-sandbox.seatwave.com/v2/discovery/events?apikey=af96e20b18044e8bb8e62152f134eec3&where=' + $rootScope.city + '&what=concerts&whenFrom=2015-02-06&whenTo=2015-02-07&callback=JSON_CALLBACK';
        var url = '';
        $http.jsonp(url).success(function(data) {
            console.log('euro_event:')
            console.log(data.Events.length)
            if(data.Events.length == 0) {
                $scope.events = { events: {name:'Sorry not events for ' + $rootScope.city +'.'}};
            }
            // console.log(data.Events[0].Date)
            // var start_date =  data.Events[0].Date.substring(6, 18);
            // start_date = new Date(parseInt(start_date+0000));
            // console.log('start_date: ' + start_date)

            // var sw_events = [];
            var event_total = 30;
            var event_cnt = 0;
            $.each(data.Events, function () {
                var sw_event = {};
                // console.log('date: ' + this.Date)
                var show_date = this.Date.substring(6, 18);
                // console.log(new Date(parseInt(show_date+0000)))
                // show_date = new Date(parseInt(show_date+0000));
                // var end_date = new Date(now);
                // end_date = end_date.setDate(now.getDate()+30);
                // end_date = new Date(end_date);
                // console.log('end_date: ' + end_date)
                
                // console.log('show_date: ' + show_date)
                // if(show_date <= end_date) {
                // if(event_cnt <= event_total) {
                    // console.log(this.EventGroupName)
                    sw_event['name'] = this.EventGroupName;
                    // console.log(this.VenueName)
                    sw_event['location_summary'] = this.VenueName;
                    sw_event['type'] = 'Music';
                    // show_date = formatDate.yyyy_mm_dd(show_date);
                    sw_event['timestamp'] = show_date;

                    // console.log(this.SwURL);
                    sw_event['url'] = this.SwURL;
                    sw_events.push(sw_event);
                    
                // }
                
            });
        sw_events = sw_events.sort(dateSort.comparator);
        // console.log(sw_events.toString())
            // console.log(sw_events);
        // $scope.events = sw_events;
        // console.log($scope.events)
            
        });

        var url = '';
        $http.jsonp(url).success(function(data) {
            // var sw_events = [];
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
        // $scope.events = sw_events;
        });

        var url = '';
        $http.jsonp(url).success(function(data) {
            // var sw_events = [];
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
        // $scope.events = sw_events;
        });

        $scope.events = sw_events;
    }

    // url = 'http://api.feedzilla.com/v1/categories/1141/articles.json'
    // $http({
    //     url: url,
    //     dataType: 'json', 
    //     method: "GET"
    // }).success(function(data) {
    //     // console.log(data.articles)
    //     $scope.topnews = data.articles;
    // }); 
});

events_app.filter('findDateTime', function (formatDate) {
  return function (item) {
    if(item) {
        // console.log('item: ' + item)
        var show_date = new Date(parseInt(item+0000));
        // console.log('show_date: ' + show_date)
        var time = show_date.toString().substring(16,21);
        // console.log('time: ' + time);
        show_date = formatDate.yyyy_mm_dd(show_date);
        // console.log('show_date: ' + show_date)
        return show_date + ' @ ' + time;
        // console.log('item: ' + item)
          // return item.replace(/(&nbsp)*/g,"");
    }
  };
});



