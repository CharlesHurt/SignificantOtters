'use strict'

 var app = angular.module('S-O-App', ['ui.router'])

 app.controller("userController", function($scope) {
  $scope.x = 42//
  //$scope.go('/showLogin')
 })

 app.config(function($stateProvider, $urlRouterProvider) {
   $stateProvider
     .state('home', {url: '/', templateUrl: './partials/home.html'})
     .state('login', {url: '/login', templateUrl: './partials/login.html'})

   $urlRouterProvider.otherwise('/')
 })
