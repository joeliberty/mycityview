(function() {
'use strict';
//comment
// $( '#Aries' ).tooltip( "option", "content", "Awesome title!" );

var astro_app = angular.module('astro_app', []);

astro_app.controller("AstroCtrl", ['$scope', '$http',
  function($scope, $http) {
  $scope.horoscope = 'Choose your sign';

  $scope.call = function(sign) {
    // console.log('sign: ' + sign)
    $scope.horoscope = '';
    $('#astro_horoscope i').css('display', 'inline-block');
    $http({
      url: 'https://sender.blockspring.com/api_v2/blocks/dba3c2ca01c063df9cdf9fc6f0cf93f9?api_key=db81b1fa591380eb4110ff3093829176', 
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
}]);
})();


