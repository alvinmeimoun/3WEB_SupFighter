/**
 * Created with JetBrains PhpStorm.
 * User: Antonin
 * Date: 06/05/15
 * Time: 17:49
 * To change this template use File | Settings | File Templates.
 */
var serverUrl = 'http://localhost:8000/server';
angular.module('quickFightButton.controller', [

    'socket.service',
    'authentication.service'

])
.controller('quickFightCtrl', function($scope,$http,$location, AuthenticationService){

       $scope.searchFight = function(c)
       {
           //$http.defaults.headers.post["Content-Type"] = "application/json";
           var urlCompleted = serverUrl + '/getLadders';
           var listOfScores = [];
           var user = {username: AuthenticationService.GetCredentials().currentUser.username , wins: 0, losses:0 };
           $http.post(urlCompleted)
               .success(function(data, status, headers, config) {
                   console.log("success " + data.result);
                   if(data.result !== [])
                      listOfScores = data.result;

                   listOfScores.forEach(function(item){
                       console.log(AuthenticationService.GetCredentials().currentUser.username);

                       if(item.username === AuthenticationService.GetCredentials().currentUser.username)
                       {
                           user = item;
                           console.log('user found ' + user.username);
                       }


                   });

                   listOfScores.forEach(function(item){

                       if(item.username !== AuthenticationService.GetCredentials().currentUser.username)
                       {

                           if((item.wins >= user.wins && item.wins <= (user.wins +5)) /*|| (item.wins <= user.wins - 5) /* || item.losses <= user.losses */)
                           {
                               console.log("item " + JSON.stringify(item.username));
                               var invite = { "fromUser" : AuthenticationService.GetCredentials().currentUser, "ToUser" : item, "response" : ""  };
                               socket.emit('sendInvite',invite);
                              /*var temp = [] ;
                               socket.emit('users');
                               socket.on('users', function(clients)
                               {
                                  temp = clients;
                               });
                               clients.forEach(function(client){
                                   if (client.username == item.username){
                                       console.log("item " + JSON.stringify(item.username));
                                       var invite = { "fromUser" : AuthenticationService.GetCredentials().currentUser, "ToUser" : item, "response" : ""  };
                                       socket.emit('sendInvite',invite);

                                       return ;
                                   }


                               });*/

                               return ;
                           }
                           else
                           if( item.losses <= (user.losses +5))
                           {
                               console.log("item " + JSON.stringify(item.username));
                               var invite = { "fromUser" : AuthenticationService.GetCredentials().currentUser, "ToUser" : item, "response" : ""  };
                               socket.emit('sendInvite',invite);

                               return ;
                              /* var temp = [] ;
                               socket.emit('clients');
                               socket.on('clients', function(clients)
                               {
                                   temp = clients;
                               });
                               temp.forEach(function(client){
                                   if (client.username == item.username){


                                       return ;
                                   }
                               });*/

                           }
                           else
                           {
                               $scope.noUser = "No user found, please invite online user";
                               return false;
                           }

                               return ;
                           //}
                       }

                   });



               })
               .error(function(data, status, headers, config) {
                   // alert("An error occured: " + data.error);
                   $scope.error = " Authentication wrong ! Please retry later.. ";
               });




       }
    })
    .directive('fight',function( AuthenticationService) {
        return {
            restrict: 'E',
            //scope: true,
            replace: true,
            templateUrl: '/angular/views/quickFightButton.html'
        }
    });