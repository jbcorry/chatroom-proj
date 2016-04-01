var socket = io();
angular.module('myApp', ['ui.router'])
.config(function($urlRouterProvider, $stateProvider){

  $stateProvider
  .state('home', {
    url: '/home',
    templateUrl: '/views/home.html'
  })

  .state('groups', {
    url: '/groups',
    templateUrl: '/views/groups.html',
    controller: 'groupCtrl'
  })
  .state('about', {
    url: '/about',
    templateUrl: '/views/about.html'
  })
  .state('contact', {
    url: '/contact',
    templateUrl: '/views/contact.html'
  })
  .state('login', {
    url: '/login',
    templateUrl: '/views/login.html'
  })
  .state('chat', {
    url: '/groups/:id/chatroom',
    templateUrl: '/views/chatroom.html',
    controller: 'chatCtrl'
  })
  .state('new-user', {
    url: '/create-user',
    templateUrl: '/views/new-user.html'
  });

$urlRouterProvider.otherwise('/home');


});
