
var Controller = require('./Controller.js'),
    express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    fs = require('fs'),
    md5 = require('MD5'),
    pwdHash = require('password-hash'),
    router = express.Router(),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

/*
var http = require('http').Server(app);
var io = require('socket.io')(http);*/

// Morgan MiddleWare
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});
app.use(morgan('combined', { stream: accessLogStream }));

// BodyParser MiddleWare
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Database connection
mongoose.connect('mongodb://localhost/supinfo');
var db = mongoose.connection;

db.on('error', function() {
    console.log('An error occured:', arguments);
});

db.once('open', function() {
    console.log("MongoDB connection etablished");
});

var clients = [];
var listOfInvitations = [];
var states = ['Invite','Send'];
var players = [];
var number = 0;
var count = 0;
io.on('connection', function(socket)
{
    console.log('Anonym connection');


    socket.on('login', function(client)
    {
        console.log('a user connected');
        console.log('list of connected users event : ');
        clients.forEach(function(entry) {
            if(entry.username == client.username)
            {
              console.log("Reconnexion :" + client.username);
               count++;


            }


        });
        if (count == 0)
        {
            client.state = states[0];
            clients.push(client);
        }
        else
            count = 0;


        io.emit('login', clients);




    socket.on('logout', function(username)
    {
        console.log('user logout');

        clients.forEach(function(entry) {
            if(entry.username == username)
            {
                clients.splice(clients.indexOf(entry), 1);
            }
        });
        console.log('list of connected users event : ');
        console.log(clients);
        io.emit('logout', clients);

    });


    socket.on('disconnect', function()
    {
        console.log('user disconnected');
        clients.forEach(function(entry) {
           if(entry.username == client.username)
           {
               clients.splice(clients.indexOf(client), 1);
           }
        });


       // console.log(clients);

    });


   // });

    socket.on('chat message', function(msg)
    {
       // console.log(clients);
        console.log('message: ' + msg);

        io.emit('chat message', msg);
    });
    socket.on('users', function(users)
    {
        if(clients !== users)
        {
            /*console.log('get users connected' );
            console.log(clients);*/
            io.emit('users', clients);
        }
    });
    socket.on('sendInvite', function(invite)
    {
        //console.log('send invite ' + invite);


        if (typeof(invite) !== 'undefined')
        {
            listOfInvitations.push(invite);
           // console.log("list : " + listOfInvitations);
            listOfInvitations.forEach(function(item)
            {
                console.log("list invitations item : " + JSON.stringify(item));
            });
            io.emit('sendInvite',listOfInvitations);
        }

        io.emit('sendInvite', listOfInvitations);



    });
    socket.on('sendResponse', function(invite)
    {
        //console.log('send response ' + JSON.stringify(invite));
        if(listOfInvitations.length != 0)
        {
        listOfInvitations.forEach(function(item)
        {
            if(item.fromUser.id == invite.fromUser.id && item.ToUser.id == invite.ToUser.id )
            {
               item.response = invite.response;


               console.log(invite);
            }

        });

        }

        //io.emit('sendResponse', invite);
        io.emit('listenToResponse',invite);




    });

    socket.on('listenToResponse', function(invite)
    {

        if(listOfInvitations.length != 0)
        {
            listOfInvitations.forEach(function(item)
            {
                console.log("listen to response");
                if(item.fromUser.username == invite.fromUser.username && item.ToUser.username == invite.ToUser.username )
                {
                    item.response = invite.response;
                    //listOfInvitations.splice(item,1);
                   // console.log(item.response);
                }

            });

        }

        io.emit('listenToResponse', invite);

    });
        socket.on('updateUserState', function (user){
            clients.forEach(function(client){
                if (user.username == client.username )
                {
                    if (client.state == states[0]){

                        user.state = states[1];
                        user.disable = true;
                        console.log("new user "+  JSON.stringify(user));

                    }
                    else{

                        user.state = states[0];
                        user.disable = false;
                        console.log("new user 2 "+  JSON.stringify(user));

                    }


                }
                else
                if ((user.username == client.username && client.state == states[1]))
                {

                }

            });
            io.emit('updateUserState',user);

        });

    socket.on('RemoveInvitation',function(invite){
        listOfInvitations.forEach(function(item)
        {
            console.log("listen to delete");
            if(item.fromUser.id == invite.fromUser.id && item.ToUser.id == invite.ToUser.id )
            {
                //item.response = invite.response;
                listOfInvitations.splice(item,1);
                // console.log(item.response);
                console.log("count remove" + listOfInvitations.length);
            }
            if(item.fromUser.id == invite.fromUser.id)
            {
                //item.response = invite.response;
                listOfInvitations.splice(item,1);
                // console.log(item.response);
                console.log("count remove" + listOfInvitations.length);
            }

        });


        io.emit('RemoveInvitation');

    });
    // socket concernant le jeu
        socket.on('add Player', function(player){
            //console.log("player " + players[0]);
            console.log("Add player " + player.username);
            if (players.length == 0)
            {
                player.number = 1;
                players.push(player);
            }
            else {
                players.forEach(function(item)
                {
                   if(player.username  !== item.username )
                   {
                       player.number = 2;
                       players.push(player);
                       console.log("list joueurs " + item);
                   }
                });
            }

            io.emit('add Player', players);

        });
        // recupération des joueurs
        socket.on('get Players', function(gettingPlayers){
            //console.log("player " + players[0]);
          //  console.log("player " + player[0]);
            //players = player[0];
            if (gettingPlayers !== players){

                io.emit('get Players', players);
            }


        });
        // récupération du joueur actuel
        socket.on('get Current Player', function(currentPlayer){

            players.forEach(function(item){
                if(item.username === currentPlayer)
                {
                    currentPlayer = item;
                    console.log("current player " + item.username + " player : " + item.number);
                    var number = item.number;
                    io.emit('current Player', number );
                }
            });
        });

        socket.on('updatePlayerPosition', function(playerJsonString){
            io.emit("iUpdatePlayerPosition", playerJsonString);
        });

        socket.on('sendDegats', function(degatsJsonString){
           io.emit('ioSendDegats', degatsJsonString);
        });
        socket.on('sendResult', function(sendedResult){
            //console.log('test' + sendedResult);


                console.log('ITEM ---- ' + JSON.stringify(sendedResult));

            io.emit('sendResult', sendedResult);
        })


});
});
// Server Side
//router.get('/server/', Controller.getUser);
router.post('/server/getLadders', Controller.getAllLadder);
router.post('/server/getUser', Controller.getUser);
router.post('/server/addUser', Controller.addUser);
router.post('/server/updateLadder', Controller.updateLadder);
/*router.put('/server/update/:id', Controller.updateCustomer);
router.delete('/server/delete/:id', Controller.deleteCustomer);*/

// Client Side
router.get('/', function(req, res) { res.sendFile(__dirname + '/index.html');});
//router.get('/chat', function(req, res) { res.sendFile(__dirname + '/chatPart.html');});

//app.use('/', express.static(__dirname ));
app.use('/angular', express.static(__dirname + '/angular'));
app.use('/angular/models', express.static(__dirname + '/angular/models'));
app.use('/angular/controllers', express.static(__dirname + '/angular/controllers'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
//app.use('/chat', express.static(__dirname + '/chatPart.html'));
app.use('/resources', express.static(__dirname + '/resources'));
app.use(router);
//app.listen(8000);
http.listen(8000 ,function()
{
    console.log("server on line ! ");
});

console.log("Server is now online !");


