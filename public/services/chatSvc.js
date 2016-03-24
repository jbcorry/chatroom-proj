angular.module('myApp')
.service('chatSvc', function($http) {

  var baseUrl = 'http://localhost:3000/';

  var messages = [];
  this.getMessages = function() {
      return $http({
        method: "GET",
        url: baseUrl + 'chatroom/',
      }).then(function(res){
        return res.data;
      });

  };

  this.postMessage = function(msg) {

    $http.post(baseUrl + 'chatroom/', msg);

  };

  this.deleteMessage = function(id) {

    $http.delete(baseUrl + 'chatroom/' + id);

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
