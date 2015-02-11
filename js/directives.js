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

    // app.directive("newsmovies", function() {
    //   return {
    //     restrict: 'E',
    //     templateUrl: "partials/newsmovies.html"
    //   };
    // });

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

    // app.directive("productSpecs", function() {
    //   return {
    //     restrict:"A",
    //     templateUrl: "product-specs.html"
    //   };
    // });

    app.directive("headerImage", function() {
      return {
        restrict: "E",
        templateUrl: "partials/header-image.html",
      };
    });

    // app.directive("productGallery", function() {
    //   return {
    //     restrict: "E",
    //     templateUrl: "product-gallery.html",
    //     controller: function() {
    //       this.current = 0;
    //       this.setCurrent = function(imageNumber){
    //         this.current = imageNumber || 0;
    //       };
    //     },
    //     controllerAs: "gallery"
    //   };
    // });
  })();
