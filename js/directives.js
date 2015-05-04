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

    app.directive("faroo", function() {
      return {
        restrict: 'E',
        templateUrl: "partials/faroo.html"
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

    app.directive("meetup", function() {
      return {
        restrict: 'E',
        templateUrl: "partials/meetup.html"
      };
    });

    app.directive("rates", function() {
      return {
        restrict: 'E',
        templateUrl: "partials/rates.html"
      };
    });

    app.directive("nearby", function() {
      return {
        restrict: 'E',
        templateUrl: "partials/nearby.html"
      };
    });

    app.directive("navbar", function() {
      return {
        restrict: 'E',
        templateUrl: "partials/navbar.html"
      };
    });

    app.directive('imageonload', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('load', function() {
                $('#image_spinner, #image_spinner i').css('display', 'none');
                $('#header_image img').css('display', 'block');
            });
        }
    };
});
})();
