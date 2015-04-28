(function() {
'use strict';

var meetup_app = angular.module('meetup_app', []);

meetup_app.controller("meetupCtrl", ['$scope', '$rootScope', '$http',
    function($scope, $rootScope, $http) {
    var startdate = new Date();
    var now = new Date();
    var enddate = new Date(now);
    enddate = enddate.setDate(now.getDate()+5);
    enddate = new Date(enddate);
    var city = $rootScope.city;
    var state = $rootScope.state;
    var country = $rootScope.country;
    var city_data = $rootScope.locs;
    var t_city = $rootScope.city_id;
    var lat = city_data[t_city].lat;
    var lon = city_data[t_city].lon; 
    var url = 'https://api.meetup.com/2/open_events?callback=?&lat=' + lat + '&country=' + country + '&city=' + city + '&state=' + state + '&text=travel&lon=' + lon + '&key=5579136d5823c8054341258e452f';
    var arr = [];
    $('#meetup_spinner i').css('display', 'inline-block');
    $.getJSON(url, 
    function (data) {
        $('#meetup_spinner i').css('display', 'none');
        $.each(data.results, function (i, item) {
            if (item.time <= enddate) { 
                var event = {};
                event.city = city;
                event.name = item.name;
                event.group_name = item.group.name;
                event.description = item.description;
                event.join_mode = item.group.join_mode;
                event.who = item.group.who;
                event.why = typeof(item.why !== 'undefined') ? item.why : 0;
                event.how_to_find_us = typeof(item.how_to_find_us !== 'undefined') ? item.how_to_find_us : 0;
                if (typeof item.venue !== 'undefined') {
                    event.venue_name = typeof(item.venue.name !== 'undefined') ? item.venue.name : 0;
                    event.venue_address = typeof(item.venue.address !== 'undefined') ? item.venue.address : 0;
                    event.venue_city = typeof(item.venue.city !== 'undefined') ? item.venue.city : 0;
                    event.venue_phone = typeof(item.venue.phone !== 'undefined') ? item.venue.phone : 0;
                }
                var time = new Date(item.time).toString();
                event.time = time.slice(0, 21);
                if (typeof item.fee !== 'undefined') {
                    event.fee_amount = typeof(item.fee.amount !== 'undefined') ? item.fee.amount : 0;
                    event.fee_currency = typeof(item.fee.currency !== 'undefined') ? item.fee.currency : 0;
                    event.fee_description = typeof(item.fee.description !== 'undefined') ? item.fee.description : 0;
                }
                if (typeof item.venue !== 'undefined') {
                    var lat = typeof(item.venue.lat !== 'undefined') ? item.venue.lat : 0;
                    var lon = typeof(item.venue.lon !== 'undefined') ? item.venue.lon : 0;
                    if(item.venue.lat && item.venue.lon) {
                        event.point = {lat: lat, lon: lon};
                    }
                }
                arr.push(event);
            }
         });
        $scope.meetup_unavailable = (arr.length === 0) ? true : false;
        $scope.events = arr;
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

})();
