var fs = require('fs'),
    md5 = require('MD5'),
    pwdHash = require('password-hash'),
    User = require('./schemas/User'),
    Ladder = require('./schemas/Ladder');

var Controller = {

    sendInvite: function(req, res)
    {


    },

    required: function(keys, type, req) {
        var ret = {};

        for (var i in keys) {
            var key = keys[i];

            if (req[type][key] == undefined)
                return { error: true, missing: key };
            else
                ret[key] = req[type][key];
        }

        return { error: false, params: ret };
    },
    send: function(status, error, data, res) {
        res.setHeader('Content-Type', 'application/json');
        res.status(status);

        res.end(JSON.stringify({
            error: error,
            result: data
        }));
    },
    getAllLadder: function(req, res) {
        Ladder.find().exec(function(err, c) {
            //console.log("test");
            if (err)
                return Controller.send(500, err.toString(), {}, res);
            //console.log(JSON.stringify(c));
            if (c == null)
                return Controller.send(404, 'Not found', {}, res);

            return Controller.send(200, false, c, res);
        });
    },

    getLadderByUsername: function(req, res) {
        Ladder.findOne({ username: req.username }).exec(function(err, c) {
            if (err)
                return Controller.send(500, err.toString(), {}, res);

            if (c == null)
                return Controller.send(404, 'Not found', {}, res);

            return Controller.send(200, false, c, res);
        });
    },
    getUserByUsername: function(req, res) {
        User.findOne({ username: req.username }).exec(function(err, c) {
            if (err)
                return Controller.send(500, err.toString(), {}, res);

            if (c == null)
                return Controller.send(404, 'Not found', {}, res);

            return Controller.send(200, false, c, res);
        });
    },
    getUser: function(req, res) {
       // console.log(req.password);
        var parse = Controller.required(['username', 'password'], 'body', req);
        if (parse.error)
            return Controller.send(403, "Missing `" + parse.missing + "` value", {}, res);
        console.log(parse.params.username);
       // var hashedPwd = pwdHash.generate(parse.params.password);
       // console.log(hashedPwd);
        User.findOne({ username: parse.params.username }).exec(function(err, c) {
            if (err)
                return Controller.send(500, err.toString(), {}, res);

            if (c == null)
            {
                //console.log( c );
                //console.log( ' test ' + hashedPwd);
                return Controller.send(404, 'Not found', {}, res);
            }


            if (c != null)
            {
                //console.log(c.username + ' ' +  c.password);
                //console.log(); // true
               // console.log(hashedPwd);
                if (pwdHash.verify(parse.params.password, c.password) == true)
                    return Controller.send(200, false, c, res);
                return Controller.send(404, 'Error bad credentials ! ', {}, res);
            }

        });
    },
    addUser: function(req, res) {


        var parse = Controller.required(['username', 'password'], 'body', req);

        if (parse.error)
            return Controller.send(403, "Missing `" + parse.missing + "` value", {}, res);

        // Conversion en hash du password
        var hashedPwd = pwdHash.generate(parse.params.password);
        //console.log(hashedPwd);
        var user = new User({
            username: parse.params.username,
            password: hashedPwd
        });


        //console.log(user.username  + " " + user.password);
        user.save(function(err, c) {
            if (err)
                return Controller.send(500, err.toString(), {}, res);

            return Controller.send(201, false, c, res);
        });
    },
    addLadder: function(req, res) {


        var parse = Controller.required(['username', 'wins' ,'losses', 'timePlayed'], 'body', req);

        if (parse.error)
            return Controller.send(403, "Missing `" + parse.missing + "` value", {}, res);

        // Conversion en hash du password
        //var hashedPwd = pwdHash.generate(parse.params.password);
        //console.log(hashedPwd);
        var ladder = new Ladder({
            username: parse.params.username,
            wins: parse.params.wins,
            losses: parse.params.losses,
            timePlayed: parse.params.timePlayed
        });


        //console.log(user.username  + " " + user.password);
        ladder.save(function(err, c) {
            if (err)
                return Controller.send(500, err.toString(), {}, res);

            return Controller.send(201, false, c, res);
        });
    },
    updateLadder: function(req, res) {
        var optional_params = ['username', 'wins' ,'losses', 'timeElapsed'];


        Ladder.findOne({ username : req.body.username }, function(err, c) {
            if (err)
                return Controller.send(500, err.toString(), {}, res);
            if (c == null)
                return Controller.addLadder(req,res);
            console.log(JSON.stringify(req.body));
            if (req.body.wins == 1)
            {
                c.wins += 1;
                console.log("time "+  req.body.timePlayed);
                if (c.timePlayed == 0){
                    c.timePlayed = req.body.timePlayed;
                    console.log("time "+  c.timePlayed);
                }
                else
                if ( req.body.timePlayed < c.timePlayed)
                {
                    c.timePlayed = req.body.timePlayed;
                    console.log("time "+  c.timePlayed);
                }
            }

            else
                c.losses += 1;


            c.save(function(err, row) {
                Controller.send(200, false, row, res);
            });
        });
    }
 /*    deleteCustomer: function(req, res) {
        Customer.findOne({ _id : req.params.id }, function(err, c) {
            if (err)
                return Controller.send(500, err.toString(), {}, res);
            if (c == null)
                return Controller.send(404, 'Not found', {}, res);

            c.remove(function(err, row) {
                return Controller.send(200, false, true, res);
            });
        });
    }*/
};


module.exports = Controller;
