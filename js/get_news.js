var news_app = angular.module('news_app', ['ui.bootstrap']);

news_app.controller("NewsCtrl", function($scope, $rootScope, $http) {
    $scope.isnews = false;
    var locnews = $scope.locnews;
    var url = ''
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

    url = ''
    $http({
        url: url,
        dataType: 'json', 
        method: "GET"
    }).success(function(data) {
        $scope.sportsnews = data.articles;
    }); 

    url = ''
    $http({
        url: url,
        dataType: 'json', 
        method: "GET"
    }).success(function(data) {
        $scope.travelnews = data.articles;
    }); 

    url = ''
    $http({
        url: url,
        dataType: 'json', 
        method: "GET"
    }).success(function(data) {
        $scope.topnews = data.articles;
    }); 

    url = ''
    $http({
        url: url,
        dataType: 'json', 
        method: "GET"
    }).success(function(data) {
        $scope.entertainmentnews = data.articles;
    }); 

    url = ''
    $http({
        url: url,
        dataType: 'json', 
        method: "GET"
    }).success(function(data) {
        $scope.technews = data.articles;
    }); 

    url = ''
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

