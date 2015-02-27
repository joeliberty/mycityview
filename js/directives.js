(function(){
    var app = angular.module('mycity-directives', []);

    app.directive("dayAstroQuote", function() {
      return {
        restrict: 'E',
        templateUrl: "partials/day-astro-quote.html"
      };
    });

    app.directive("header", function() {
      return {
        restrict: 'E',
        templateUrl: "partials/header.html"
      };
    });

    app.directive("forcast", function() {
      return {
        restrict: 'E',
        templateUrl: "partials/forcast.html"
      };
    });

    app.directive("news-movies", function() {
      return {
        restrict: 'E',
        templateUrl: "partials/news-movies.html"
      };
    });

    app.directive("yelp", function() {
      return {
        restrict: 'E',
        templateUrl: "partials/yelp.html"
      };
    });

    app.directive("news", function() {
      return {
        restrict: 'E',
        templateUrl: "partials/news.html"
      };
    });

    app.directive("movies", function() {
      return {
        restrict: 'E',
        templateUrl: "partials/movies.html"
      };
    });

    app.directive("map", function() {
      return {
        restrict: 'E',
        templateUrl: "partials/map.html"
      };
    });

    app.directive("events", function() {
      return {
        restrict: 'E',
        templateUrl: "partials/events.html"
      };
    });

    app.directive("headerImage", function() {
      return {
        restrict: "E",
        templateUrl: "partials/header-image.html",
      };
    });

    app.directive("places", function() {
      return {
        restrict: 'E',
        templateUrl: "partials/places.html"
      };
    });
    app.directive("credits", function() {
      return {
        restrict: 'E',
        templateUrl: "partials/credits.html"
      };
    });
    app.directive("twitter", function() {
      return {
        restrict: 'E',
        templateUrl: "partials/twitter.html"
      };
    });
})();
