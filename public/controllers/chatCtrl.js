angular.module('myApp')
.controller('chatCtrl', function($scope, chatSvc) {


  $scope.getMessages = function(){
    return chatSvc.getMessages().then(function(data){
        if(!data){
          return [];
        }else{
          return data;
        }
      });
  };


  $scope.deleteMessage = function(id, index) {
    chatSvc.deleteMessage(id);
    // $scope.$apply(function() {
      $scope.messages.splice(index, 1);
      console.log(id);
      $scope.$emit('delete message', index);

    // });
  };


  $scope.messages= $scope.getMessages().then(function(data) {
    $scope.messages = data;
  });

    $scope.sendMessage = function(messageText) {
      if (messageText) {
      $scope.postMessage(messageText);
      $scope.$emit('client message', messageText);
      messageText = '';
    }
    $scope.getMessages();

    };


    $scope.$on('new message', function(event, msg){
      console.log('new message received');
      $scope.getMessages();
      $scope.$apply(function() {
        $scope.messages.push(msg);

      });
      // getMessages();

    });



    $scope.postMessage = function(msg) {
      console.log(msg);
      chatSvc.postMessage(msg);
    };

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
