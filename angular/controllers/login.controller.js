/**
 * Created with JetBrains PhpStorm.
 * User: Antonin
 * Date: 02/05/15
 * Time: 09:16
 * To change this template use File | Settings | File Templates.
 */
var serverUrl = 'http://localhost:8000/server';

angular.module('login.controller', [
'authentication.service'
])
// Controlleur d'un formulaire de login
.controller("loginCtrl", function($scope, $http, $location, AuthenticationService) {
    $http.defaults.headers.post["Content-Type"] = "application/json";

    console.log($http.defaults.headers);

    $scope.login = function(c){
        console.log(c.username + ' ' + c.password);
        var urlCompleted = serverUrl + '/getUser';
        $http.post(urlCompleted,c)
            .success(function(data, status, headers, config) {
                console.log("success " + data.result);
              /*  if (status = 201)
                    $scope.success = " Authentication succedeed ! ";*/
                $scope.success = data.result._id + data.result.username;
                AuthenticationService.SetCredentials(data.result._id, data.result.username);
                $location.path('/dashboard');
            })
            .error(function(data, status, headers, config) {
                // alert("An error occured: " + data.error);
                $scope.error = " Authentication wrong ! Please retry later.. ";
            });

    };

})

// Création de directives afin que l'on puisse intégrer des modules à nos pages HTML
    .directive('login',function() {
        return {
            restrict: 'E',
            /* scope: true,
             replace: true,*/
            controller: 'loginCtrl',
            templateUrl: '/angular/views/login.html'
        };
    });