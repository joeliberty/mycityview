var news_app = angular.module('news_app', ['ui.bootstrap']);

news_app.controller("NewsCtrl", function($scope, $rootScope, $http) {
    $scope.isnews = false;
    var locnews = $scope.locnews;
    var url = 'http://api.feedzilla.com/v1/categories/' + $rootScope.newsdata.cat + '/subcategories/' + $rootScope.newsdata.subcat + '/articles.json'
    $http({
        url: url,
        dataType: 'json', 
        method: "GET"
    }).success(function(data) {
        if(data.articles != '') {
            $scope.localnews = data.articles;
            $scope.isnews = true;
        } else {
            // console.log('empty!!!')
            $scope.isnews = false;
            $scope.localnews = {"articles": {"title": "Sorry no local news available.", "summary": ""}};
        }
    }); 

    url = 'http://api.feedzilla.com/v1/categories/1071/articles.json'
    $http({
        url: url,
        dataType: 'json', 
        method: "GET"
    }).success(function(data) {
        $scope.sportsnews = data.articles;
    }); 

    url = 'http://api.feedzilla.com/v1/categories/1073/articles.json'
    $http({
        url: url,
        dataType: 'json', 
        method: "GET"
    }).success(function(data) {
        $scope.travelnews = data.articles;
    }); 

    url = 'http://api.feedzilla.com/v1/categories/1141/articles.json'
    $http({
        url: url,
        dataType: 'json', 
        method: "GET"
    }).success(function(data) {
        $scope.topnews = data.articles;
    }); 

    url = 'http://api.feedzilla.com/v1/categories/1082/articles.json'
    $http({
        url: url,
        dataType: 'json', 
        method: "GET"
    }).success(function(data) {
        $scope.entertainmentnews = data.articles;
    }); 

    url = 'http://api.feedzilla.com/v1/categories/1086/articles.json'
    $http({
        url: url,
        dataType: 'json', 
        method: "GET"
    }).success(function(data) {
        $scope.technews = data.articles;
    }); 

    url = 'http://api.feedzilla.com/v1/categories/1084/articles.json'
    $http({
        url: url,
        dataType: 'json', 
        method: "GET"
    }).success(function(data) {
        $scope.musicnews = data.articles;
    }); 

});

news_app.filter('removehtml', function () {
  return function (item) {
      return item.replace(/<[^>]*>/g, '');
  };
});

