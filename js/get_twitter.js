(function() {
'use strict';

var twitter_app = angular.module('twitter_app', []);

twitter_app.factory('formatText', function() {
    return {
        add_links : function(item, link_type){
            var done = false;
            var str = item;
            var x = 0;
            while(!done) {
                var url_start = str.indexOf(link_type);
                if(url_start == -1 || x > 100) {
                    done = true;
                    return item;
                }
                var url = str.substring(url_start);
                var url_end = url.indexOf(' ');
                var link = '';
                if(url_end == -1) {url_end = str.length;}
                url = url.substring(0, url_end);
                switch(link_type) {
                    case 'http':
                        link = '<a href=' + url + ' target="blank">' + url.substring(7) + '</a>';
                        break;
                    case '#':
                        link = '<a href=https://twitter.com/hashtag/' + url.substring(1) + '?src=hash target="blank">' + url.substring(0) + '</a>';
                        break;
                    case '@':
                        link = '<a href=https://twitter.com/' + url.substring(1) + ' target="blank">' + url.substring(0) + '</a>';
                        break;
                }
                var chomp = parseInt(url_start + url_end);
                str = str.substring(chomp);
                item = item.replace(url, link);
                x +=  1;
            } 
        }  
    };
});

twitter_app.controller("TwitterCtrl", ['$scope', '$rootScope', '$http',
    function($scope, $rootScope, $http) {
    var city_state_country = '';
    var t_city = $rootScope.city.replace(" ", "%20");
    if($rootScope.state) {
        city_state_country = '%23' + t_city +'%20'+ $rootScope.state;
    } else {
        city_state_country = '%23' + t_city +'%20'+$rootScope.country;
    }
    $('#twitter_spinner i').css('display', 'inline-block');
    $http({
        url: 'php/get_twitter.php',
        dataType: 'json',
        params: {q: city_state_country},
        method: "GET"
        
    }).success(function(data) {
        $('#twitter_spinner i').css('display', 'none');
        $scope.tweets = data;
    }); 
}]);

twitter_app.filter('addUrls', function ($sce, formatText) {
  return function (item) {
    if(item) {
        item = formatText.add_links(item, 'http');
        item = formatText.add_links(item, '#');
        item = formatText.add_links(item, '@');
        return $sce.trustAsHtml(item);
    }
  };
});
})();
