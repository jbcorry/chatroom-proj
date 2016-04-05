angular.module('myApp')
.controller('mainCtrl', function($scope, mainSvc, loginSvc, $state) {


//log in and out functions

  $scope.currentUser = loginSvc.getCurrentUser();
  // console.log($scope.currentUser);

  $scope.createUser = function(username, password) {
    if(!username && !password) {
      alert('Please create a username and password');
    }
    else {
      loginSvc.createUser(username, password);
      loginSvc.signIn(username, password);
      $state.go('home');
    }

  };

  $scope.signIn = function(username, password) {
    if(!username && !password) {
      alert('Please enter your username and password');
    }
    else {
      loginSvc.signIn(username, password).then(function(results){
        $scope.loggedIn = true;
        $state.go('home');
      });
    }
  };

  $scope.logout = function() {
    $scope.loggedIn = false;
    loginSvc.logout();
    $state.go('login');
  };

//socket stuff

  $scope.$on('delete message', function(event, index) {
    socket.emit('delete this message', index);
  });

  $scope.$on('client message', function(event, msg){
        // console.log('got the deleted group');
        socket.emit('ctrl message', msg);
      });

      //listen for socket events

      socket.on('message from socket', function(msg){
        $scope.$broadcast('new message', msg);
      });




  //other


  $scope.tabsIn = mainSvc.getTabsIn();
  $scope.tabsOut = mainSvc.getTabsOut();
  $scope.submit = {
    name: 'submit',
    view: 'submit'
  };

$scope.show = true;

  $scope.toggle = function() {
    $scope.show = !$scope.show;
  };
  // $scope.groups = mainSvc.getGroups();

$scope.contactList = mainSvc.getContactList();

$scope.createList = function(){};

});
