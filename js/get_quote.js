'use strict';
var quote_app = angular.module('quote_app', []);

quote_app.controller("QuoteCtrl", function($scope, $http) {
  var self = this;
  var less_len = 200; 
    $http({
        url: 'php/get_quote.php',
        dataType: 'json', 
        method: "GET",
        params: {}
    }).success(function(data) {
      console.log('data: ' + data)

      $scope.fullquote = data.quote;
      $scope.author = '--' + data.author;

      $scope.toggle_quote = true;
      if($scope.fullquote.length <= less_len) {
        $scope.quote = $scope.fullquote;
      } else {
        self.get_less_n_more('less');
      }
      
    }); 

    this.get_less_n_more = function(state) {
      if(state == 'less') {
         $scope.quote = $scope.fullquote.substring(0, less_len) + '<span class=more>... more</span>';
      } else {
        $scope.quote = $scope.fullquote.substring(0 , $scope.fullquote.length) + '<span class=less> less</span>';
      }
    };

    $scope.toggle_more_less = function() {
      console.log('$scope.toggle_quote:' + $scope.toggle_quote)
      if($scope.toggle_quote) { 
        $scope.toggle_quote = false;
        self.get_less_n_more('more');
      } else {
         $scope.toggle_quote = true;
         self.get_less_n_more('less');
      }

    }
});