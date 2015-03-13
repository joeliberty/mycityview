'use strict';

var map_app = angular.module('map_app', ['events_app']);

map_app.factory('mapService', function() {
  var mapService = {
    someData: 'hey'
  };
  return mapService;
});

map_app.controller("GetMapCtrl", function($scope, $rootScope, mapService) {
    $scope.shared = mapService;
    var t_city = $rootScope.city_id;
    var city_data = $rootScope.locs;
    var mapExists = document.getElementById("map-canvas");
    if(mapExists) {
        var lat_lng = new google.maps.LatLng(city_data[t_city].lat,city_data[t_city].lon);

        var mapOptions = {
            zoom: 13,
            center: lat_lng
        };
        var markers = [];
        var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        var marker = new google.maps.Marker({
            position: lat_lng,
            map: map
        });
        map.setCenter(marker.getPosition());
        markers.push(marker);
    }

    $scope.change_lat_lng = function(point) {
        console.log(point.lat);
        // console.log(point.lng);
        // console.log($scope.map)
        // if(!$scope.map) {
        //     $scope.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        // }
        // for (var i = 0; i < $scope.markers.length; i++) {
        //     console.log($scope.markers[i])
        //     $scope.markers[i].setMap(null);
        // }
        $scope.marker.setMap(null);
        this. markers = [];
        console.log($scope.markers.length)

        // this.venue_lat_lng = new google.maps.LatLng(point.lat, point.lng);
        // $scope.marker = new google.maps.Marker({
        //     position: this.venue_lat_lng,
        //     map: $scope.map
        // });
        // $scope.marker.setMap($scope.map);
        // console.log($scope.marker)
        // $scope.map.setCenter($scope.marker.getPosition());
        // $scope.markers.push($scope.marker);

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