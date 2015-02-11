'use strict';
$( '#Aries' ).tooltip( "option", "content", "Awesome title!" );

var astro_app = angular.module('astro_app', []);

astro_app.controller("AstroCtrl", function($scope, $http) {
  $scope.horoscope = 'Choose your sign';

  $scope.call = function(sign) {
    // console.log('sign: ' + sign)
    $scope.horoscope = '';
    $('#astro_horoscope i').css('display', 'inline-block');
    $http({
      url: '', 
      method: "POST",
      dataType: 'json',
      data: JSON.stringify({ sign: sign})
    })
    .success(function(data) {
      $('#astro_horoscope i').css('display', 'none');
      // console.log('data: ' + data)
      $scope.horoscope = data.horoscope;
    }); 
  };
});


