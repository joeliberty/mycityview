'use strict';

var map_app = angular.module('map_app', []);

map_app.factory('mapService', function() {
  var mapService = {
    someData: 'hey'
  };
  return mapService;
});

map_app.controller("GetMapCtrl", function($scope, $rootScope, mapService) {
    // var self = this;
    $scope.shared = mapService;
    var t_city = $rootScope.city_id;
    var city_data = $rootScope.locs;
    // console.log('city_data: ' + city_data[t_city].lat)

    // console.log('in initialize')
    // var myLatlng = new google.maps.LatLng(city_data[t_city].lat,city_data[t_city].lon);
    $rootScope.lat_lng = new google.maps.LatLng(city_data[t_city].lat,city_data[t_city].lon);
    var mapOptions = {
        zoom: 13,
        center: $rootScope.lat_lng
    };

    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    var markers = [];
    $scope.$watch('lat_lng', function() {
        // setAllMap(null);
        var lat_lng = null;
        var scroll_to_map = false;
        if(typeof $rootScope.lat_lng === 'object') {
            lat_lng = $rootScope.lat_lng;
        } else {
            // Clear markers
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
            }
            var coord_array = $rootScope.lat_lng.split(',');
            var lat = coord_array[0];
            // console.log('lat: ' + lat)
            var lng = coord_array[1];
            // console.log('lng: ' + lng)
            lat_lng = new google.maps.LatLng(lat, lng);
            // console.log('lat_lng: ' + typeof lat_lng)
            scroll_to_map = true;
        }
        var marker = new google.maps.Marker({
            position: lat_lng,
            map: map
        });
        map.setCenter(marker.getPosition());
        markers.push(marker);
        // console.log('scroll_to_map: ' + scroll_to_map)
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
    
    // this.myvar = 0;
    $scope.change_lat_lng = function(point){
        // this.myvar = this.myvar + num;
        console.log('point: ' + point)
      // return this.tab === tabName;
    };

    // Copyright is hidden till last element is displayed
    $('#copyright').css('display', 'inline-block');
});

map_app.controller('SetLatLng', function ($scope, $rootScope) {
    $scope.isCollapsed = false;
    $scope.set_marker = function(location) {
        // console.log(location)
        // console.log(location.lat + ', ' + location.lng)
        var lat = null;
        var lng = null;
        for(var key in location) {
            if(location.hasOwnProperty(key)) {
                lng = (key == 'lng') ? location[key] : location['lon'];

                switch(key) {
                case 'lng':
                    lng = location[key];
                    break;
                case 'lon':
                    lng = location[key];
                    break;
                case 'longitude':
                    lng = location[key];
                    break;
                case 'lat':
                    lat = location[key];
                    break;
                case 'latitude':
                    lat = location[key];
                    break;
                }
            }
        }
        // console.log('lat: ' + lat + 'lng: ' + lng)
        $rootScope.lat_lng = lat + ', ' + lng;
    };
});