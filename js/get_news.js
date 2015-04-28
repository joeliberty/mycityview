(function() {
'use strict';
var news_app = angular.module('news_app', ['ui.bootstrap']);

news_app.controller("NewsCtrl", ['$scope', '$rootScope', '$http',
    function($scope, $rootScope, $http) {
    /* Make the tabs container visible. */
    $('.tabs_container').css('visibility', 'visible');
    $scope.isnews = false;
    var locnews = $scope.locnews;
    var url = 'http://api.feedzilla.com/v1/categories/' + $rootScope.newsdata.cat + '/subcategories/' + $rootScope.newsdata.subcat + '/articles.json';
    $('#local_spinner i').css('display', 'inline-block');
    $http({
        url: url,
        dataType: 'json', 
        method: "GET"
    }).success(function(data) {
        // console.log('data: ' + data)
        $('#local_spinner i').css('display', 'none');
        if(data.articles !== '') {
            $scope.localnews = data.articles;
            $scope.isnews = true;
        } else {
            // console.log('empty!!!')
            $scope.isnews = false;
            $scope.localnews = {"articles": {"title": "Sorry no local news is unavailable at this time.", "summary": ""}};
        }
    }); 

    url = 'http://api.feedzilla.com/v1/categories/1071/articles.json';
    $('#sports_spinner i').css('display', 'inline-block');
    $http({
        url: url,
        dataType: 'json', 
        method: "GET"
    }).success(function(data) {
        $('#sports_spinner i').css('display', 'none');
        $scope.sportsnews = data.articles;
    }); 

    url = 'http://api.feedzilla.com/v1/categories/1073/articles.json';
    $('#travel_spinner i').css('display', 'inline-block');
    $http({
        url: url,
        dataType: 'json', 
        method: "GET"
    }).success(function(data) {
        $('#travel_spinner i').css('display', 'none');
        $scope.travelnews = data.articles;
    }); 

    url = 'http://api.feedzilla.com/v1/categories/1141/articles.json';
    $('#world_spinner i').css('display', 'inline-block');
    $http({
        url: url,
        dataType: 'json', 
        method: "GET"
    }).success(function(data) {
        $('#world_spinner i').css('display', 'none');
        $scope.topnews = data.articles;
    }); 

    url = 'http://api.feedzilla.com/v1/categories/1082/articles.json';
    $('#entertainment_spinner i').css('display', 'inline-block');
    $http({
        url: url,
        dataType: 'json', 
        method: "GET"
    }).success(function(data) {
        $('#entertainment_spinner i').css('display', 'none');
        $scope.entertainmentnews = data.articles;
    }); 

    url = 'http://api.feedzilla.com/v1/categories/1086/articles.json';
    $('#tech_spinner i').css('display', 'inline-block');
    $http({
        url: url,
        dataType: 'json', 
        method: "GET"
    }).success(function(data) {
        $('#tech_spinner i').css('display', 'none');
        $scope.technews = data.articles;
    }); 

    url = 'http://api.feedzilla.com/v1/categories/1084/articles.json';
    $('#music_spinner i').css('display', 'inline-block');
    $http({
        url: url,
        dataType: 'json', 
        method: "GET"
    }).success(function(data) {
        $('#music_spinner i').css('display', 'none');
        $scope.musicnews = data.articles;
    }); 

}]);

news_app.filter('removehtml', function () {
  return function (item) {
      return item.replace(/<[^>]*>/g, '');
  };
});
})();

