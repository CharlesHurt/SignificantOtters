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
