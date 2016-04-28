angular.module('myApp')
.service('loginSvc', function($http, $state){

  // var baseUrl = 'http://localhost:3000/';
var baseUrl = 'http://northpointslc.herokuapp.com/';


  var currentUser;

  this.createUser = function(username, password) {
    console.log('in service');

    return $http({
      method: "POST",
      url: baseUrl + 'signup/',
      data: {"username": username, "password": password}
    }).then(function(res, err){
      if (err) {
        console.log(err);
        return err;
      }
      else {
        return res.data;
      }
    });
  };

  this.signIn = function(username, password) {
    // console.log(username, password);
    return $http({
      method: "POST",
      url: baseUrl + 'login/',
      data: {"username": username, "password": password}
    }).then(function(res, err){
      console.log('logged in');
      currentUser = res.data;
      return res.data;
    });
  };

  this.getCurrentUser = function() {
    return currentUser;
  };

  this.logout = function() {
    return $http({
      method: "GET",
      url: baseUrl + 'logout/'
    }).then(function(res){
      console.log('logged out');
      return res.data;
    });
  };


});
