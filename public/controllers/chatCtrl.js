angular.module('myApp')
.controller('chatCtrl', function($scope, chatSvc, loginSvc) {

  //s3 stuff

var removeHtml = function(obj) {
  if (!obj.location) {
    $('.img').remove();
  }
};

  $scope.getMessages = function(){
    return chatSvc.getMessages().then(function(data){
        if(!data){
          return [];
        }else{
          // console.log(data);
          // data.forEach(removeHtml);
          return data.reverse();
        }

      });
  };



  $scope.deleteMessage = function(id, index) {
    chatSvc.deleteMessage(id);
    // $scope.$apply(function() {
      $scope.messages.splice(index, 1);
      $scope.$emit('delete message', index);

    // });
  };

  $scope.deleteAll = function() {
    chatSvc.deleteAll();
    $scope.messages = [];
  };


  $scope.messages= $scope.getMessages().then(function(data) {
    $scope.messages = data;
  });

    $scope.sendMessage = function(messageText) {

      if (messageText) {
      messageText.user = loginSvc.getCurrentUser();
      // console.log(messageText);
      chatSvc.postMessage(messageText);
      $scope.$emit('client message', messageText);
      messageText = {};
    } else{
      return;
      }

    $scope.getMessages();

    };


    $scope.$on('new message', function(event, msg){
      // console.log('almost there!');
      // console.log(msg);
      $scope.messages = $scope.getMessages().then(function(data) {
        // console.log(data);
        $scope.messages.Location = msg.Location;
        $scope.messages = data;

      });
      // $scope.$apply(function() {
      //
      // });
      // getMessages();

    });


    // if ($scope.attachedFile) {
    //
    //   chatSvc.postFile($scope.attachedFile);
    //
    // } else if ($scope.threadText) {
    //
    //   chatSvc.postThread($scope.thread);
    //
    // } else {
    //
    //   alert('Please insert text or attach a file');
    //
    // }





});
