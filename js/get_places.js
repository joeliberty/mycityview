'use strict';
var places_app = angular.module('places_app', []);

places_app.controller("PlacesCtrl", function($scope, $http, $rootScope) {
  var t_city = $rootScope.city_id;
  var city_data = $rootScope.locs;
  var pyrmont = new google.maps.LatLng(city_data[t_city].lat,city_data[t_city].lon);
  var request = {
    location: pyrmont,
    radius: 500,
    types: ['amusement_park','aquarium','art_gallery','casino','gym','library', 'movie_theater', 'museum','night_club','park','shopping_mall','spa','stadium','train_station','zoo']
  };
  var service = new google.maps.places.PlacesService($('#for_places').get(0));
  service.nearbySearch(request, callback);

function callback(results, status, pagination) {
  if (status != google.maps.places.PlacesServiceStatus.OK) {
    return;
  } else {
    var places_service = new google.maps.places.PlacesService($('#for_places').get(0));

    /* Slow request to 1 every half sec */
    $scope.places = [];
    for (var i = 0; i < results.length; i++) {
       (function(ind) {
           setTimeout(function(){
            // console.log(ind);
            // console.log(results[ind].place_id)
            var request = {
              placeId: results[ind].place_id
            };
            places_service.getDetails(request, function(place, status) {
              if (status == google.maps.places.PlacesServiceStatus.OK) {
                // console.log(place)
                $scope.places.push(place);
              } else {
                console.log('got error')
              }
            });
          }, 1000 + (500 * ind));
       })(i);
    }

    // createMarkers(results);

    // if (pagination.hasNextPage) {
    //   var moreButton = document.getElementById('more');

    //   moreButton.disabled = false;

    //   google.maps.event.addDomListenerOnce(moreButton, 'click',
    //       function() {
    //     moreButton.disabled = true;
    //     pagination.nextPage();
    //   });
    //}
  }
}



// function createMarkers(places) {
//   var bounds = new google.maps.LatLngBounds();

//   for (var i = 0, place; place = places[i]; i++) {
//     var image = {
//       url: place.icon,
//       size: new google.maps.Size(71, 71),
//       origin: new google.maps.Point(0, 0),
//       anchor: new google.maps.Point(17, 34),
//       scaledSize: new google.maps.Size(25, 25)
//     };

//     var marker = new google.maps.Marker({
//       map: map,
//       icon: image,
//       title: place.name,
//       position: place.geometry.location
//     });

//     placesList.innerHTML += '<li>' + place.name + '</li>';

//     bounds.extend(place.geometry.location);
//   }
//   map.fitBounds(bounds);
// }
});

places_app.filter('formatType', function () {
  return function (item) {
    if(item.indexOf('_') == -1) {
      return item;
    } else {
      var type_array = item.split('_');
      var str = '';
      for (var i = 0; i < type_array.length; i++) {
        var word = type_array[i];
        word = word.charAt(0).toUpperCase() + word.slice(1);
        str += word + ' ';
      } 
      return str;
    }
  };
});