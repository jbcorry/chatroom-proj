angular.module('myApp')
.service('chatSvc', function($http) {

  var baseUrl = 'http://localhost:3000/';
// var baseUrl = 'http://still-inlet-37919.herokuapp.com/'

  var apiKey = 'dc6zaTOxFJmzC';

  var messages = [];

  this.getMessages = function(currentGroup) {
      return $http({
        method: "get",
        url: baseUrl + 'groups/chatroom?name=' + currentGroup._id,
      }).then(function(res){
        // console.log(res.data);
        return res.data;
      });

  };

  this.postMessage = function(data) {
    // console.log(data);
    $http.post(baseUrl + 'groups?name=' + data.groupId, data);
  };

  this.getGiphy = function(data) {
    var tag = data.message.message.split(' ')[1];

    // console.log(tag);
    return $http.get('http://api.giphy.com/v1/gifs/random?api_key=' + apiKey + '&tag=' + tag)
    .then(function(res) {
      // console.log(res);
      return res.data;
    });
  };

  this.deleteMessage = function(group, id) {
    var data = {
      group: group,
      id: id
    };
    $http.delete(baseUrl + 'groups?name=' + id, data);

  };

  this.deleteAll = function(group) {
    // console.log(group);
    $http.delete(baseUrl + 'groups?=' + group._id);

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
