angular.module('myApp')
.controller('chatCtrl', function($scope, chatSvc, loginSvc, groupSvc) {

  //s3 stuff
$scope.currentGroup = groupSvc.currentGroup;


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
          // $scope.currentGroup.messages = data.reverse();
          // console.log(data);
          // data.forEach(removeHtml);
          return data.reverse();
        }

      });
  };



  $scope.deleteMessage = function(id, index) {
    chatSvc.deleteMessage(id);
    // $scope.$apply(function() {
      $scope.currentGroup.messages.splice(index, 1);
      $scope.$emit('delete message', index);

    // });
  };

  $scope.deleteAll = function() {
    chatSvc.deleteAll();
    $scope.currentGroup.messages = [];
  };

var getGroupMessages = function(arr){
    var newArr = [];
    for (var i=0; i < arr.length; i++) {
      if (arr[i].group !== $scope.currentGroup._id) {

      } else {
        newArr.push(arr[i]);
      }
    }
    return newArr;
};


  $scope.currentGroup.messages= $scope.getMessages().then(function(data) {
    $scope.currentGroup.messages = getGroupMessages(data);
  });

    $scope.sendMessage = function(messageText, groupId) {

      if (messageText) {
      messageText.user = loginSvc.getCurrentUser();
      console.log('this is the groupId', groupId);
      var data = {
        groupId: groupId,
        message: messageText
      };
      chatSvc.postMessage(data);
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
      $scope.currentGroup.messages= $scope.getMessages()
      .then(function(data) {
        $scope.currentGroup.messages = getGroupMessages(data);
      });        // console.log(data);


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
