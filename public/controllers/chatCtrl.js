angular.module('myApp')
.controller('chatCtrl', function($scope, chatSvc, loginSvc, groupSvc, $state) {

  //s3 stuff

$scope.currentGroup = groupSvc.currentGroup;
// console.log($scope.currentGroup);


// var checkForLocation = function(obj) {
//   if (obj.location !== '') {
//     return;
//   } else {
//     delete obj.location;
//   }
// };

  $scope.getMessages = function(group){
    return chatSvc.getMessages(group).then(function(data){
        if(!data){
          return [];
        }else{
          // $scope.currentGroup.messages = data.reverse();
          // console.log(data);
          // data.forEach(checkForLocation);
          return data.reverse();
        }

      });
  };




  $scope.deleteMessage = function(id, index) {
    $scope.currentGroup = groupSvc.currentGroup;
    var group = $scope.currentGroup;
    // console.log(group);
    chatSvc.deleteMessage(group, id);
    // $scope.$apply(function() {
      $scope.currentGroup.messages.splice(index, 1);
      $scope.getMessages(group);
      // $state.reload();
      $scope.$emit('delete message', index);

    // });
  };

  $scope.deleteAll = function(group) {
    chatSvc.deleteAll(group);
    $scope.currentGroup.messages = [];
  };

var getGroupMessages = function(arr){
    var newArr = [];
    // console.log(arr);
    for (var i=0; i < arr.length; i++) {
      if (arr[i].group !== $scope.currentGroup._id) {

      } else {
        newArr.push(arr[i]);
      }
    }
    return newArr;
};


  $scope.currentGroup.messages= $scope.getMessages($scope.currentGroup).then(function(data) {
    $scope.currentGroup.messages = getGroupMessages(data);
  });

    $scope.sendMessage = function(messageText, groupId) {
      console.log(messageText);
        if (messageText.message.split(' ')[0] === '/giphy'){
            messageText.user = loginSvc.getCurrentUser();

            console.log('giphy time');
            var data = {
              groupId: groupId,
              message: messageText
            };
            chatSvc.getGiphy(data).then(function(results) {
              // console.log(results);

              var giphyData = {
                groupId: groupId,
                message: messageText
              };
              giphyData.message.Location = results.data.image_url;
              // console.log(giphyData);
              chatSvc.postMessage(giphyData);
              $scope.$emit('client message', messageText);
              messageText = {};
            });

        }
        else {
          if (messageText) {
            if(messageText.Location) {
              delete messageText.Location;
              // console.log(messageText);
            }
                messageText.user = loginSvc.getCurrentUser();
                // console.log('this is the groupId', groupId);
                var data1 = {
                  groupId: groupId,
                  message: messageText
                };
                // console.log(data1);
                chatSvc.postMessage(data1);
                $scope.$emit('client message', messageText);
                messageText = {};
        } else{
          return;
          }

    }

    $scope.getMessages($scope.currentGroup);

    };


    $scope.$on('new message', function(event, msg){
      // console.log('almost there!');
      // console.log(msg);

      $scope.currentGroup.messages= $scope.getMessages($scope.currentGroup)
      .then(function(data) {
        $scope.currentGroup.messages = getGroupMessages(data);
      });        // console.log(data);


      // $scope.$apply(function() {
      //
      // });
      // getMessages();

    });

    $scope.$on('delete message', function(){
      $scope.getMessages($scope.currentGroup);
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
