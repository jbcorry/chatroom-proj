angular.module('myApp')
.service('groupSvc', function($http){

// var baseUrl = 'http://localhost:3000/';
var baseUrl = 'http://still-inlet-37919.herokuapp.com/'

var groups = [];

var changeColor = function(arr) {
  var boo = true;
  for (var i = 0; i < arr.length; i++) {
      if (boo) {
        $('.group').css('background-color', '#13bd74');
        boo = false;
      } else {
        $('.group').css('background-color', '#ef9350');
        boo = true;
      }
  }
};

this.getGroups = function() {

  return $http({
    method: "GET",
    url: baseUrl + 'groups/',
  }).then(function(res){
    // console.log(res.data);
    res.data.forEach(changeColor);
    return res.data;
  });
};

this.createGroup = function(group) {
    // console.log(group);
    return $http({
      method: "POST",
      url: baseUrl + 'groups/',
      data: group
    }).then(function(res){
      return res.data;
    });

};

this.deleteGroup = function(id) {
  $http.delete(baseUrl + 'groups/' + id);
};

this.getCurrentGroup = function(group) {
  return group;
};

this.currentGroup = {};


});
