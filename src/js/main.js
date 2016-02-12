'use strict'

 var app = angular.module('S-O-App', ['ui.router'])

// Put this config before defining the controllers
 app.config(function($stateProvider, $urlRouterProvider) {

   console.log($stateProvider);
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

 app.controller("userController", function($scope, $state) {
  //$scope.x = 42
  $scope.gotoHomeState = function() {
    $state.go("homeState")
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
 })
