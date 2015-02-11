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
      url: , 
      method: "POST",
      dataType: 'json',
      data: JSON.stringify({ sign: sign})
    })
    .success(function(data) {
      $('#astro_horoscope i').css('display', 'none');
      // console.log('data: ' + data)
      $scope.horoscope = data.horoscope;
    }); 

    // $http({
    //   url: 'http://localhost/bootstrap/get_astro.php', 
    //   method: "GET",
    //   params: {sign: sign}
    // })
    // .success(function(data) {
    //   var data_array = jQuery.parseJSON(data);
    //   var data_array = eval('(' + data_array + ')');
    //   var type = Object.prototype.toString.call(data_array);
    //   $('#astro_forcast i').css('display', 'none');
    //   $scope.forcast = data_array.horoscope.horoscope;
    //   // console.log('forcast: ' + $scope.forcast)
    // }); 

    // $.ajax({
    //   url: "https://sender.blockspring.com/api_v2/blocks/dba3c2ca01c063df9cdf9fc6f0cf93f9?api_key=db81b1fa591380eb4110ff3093829176",
    //   type: "POST",
    //   contentType: "application/json",
    //   data: JSON.stringify({ sign: sign}),
    //   crossDomain: true
    // }).done(function(response){
    //   $('#astro_forcast').text(response);
    //   console.log(response);
    // });
  };

});


