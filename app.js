
var Controller = require('./Controller.js'),
    express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    fs = require('fs'),
    md5 = require('MD5'),
    pwdHash = require('password-hash'),
    router = express.Router(),
    app = express();

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

// Server Side
//router.get('/server/', Controller.getUser);
router.post('/server/getUser', Controller.getUser);
router.post('/server/addUser', Controller.addUser);
/*router.put('/server/update/:id', Controller.updateCustomer);
router.delete('/server/delete/:id', Controller.deleteCustomer);*/

// Client Side
router.get('/', function(req, res) { res.sendFile(__dirname + '/index.html');});

app.use('/angular', express.static(__dirname + '/angular'));
app.use('/angular/models', express.static(__dirname + '/angular/models'));
app.use('/angular/controllers', express.static(__dirname + '/angular/controllers'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/resources', express.static(__dirname + '/resources'));
app.use(router);
app.listen(8000);

console.log("Server is now online !");


