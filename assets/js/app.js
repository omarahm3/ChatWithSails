var app = angular.module('chatApp', []);

app.controller('ChatController', ['$http', '$log', '$scope', function($http, $log, $scope){

  $scope .predicate = '-id';
  $scope.reverse = false;
  $scope.baseUrl = 'http://localhost:1337';
  $scope.chatList = [];

  $scope.getAllChat = function(){
    io.socket.get('/chat/addConv');

    $http.get($scope.baseUrl + '/chat')
          .success(function(success_data){
            //getting the data
            $scope.chatList = success_data;
            $log.info(success_data);
          });
  };

  $scope.getAllChat();
  $scope.chatUser = "mrGeek";
  $scope.chatMessage = "";

  io.socket.on('chat', function(obj){
      if (obj.verb == 'created'){
        $log.info(obj);
        $scope.chatList.push(obj.data);
        $scope.$digest();
      }
  });

  $scope.sendMsg = function(){
    $log.info($scope.chatMessage);
    io.socket.post('/chat/addconv/', {user: $scope.chatUser, message: $scope.chatMessage});
    $scope.chatMessage = "";
  };


}]);
