/**
 * Created with JetBrains PhpStorm.
 * User: Antonin
 * Date: 02/05/15
 * Time: 16:42
 * To change this template use File | Settings | File Templates.
 */
angular.module('socket.service', [
        'btford.socket-io'
    ])


.factory('mySocket', function (socketFactory) {
        var myIoSocket = io.connect('http://192.168.1.4:8000');

        mySocket = socketFactory({
            ioSocket: myIoSocket
        });

        return mySocket;
});

