'use strict'

 var app = angular.module('S-O-App', ['ui.router'])

// Put this config before defining the controllers
 app.config(function($stateProvider, $urlRouterProvider) {

   console.log($stateProvider);
   $stateProvider
     .state('home', {url: '/home', templateUrl: 'partials/home.html', controller:"userController"} )
     .state('login'/*simple name no slash */,
       {url: '/login' /* what the user would see on URL */,
       templateUrl: 'partials/login.html',
       controller:"userController"})

   $urlRouterProvider.otherwise('/')
 })

// This is after .config, but not often used
//app.run...

 app.controller("userController", function($scope, $state) {
  $scope.x = 42
  $scope.gotoLogin = function() {
    $state.go("login")
    console.log("transition done");
  }
  //$scope.go('/showLogin')
 })
