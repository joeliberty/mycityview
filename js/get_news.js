var news_app = angular.module('news_app', ['ui.bootstrap']);

// var locs = {
//     "Santa_Fe": {"cat":7, "subcat":294}
// }

news_app.controller("NewsCtrl", function($scope, $rootScope, $http) {
      //   $scope.selectedItem = '';

      // $scope.SetLocation = function(event) {
      //   $scope.selectedItem = event;
      //   console.log('set: ' + $scope.selectedItem)
      // }
    // var url = 'http://api.feedzilla.com/v1/categories/547/subcategories/21594/articles.json'
    $scope.isnews = false;
    var locnews = $scope.locnews;
    var url = 
    $http({
        url: url,
        dataType: 'json', 
        method: "GET"
    }).success(function(data) {
        // console.log(data)
        if(data.articles != '') {
            $scope.localnews = data.articles;
            $scope.isnews = true;
        } else {
            // console.log('empty!!!')
            $scope.isnews = false;
            $scope.localnews = {"articles": {"title": "Sorry no local news available.", "summary": ""}};
        }
        // console.log('localnews: ' + $scope.localnews)
    }); 

    url = 'http://api.feedzilla.com/v1/categories/1071/articles.json'
    $http({
        url: url,
        dataType: 'json', 
        method: "GET"
    }).success(function(data) {
        // console.log(data.articles)
        $scope.sportsnews = data.articles;
    }); 

    url = 'http://api.feedzilla.com/v1/categories/1073/articles.json'
    $http({
        url: url,
        dataType: 'json', 
        method: "GET"
    }).success(function(data) {
        // console.log(data.articles)
        $scope.travelnews = data.articles;
    }); 

    url = 'http://api.feedzilla.com/v1/categories/1141/articles.json'
    $http({
        url: url,
        dataType: 'json', 
        method: "GET"
    }).success(function(data) {
        // console.log(data.articles)
        $scope.topnews = data.articles;
    }); 

    url = 'http://api.feedzilla.com/v1/categories/1082/articles.json'
    $http({
        url: url,
        dataType: 'json', 
        method: "GET"
    }).success(function(data) {
        // console.log(data.articles)
        $scope.entertainmentnews = data.articles;
    }); 

    url = 'http://api.feedzilla.com/v1/categories/1086/articles.json'
    $http({
        url: url,
        dataType: 'json', 
        method: "GET"
    }).success(function(data) {
        // console.log(data.articles)
        $scope.technews = data.articles;
    }); 

    url = 'http://api.feedzilla.com/v1/categories/1084/articles.json'
    $http({
        url: url,
        dataType: 'json', 
        method: "GET"
    }).success(function(data) {
        // console.log(data.articles)
        $scope.musicnews = data.articles;
    }); 

});

news_app.filter('removehtml', function () {
  return function (item) {
    // console.log('fitem: ' + item)
      return item.replace(/<[^>]*>/g, '');
  };
});

