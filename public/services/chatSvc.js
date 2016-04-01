angular.module('myApp')
.service('chatSvc', function($http) {

  var baseUrl = 'http://localhost:3000/';
// var baseUrl = 'http://still-inlet-37919.herokuapp.com/'

  var messages = [];
  this.getMessages = function() {
      return $http({
        method: "get",
        url: baseUrl + 'groups/:id/chatroom/',
      }).then(function(res){
        return res.data;
      });

  };

  this.postMessage = function(data) {
    // console.log(msg);
    $http.post(baseUrl + 'groups/' + data.groupId + '/chatroom/', data);
  };

  this.deleteMessage = function(id) {

    $http.delete(baseUrl + 'groups/:id/chatroom/' + id);

  };

  this.deleteAll = function() {

    $http.delete(baseUrl + 'groups/:id/chatroom/');

  };

  // this.postMessage = function() {
  //   var postThread = function(thread) {
  //     messages.push(thread);
  //
  //
  //   };
  //   return postThread;
  // };



});
