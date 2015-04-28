(function() {
'use strict';
var quote_app = angular.module('quote_app', []);

quote_app.controller("QuoteCtrl", ['$scope', '$http',
  function($scope, $http) {
  var self = this;
  var less_len = 300; 
  var quotes = [];
    $http.get('js/quotes.json').success(function(data){
      $.each(data, function () {
        var quote = {};
        quote.quote = this.quote;
        quote.author = this.author;
        quotes.push(quote);
      });
      /* choose random quote */
      var rand_num = Math.floor((Math.random() * quotes.length));
      var rand_quote = quotes[rand_num];
      $scope.fullquote = rand_quote.quote;
      $scope.author = '--' + rand_quote.author;
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
      if($scope.toggle_quote) { 
        $scope.toggle_quote = false;
        self.get_less_n_more('more');
      } else {
         $scope.toggle_quote = true;
         self.get_less_n_more('less');
      }

    };
}]);

})();