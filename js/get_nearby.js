(function() {
'use strict';
var nearby_app = angular.module('nearby_app', []);

nearby_app.controller("NearbyCtrl", ['$scope', '$rootScope',
  function($scope, $rootScope) {
  $scope.message = 'Select a place to find.';
  //get lat-lng location
  $scope.getCoordinates = function(what){
    $scope.what = what;
    $scope.set_message('Finding nearby ' + what + '...');
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        $rootScope.user_lat = position.coords.latitude;
        $rootScope.user_lng = position.coords.longitude;
        
        $scope.find_nearby($rootScope.user_lat, $rootScope.user_lng, what);
      },
        function() {
        handleNoGeolocation(true);
      });
    } else {
      // Browser doesn't support Geolocation
      handleNoGeolocation(false);
    }
  };

  function handleNoGeolocation(errorFlag) {
    var content;
    if (errorFlag) {
      content = 'Error: The Geolocation service failed.';
    } else {
      content = 'Error: Your browser doesn\'t support geolocation.';
    }
    $scope.set_message(content);
  }

  $scope.set_message = function(message) {
    $scope.message = message;
  };

  $scope.find_nearby = function(lat, lng, what) {
    clearMarkers();
    var pyrmont = new google.maps.LatLng(lat, lng);
    var bounds = new google.maps.LatLngBounds();
    var lat_lng = new google.maps.LatLng(lat, lng);
    var user_marker = new google.maps.Marker({
            position: lat_lng,
            map: $rootScope.map
    });
    bounds.extend(user_marker.getPosition()); // Add user loc to bounds
    $rootScope.map.setCenter(user_marker.getPosition());
    $rootScope.markers.push(user_marker);


    var request = {
      location: pyrmont,
      // radius: 500,
      rankBy: google.maps.places.RankBy.DISTANCE,
      // rankBy: google.maps.places.RankBy.PROMINENCE,
      types: [what]
    };

    var infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService($('#for_places').get(0));
    service.nearbySearch(request, callback);

    function callback(results, status) {
      if(!results.length) {
        $scope.set_message("Sorry there were no " + what + "'s found in 500 meters of your area.");
      } else {
        var item = (results.length > 1) ? 'locations' : 'location';
        $scope.set_message('Found ' + results.length +' ' + item + ' for ' + $scope.what + '.');
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            $scope.createMarker(results[i], service);
          }
          $rootScope.map.fitBounds(bounds);
        }
      }
    }

    function clearMarkers() {
      for (var i = 0; i < $rootScope.markers.length; i++) {
      $rootScope.markers[i].setMap(null);
      }
    }

    $scope.getDetails = function(place, service) {
      var request = { placeId: place.place_id };
      service.getDetails(request, function(place, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          if(typeof place.formatted_phone_number !== 'undefined') {
            var num = place.formatted_phone_number;
            num = num.replace(/ /g, '');
            num = num.replace('(', '');
            num = num.replace(')', '');
            if(place.formatted_phone_number) {
              $('#info_win_phone_detail').html('<a href=tel:' + num + '>ph: ' + place.formatted_phone_number + '</a>');
            }
            if(place.website) {
              $('#info_win_website').html('<a href="' + place.website + '"  target="blank">' + 'website' + '</a>');
            }
          }
        } else {
          console.log('got error');
        }
      });
    };

    $scope.createMarker = function(place, service) {
      var pinColor = "009933";
      var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
        new google.maps.Size(21, 34),
        new google.maps.Point(0,0),
        new google.maps.Point(10, 34));
      var placeLoc = place.geometry.location;
      var marker = new google.maps.Marker({
        map: $rootScope.map,
        position: place.geometry.location,
        icon: pinImage
      });
      bounds.extend(marker.getPosition()); //Add marker locs to bounds
      $rootScope.markers.push(marker);
      
      google.maps.event.addListener(marker, 'click', function() {

        $scope.getDetails(place, service);

        var message = '';
        message += '<div><strong>' + place.name + '</strong><br/>';
        if(place.rating) { message += 'Rating: ' + place.rating + '<br/>'; }
        if(place.price_level) { message += 'Price Level: ' + place.price_level + '<br/>'; }
        if(place.opening_hours) {
          var isOpen = (place.opening_hours.open_now) ? 'Yes' : 'No';
          message += 'Open: ' + isOpen + '<br/>';
        }

        if(place.vicinity) { message +=  place.vicinity + '<br/>'; }
        message += "<p><span id='info_win_phone_detail'></span>";
        message += "<span style='padding-left:12px;' id='info_win_website'></span></p>";

        
        infowindow.setContent(message);
        infowindow.open($rootScope.map, this);
      
      });

    };

  
  };

  $scope.places = ['airport', 'aquarium', 'art_gallery', 'atm', 'bakery', 'bank', 'bar', 'beauty_salon', 'bicycle_store', 'book_store', 'bowling_alley', 'bus_station', 'cafe', 'campground', 'car_dealer', 'car_rental', 'car_repair', 'car_wash', 'casino', 'church', 'clothing_store', 'convenience_store', 'dentist', 'department_store', 'doctor', 'electrician', 'electronics_store', 'fire_station', 'florist', 'food', 'furniture_store', 'gas_station',  'grocery_or_supermarket', 'gym', 'hair_care', 'hardware_store', 'hindu_temple', 'home_goods_store', 'hospital', 'jewelry_store', 'laundry', 'library', 'liquor_store', 'locksmith', 'lodging', 'meal_delivery', 'meal_takeaway', 'mosque', 'movie_rental', 'movie_theater', 'museum', 'night_club', 'park', 'parking', 'pet_store', 'pharmacy', 'place_of_worship', 'police', 'post_office', 'restaurant', 'rv_park', 'school', 'shoe_store', 'shopping_mall', 'spa', 'store', 'subway_station', 'synagogue', 'taxi_stand', 'train_station', 'university', 'veterinary_care', 'zoo'];

  $scope.status = {
    isopen: false
  };

  $scope.toggled = function(open) {
    $log.log('Dropdown is now: ', open);
  };

  $scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  };

}]); // end controller

nearby_app.filter('remove_underscore', function () {
  return function (item) {
    if(item.indexOf('_') == -1) {
      return item;
    } else {
      return item.replace(/_/g, ' ');
    } 
  };
});

})();