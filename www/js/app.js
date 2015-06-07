// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })

    .config(['$ionicConfigProvider', function ($ionicConfigProvider) {
        $ionicConfigProvider.tabs.position('bottom');
        $ionicConfigProvider.tabs.style('default');
        $ionicConfigProvider.navBar.alignTitle('center');
    }])

    .controller('ListController', ['$http', '$scope', function ($http, $scope) {
        var vm = this;
        $http.get('js/data.json').success(function (res) {
            vm.artists = res;
            vm.onItemDelete = function(item){
                vm.artists.splice(vm.artists.indexOf(item), 1);
            };
            vm.moveItem = function(item, fromIndex, toIndex){
                vm.artists.splice(fromIndex, 1);
                vm.artists.splice(toIndex, 0, item);
            };
            vm.toggleStar = function(item){
                item.star = !item.star
            };
            vm.doRefresh = function(){
                $http.get('js/data.json').success(function(res){
                    vm.artists = res;
                    $scope.$broadcast('scroll.refreshComplete');
                });
            }
        })
    }]);
