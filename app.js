
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
io.on('connection', function(socket)
{
    console.log('Anonym connection');

    socket.on('login', function(client)
    {
        console.log('a user connected');
        console.log('list of connected users event : ');
        clients.push(client);

       // console.log(clients);
        clients.forEach(function(entry) {
            entry.state = states[0];
            console.log(entry);
        });
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
            console.log("list : " + listOfInvitations);
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
        console.log("listen to response");
        if(listOfInvitations.length != 0)
        {
            listOfInvitations.forEach(function(item)
            {
                console.log("listen to response");
                if(item.fromUser.id == invite.fromUser.id && item.ToUser.id == invite.ToUser.id )
                {
                    item.response = invite.response;
                    //listOfInvitations.splice(item,1);
                   // console.log(item.response);
                }

            });

        }

        io.emit('listenToResponse', invite);

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

        });


        io.emit('RemoveInvitation');

    });
});
});
// Server Side
//router.get('/server/', Controller.getUser);
router.post('/server/getLadders', Controller.getAllLadder);
router.post('/server/getUser', Controller.getUser);
router.post('/server/addUser', Controller.addUser);

/*router.put('/server/update/:id', Controller.updateCustomer);
router.delete('/server/delete/:id', Controller.deleteCustomer);*/

// Client Side
router.get('/', function(req, res) { res.sendFile(__dirname + '/index.html');});
router.get('/chat', function(req, res) { res.sendFile(__dirname + '/chatPart.html');});

//app.use('/', express.static(__dirname ));
app.use('/angular', express.static(__dirname + '/angular'));
app.use('/angular/models', express.static(__dirname + '/angular/models'));
app.use('/angular/controllers', express.static(__dirname + '/angular/controllers'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
//app.use('/chat', express.static(__dirname + '/chatPart.html'));
app.use('/resources', express.static(__dirname + '/resources'));
app.use(router);
//app.listen(8000);
http.listen(8000,function()
{
    console.log("server on line ! ");
});

console.log("Server is now online !");


