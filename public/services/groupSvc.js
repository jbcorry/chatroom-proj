angular.module('myApp')
.service('groupSvc', function($http){

var baseUrl = 'http://localhost:3000/';

var groups = [];

this.getGroups = function() {

  return $http({
    method: "GET",
    url: baseUrl + 'groups/',
  }).then(function(res){
    // console.log(res);
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



});
