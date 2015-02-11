'use strict';
var quote_app = angular.module('quote_app', []);

quote_app.controller("QuoteCtrl", function($scope, $http) {
  var self = this;
  var less_len = 200; 
    $http({
        url: //'http://www.stands4.com/services/v2/quotes.php?uid=3768&tokenid=dGAXbfKpGt0NioC9&searchtype=random',
        // url: 'http://api.theysaidso.com/qod.json',
        // 'http://www.iheartquotes.com/api/v1/random?format=json',
        'get_quote.php',
        dataType: 'json', 
        method: "GET",
        params: {}
    }).success(function(data) {
      // console.log('data: ' + data)

      $scope.fullquote = data.quote;
      $scope.author = '--' + data.author;

      /*
      * Use this for www.stands4.com
      var q_start = data.indexOf("<quote>") + 7;
      var q_end = data.indexOf("</quote>");
      $scope.fullquote = data.substring(q_start, q_end);
      var a_start = data.indexOf("<author>") + 8;
      var a_end = data.indexOf("</author>");
      $scope.author = '--' + data.substring(a_start, a_end);
      */

      $scope.toggle_quote = true;
      if($scope.fullquote.length <= less_len) {
        $scope.quote = $scope.fullquote;
      } else {
        self.get_less_n_more('less');
      }
      
    }); 

    this.get_less_n_more = function(state) {
      // console.log('quote: ' + $scope.fullquote)
      // console.log('$scope.toggle_quote: ' + $scope.toggle_quote)
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





// http://api.theysaidso.com/qod.json