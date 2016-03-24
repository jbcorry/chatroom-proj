angular.module('myApp')
.controller('mainCtrl', function($scope, mainSvc) {


  $scope.$on('delete message', function(event, index) {
    socket.emit('delete this message', index);
  });

  $scope.$on('client message', function(event, msg){
        socket.emit('ctrl message', msg);
      });

      //listen for socket events

      socket.on('message from socket', function(msg){
        console.log(msg);
        $scope.$broadcast('new message', msg);
        console.log('message sent');
      });




  $scope.tabs = mainSvc.getTabs();
  $scope.submit = {
    name: 'submit',
    view: 'submit'
  };

$scope.show = true;

  $scope.toggle = function() {
    $scope.show = !$scope.show;
  };
  $scope.groups = mainSvc.getGroups();

$scope.contactList = mainSvc.getContactList();

});
