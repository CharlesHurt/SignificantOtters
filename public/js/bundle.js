'use strict'

var app = angular.module('S-O-App', ['ui.router'])

// Put this config before defining the controllers
 app.config(function($stateProvider, $urlRouterProvider) {

   //console.log($stateProvider);
   $stateProvider
     .state('homeState',
       {url: '/home',
       templateUrl: 'partials/home.html',
       controller:"userController"})
     .state('loginState'/*simple name no slash */,
       {url: '/login' /* what the user would see on URL */,
       templateUrl: 'partials/login.html',
       controller:"userController"})
     .state('registerState'/*simple name no slash */,
       {url: '/register' /* what the user would see on URL */,
       templateUrl: 'partials/register.html',
       controller:"userController"})
     .state('profileState'/*simple name no slash */,
       {url: '/profile' /* what the user would see on URL */,
       templateUrl: 'partials/profile.html',
       controller:"userController"})
     .state('browseState'/*simple name no slash */,
       {url: '/browse' /* what the user would see on URL */,
       templateUrl: 'partials/browse.html',
       controller:"userController"})
     .state('chatState'/*simple name no slash */,
       {url: '/chat' /* what the user would see on URL */,
       templateUrl: 'partials/chat.html',
       controller:"userController"})

   $urlRouterProvider.otherwise('/')
 })


// This is after .config, but not often used
//app.run...

app.controller("userController", function($scope, $state, registerService) {
  //$scope.x = 42
  // $scope.firstName;
  // $scope.lastName;
  // $scope.regPwd;
  $scope.getState = function() {
    return $state.current.name
  }

  $scope.gotoHomeState = function() {
    $state.go("homeState")
    console.log($state.current.name) // This returns ALL state objects, so ask who is active
  }
  $scope.gotoLoginState = function() {
    $state.go("loginState")
  }
  $scope.gotoRegisterState = function() {
    $state.go("registerState")
  }
  $scope.gotoProfileState = function() {
    $state.go("profileState")
  }
  $scope.gotoBrowseState = function() {
    $state.go("browseState")
  }
  $scope.gotoChatState = function() {
    $state.go("chatState")
  }

  $scope.registerNewPerson = function() {
    console.log('calling registerService here');
    registerService.registerUser($scope.regUserName, $scope.regPwd)
  }
})

'use strict';

var app = angular.module('S-O-App');

app.service('registerService', function($http, $rootScope) {

  // could not figure how to hook this up, next would have considered $rootScope
  // or passing an object from a different scope
  this.register = function(user) { // a single quote parse the URL to get ticker
    console.log('registerUser called')
    $http({
      method:"POST",
      url:"/users/register",
      data: {username: username, password: password}
    })
    .then(function successCallback(res) {
      console.log('success res:', res);
    }, function errorCallback(res) {
      console.log('An error occurred in registerUser call:' + res);
    })
  }
})
