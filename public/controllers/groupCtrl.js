angular.module('myApp')
.controller('groupCtrl', function($scope, groupSvc, loginSvc, $state){

//toggle html

  $scope.newGroup = false;
    $scope.toggleGroup = function() {
      $scope.newGroup = !$scope.newGroup;
    };

//group stuff

$scope.getGroups = function(){
  return groupSvc.getGroups().then(function(data){
      if(!data){
        return [];
      }else{
        return data;
      }
    });
};

$scope.groups= $scope.getGroups().then(function(data) {
  $scope.groups = data;
});


$scope.createGroup = function(group){
  group.messages = [];
  group.user = loginSvc.getCurrentUser();
  console.log(group);
  groupSvc.createGroup(group);
  groupSvc.getGroups();
};

$scope.checkPassword = function(password) {
  var pw = prompt('Enter this groups password to access feed', 'Password');
  if (pw === password) {
    $state.go('chat');
  } else {
    alert('Incorrect Group Password');
  }
};

$scope.deleteGroup = function(id, index) {
    console.log('in ctrl');
    groupSvc.deleteGroup(id);
    $scope.groups.splice(index, 1);
};


});
