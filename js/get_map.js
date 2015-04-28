(function() {
'use strict';

var map_app = angular.module('map_app', []);

map_app.controller("GetMapCtrl", ['$scope', '$rootScope',
    function($scope, $rootScope) {
    var t_city = $rootScope.city_id;
    var city_data = $rootScope.locs;
    var city_state_country = $rootScope.city_state_country;

    $rootScope.lat_lng = new google.maps.LatLng(city_data[t_city].lat,city_data[t_city].lon);
    $rootScope.zoom = 13;
    var mapOptions = {
        zoom: 13,
        center: $rootScope.lat_lng
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    $rootScope.map = map;
    var markers = [];
    $rootScope.markers = markers;
    var marker = '';
    // var geocoder = new google.maps.Geocoder();

    // Might need this later so leave it here for now.
    // geocoder.geocode( { 'address': city_state_country}, function(results, status) {
    //     if (status == google.maps.GeocoderStatus.OK) {
    //       map.setCenter(results[0].geometry.location);
    //       marker = new google.maps.Marker({
    //           map: map,
    //           position: results[0].geometry.location
    //       });
    //       markers.push(marker);
    //       console.log('first zoom')
    //         map.setZoom(13);
    //     } else {
    //       alert('Geocode was not successful for the following reason: ' + status);
    //     }
    // });
    
    /*
    * Watch for change on $rootScope.lat_lng and update marker on map.
    */
    // var markers = [];
    $scope.$watch('lat_lng', function() {
        var lat_lng = null;
        var scroll_to_map = false;
        if(typeof $rootScope.lat_lng === 'object') {
            /*
            * Check to see if loading the map for the first time.
            */
            lat_lng = $rootScope.lat_lng;
        } else {
            // Clear markers
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
            }
            var coord_array = $rootScope.lat_lng.split(',');
            var lat = coord_array[0];
            var lng = coord_array[1];
            lat_lng = new google.maps.LatLng(lat, lng);
            scroll_to_map = true;
        }
        marker = new google.maps.Marker({
            position: lat_lng,
            map: map
        });
        map.setZoom($rootScope.zoom);
        map.setCenter(marker.getPosition());
        markers.push(marker);
        if(scroll_to_map) {
            // Scroll browser window to foucus google map
            var el = $('#map_container');
            var elOffset = el.offset().top;
            var elHeight = el.height();
            var windowHeight = $(window).height();
            var offset;

            if (elHeight < windowHeight) {
                offset = elOffset - ((windowHeight / 2) - (elHeight / 2));
            } else {
                offset = elOffset;
            }
            var speed = 700;
            $('html, body').animate({scrollTop:offset}, speed);
        }
    });
    
    // Used with get_map_service.js
    // $scope.change_lat_lng = function(point){
    //     console.log('point: ' + point)
    // };

    // Copyright is hidden till last element is displayed
    $('#copyright').css('display', 'inline-block');
}]);

map_app.controller('SetLatLng', ['$scope', '$rootScope',
    function ($scope, $rootScope) {
    $scope.isCollapsed = false;
    $scope.set_marker = function(loc1, loc2) {
        /*
        * Latitude and longitude are dependent on the datasource.
        * Until there is a better solution, sort them out here 
        * yelp: longitude
        * seatGeek: lon
        * eventFinda: lng
        */
        var lat, lng;
        if(typeof loc1 == 'object') {
            lat = null;
            lng = null;
            for(var key in loc1) {
                if(loc1.hasOwnProperty(key)) {
                    switch(key) {
                    case 'F':
                        lng = loc1[key];
                        break;
                    case 'lng':
                        lng = loc1[key];
                        break;
                    case 'lon':
                        lng = loc1[key];
                        break;
                    case 'longitude':
                        lng = loc1[key];
                        break;
                    case 'A':
                        lat = loc1[key];
                        break;
                    case 'lat':
                        lat = loc1[key];
                        break;
                    case 'latitude':
                        lat = loc1[key];
                        break;
                    case 'k':
                        lat = loc1[key];
                        break;
                    case 'D':
                        lng = loc1[key];
                        break;
                    }
                }
            }
        } else {
            lat = loc1;
            lng = loc2;
        }
        // console.log('lat: ', lat , ' lng: ', lng)
        $rootScope.lat_lng = lat + ', ' + lng;
        $rootScope.zoom = 18;
    };
}]);
})();