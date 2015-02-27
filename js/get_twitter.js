var twitter_app = angular.module('twitter_app', []);

// twitter_app.factory('formatDate', function() {
//     return {
//         yyyy_mm_dd : function(today){
//         var day = today.getDate(today);
//         if(day < 10) {
//             day = '0' + day;
//         }
//         var month = today.getMonth(today) + 1;
//         if(month < 10) {
//             month = '0' + month;
//         }
//         var year = today.getFullYear(today);
//         return year + '-' + month + '-' + day; 
//         }  
//     }
// });

// twitter_app.factory('dateSort', function() {
//     return {
//         comparator : function (a,b){
//         if (a.timestamp < b.timestamp) return -1;
//         if (a.timestamp > b.timestamp) return 1;
//         return 0;
//         }
//     }
// });

twitter_app.controller("TwitterCtrl", function($scope, $rootScope, $http) {
    // var t_city = $rootScope.city_id;
    // var city_data = $rootScope.locs;
    // var point = city_data[t_city].lat + ',' + city_data[t_city].lon;
    // // Get todays date and format it.
    // var today = new Date();
    // today = formatDate.yyyy_mm_dd(today);
    // // Get tomorrows date and format it.
    // var now = new Date();
    // var tomorrow = new Date(now);
    // tomorrow = tomorrow.setDate(now.getDate()+1);
    // tomorrow = new Date(tomorrow);
    // tomorrow = formatDate.yyyy_mm_dd(tomorrow).toString();

    // $scope.events = { events: {name:'Sorry there are no events for ' + $rootScope.city + '.'}};

    // var decrypted = CryptoJS.AES.decrypt('U2FsdGVkX19chVesPhEt4kavFEA2gU1flPvBpDcAz0w=', "secret");
    // var pass_phrase = decrypted.toString(CryptoJS.enc.Utf8);
    
    
    // decrypted = CryptoJS.AES.decrypt('U2FsdGVkX18KWlc+LIQYiib9sGesYalJZCzXUUTravM=', pass_phrase);
    // var aid = decrypted.toString(CryptoJS.enc.Utf8);
    // $scope.events = { events: {name:'Retrieving Events'}};
    // url = 'https://api.twitter.com/1.1/search/tweets.json?q=melbourne%20au';
    $http({
        url: 'php/get_twitter.php',
        dataType: 'json', 
        method: "GET"
        
    }).success(function(data) {
        console.log('twitter')
        console.log(data['statuses'])
        $scope.twitter = data;
    }); 
});

// twitter_app.filter('findDateTime', function (formatDate) {
//   return function (item) {
//     if(item) {
//         var show_date = new Date(parseInt(item+0000));
//         var time = show_date.toString().substring(16,21);
//         show_date = formatDate.yyyy_mm_dd(show_date);
//         return show_date + ' @ ' + time;
//     }
//   };
// });

// twitter_app.filter('parseDateTime', function (formatDate) {
//   return function (item) {
//     if(item) {
//         var show_date = new Date(item);
//         var time = show_date.toString().substring(16,21);
//         show_date = formatDate.yyyy_mm_dd(show_date);
//         return show_date + ' @ ' + time;
//     }
//   };
// });
