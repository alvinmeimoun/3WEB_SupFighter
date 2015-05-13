var DAMAGE_UPPER = 5;
var DAMAGE_KICK = 10;
var DAMAGE_PUNCH = 5;
var DAMAGE_FATALITY = 30;

var canvas, ctx, player, ennemy,
    width = 500,
    height = 400,
    rightKey = false,
    leftKey = false,
    uppercutKey = false,
    uppercutCDValue = 0,
    kickKey = false,
    kickCDValue = 0,
    jumpKey = false,
    crouchKey = false,
    blockKey = false,
    crouchBlock = false,
    fatalityKey = false,
    fatalityCDValue = 0,
    upKey = false,
    downKey = false,
    playersOnline = [];

var damageHandledUpper = false, damageHandlerKick = false, damageHandlerFatality;

function clearCanvas() {
    ctx.clearRect(0, 0, width, height);
}

function drawShip() {
    //Creation des players si non deja crées
    if (player === undefined) createPlayers();


    //BARRES DE VIE
    var barViePlayerX;
    var barVieEnnemyX;

    if (!isPlayerReverse) {
        barVieEnnemyX = 350;
        barViePlayerX = 10;
    } else {
        barVieEnnemyX = 10;
        barViePlayerX = 350;
    }

    //Affichage Text Player
    ctx.font = "15px ARIAL";
    ctx.fillStyle = "black";
    ctx.fillText(currentPlayerName, barViePlayerX, 15);

    //Affichage Text Ennemy
    ctx.font = "15px ARIAL";
    ctx.fillStyle = "black";
    ctx.fillText(ennemy.name, barVieEnnemyX, 15);

    //Barre de vie gauche
    var leftLife = 0;
    if(isPlayerReverse){
        leftLife = ennemy.life;
    } else {
        leftLife = player.life
    }
    if(leftLife > 0){
        ctx.fillStyle = "red";
        ctx.fillRect(10, 25, (leftLife / 100) * 140, 25);
    }


    //Bordure de la barre de vie du Player
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.strokeRect(10, 25, 140, 25);

    //Barre de vie de l'ennemy
    var rightLife = 0;
    if(isPlayerReverse){
        rightLife = player.life;
    } else {
        rightLife = ennemy.life;
    }
    if(rightLife > 0){
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(350, 25, (rightLife / 100) * 140, 25);
    }


    //Bordure de la barre de vie de l'ennemy
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.strokeRect(350, 25, 140, 25);

    if (rightKey) {
        if (player.x + 5 <= width - player.width) {
            player.x += 5;
            player.srcX = 83;
        }

    } else if (leftKey) {
        if (player.x - 5 >= -10) {
            player.x -= 5;
            player.srcX = 156;
        }
    }

    player.draw(ctx);
    ennemy.draw(ctx);

    var collision = isInCollision();

/*
    if (player.life <= 0) {
        player.life = 0;
    } else if (ennemy.life <= 0) {
        ennemy.life = 0;
    }*/

    //Check damage upper
    if (!damageHandledUpper && collision && uppercutKey && ennemy.life > 0 && player.life > 0) {

        if (ennemy.life > 0 && ennemy.life <= 100) {
            sendDegats(DAMAGE_UPPER);
            damageHandledUpper = true;
        }
        else if (player.life > 0 && player.life <= 100) {
            sendDegats(DAMAGE_UPPER);
            damageHandledUpper = true;
        }


    }

    //Check damage kick + vie supérieur à 0
    if (!damageHandlerKick && collision && kickKey && ennemy.life > 0 && player.life > 0) {

        if (ennemy.life > 0 && ennemy.life <= 100) {
            sendDegats(DAMAGE_KICK);
            damageHandlerKick = true;

        }
        if (player.life > 0 && player.life <= 100) {
            sendDegats(DAMAGE_KICK);
            damageHandlerKick = true;

        }

    }

    //Check damage fatality + vie supérieur à 0
    if (!damageHandlerFatality && collision && fatalityKey && ennemy.life > 0 && player.life > 0) {

        if (ennemy.life > 0 && ennemy.life <= 100) {
            sendDegats(DAMAGE_FATALITY);
            damageHandlerFatality = true;

        }
        if (player.life > 0 && player.life <= 100) {
            sendDegats(DAMAGE_FATALITY);
            damageHandlerFatality = true;

        }

    }

    //On reset l'état des handler damage
    if (!uppercutKey) {
        damageHandledUpper = false;
    }
    if (!kickKey) {
        damageHandlerKick = false;
    }
    if (!fatalityKey) {
        damageHandlerFatality = false;
    }


}

function loop() {
    clearCanvas();
    drawShip();

    //Envoi mise à jour position joueur
    if (player != null) sendPlayerInformation();
}


var cooldowns = function (target, iMax, step) {
    //console.log(target + " " + iteration);
    var x;

    switch (target) {
        case "uppercut":
            x = (200 / iMax);

            uppercutCDValue = 200 - (x * (step + 1));
            break;

        case "kick":
            x = (200 / iMax);

            kickCDValue = 200 - (x * (step + 1));
            break;

        case "fatality":
            x = (200 / iMax);

            fatalityCDValue = 200 - (x * (step + 1));
            break;

        default:
            break;
    }
};

function keyDown(e) {

    //Documentation key
    //http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes

    //Fléche RIGHT
    if (e.keyCode == 39) {
        rightKey = true;

        //UppercutKey pressée au moment du déplacement == le player s'arrête
        if (uppercutKey == true) {
            player.x += 0;
            rightKey = false;
        }
        //KickRight pressée au moment du déplacement == le player s'arrête
        else if (kickKey == true) {
            player.x += 0;
            rightKey = false;
        }
        //Crouch pressée au moment du déplacement == le player s'arrête
        else if (crouchKey == true) {
            player.x += 0;
            rightKey = false;
        }
        //block préssée au moment du déplacement == le player s'arrête
        else if (blockKey == true) {
            player.x += 0;
            rightKey = false;
        }
        //fatality préssée au moment du déplacement == le player s'arrête
        else if (fatalityKey == true) {
            player.x += 0;
            rightKey = false;
        }
    }
    //Fléche LEFT
    else if (e.keyCode == 37) {
        leftKey = true;

        //UppercutKey pressée au moment du déplacement == le player s'arrête
        if (uppercutKey == true) {
            player.x -= 0;
            leftKey = false;
        }
        //KickRight pressée au moment du déplacement == le player s'arrête
        else if (kickKey == true) {
            player.x -= 0;
            leftKey = false;
        }
        //crouch pressée au moment du déplacement == le player s'arrête
        else if (crouchKey == true) {
            player.x -= 0;
            leftKey = false;
        }
        //block préssée au moment du déplacement == le player s'arrête
        else if (blockKey == true) {
            player.x -= 0;
            leftKey = false;
        }
        //fatality préssée au moment du déplacement == le player s'arrête
        else if (fatalityKey == true) {
            player.x -= 0;
            leftKey = false;
        }

    }

    //Touche A UPPERCUT
    else if (e.keyCode == 65) {

        //Touche droite ou gauche pressée au moment de l'uppercut == le player ne bouge plus
        if (rightKey == true || leftKey == true) {

            rightKey = false;
            player.x += 0;

            leftKey = false;
            player.x -= 0;
        }

        /*
         asyncLoop({
         length : 100,

         functionToLoop : function(loop, i){
         setTimeout(function(){

         cooldowns("punch", 100, i);

         player.imageKey = STICKMAN_UPPER;

         loop();
         },10);
         },

         callback : function(){
         uppercutKey = true;

         player.imageKey = STICKMAN_NORMAL;
         }
         });
         */

        player.imageKey = STICKMAN_UPPER;
        uppercutKey = true;
    }

    //Touche Z KICK + Augmentation de la largeur pour le sprite Kick
    else if (e.keyCode == 90) {

        //Touche droite préssée au moment du Kick == Sprite kick Droite
        if (player.srcX == 83) {

            //Width couvre une plus grande zone sur le sprite
            player.width = 80;
            player.srcX = 23;
            player.imageKey = STICKMAN_KICK;

        }
        //Touche gauche préssée au moment du Kick == Sprite kick Gauche
        else if (player.srcX == 156) {

            player.width = 92;
            player.srcX = 140;
            player.imageKey = STICKMAN_KICK;

        }

        //Touche droite ou gauche pressée au moment du KickRight == le player ne bouge plus
        if (rightKey == true || leftKey == true) {

            rightKey = false;
            player.x += 0;

            leftKey = false;
            player.x -= 0;
        }

        kickKey = true;
    }

    //Touche E FATALITY + Augmentation de la largeur pour le sprite Kick + Augmentation de la vitesse
    else if (e.keyCode == 69) {

        //Touche droite préssée au moment du Kick == Sprite Fatality Droite
        if (player.srcX == 83) {

            //Width couvre une plus grande zone sur le sprite
            player.width = 135;
            player.srcX = 5;
            player.x += 100;
            player.imageKey = STICKMAN_FATALITY;

        }
        //Touche gauche préssée au moment du Kick == Sprite Fatality Gauche
        else if (player.srcX == 156) {

            player.width = 135;
            player.srcX = 145;
            player.x -= 100;
            player.imageKey = STICKMAN_FATALITY;

        }

        //Touche droite ou gauche pressée au moment du Fatality == le player ne bouge plus
        if (rightKey == true || leftKey == true) {

            rightKey = false;
            player.x += 0;

            leftKey = false;
            player.x -= 0;
        }

        fatalityKey = true;
    }

    //Touche space == JUMP + Augmentation de la valeur du saut
    else if (e.keyCode == 32) {
        player.y = height - 340;
        player.imageKey = STICKMAN_NORMAL;
        jumpKey = true;
    }
    //Touche bas == CROUCH
    else if (e.keyCode == 40) {

        //Taille RIGHT quand le block est relachée
        if (player.srcX == 23) {

            player.width = 67;
            player.srcX = 83;
            player.imageKey = STICKMAN_NORMAL;
        }
        //Taille LEFT quand le block est relachée
        else if (player.srcX == 140) {

            player.width = 67;
            player.srcX = 156;
            player.imageKey = STICKMAN_NORMAL;
        }

        player.imageKey = STICKMAN_CROUCH;

        //Touche droite ou gauche pressée au moment de s'accroupir == le player ne bouge plus
        if (rightKey == true || leftKey == true) {

            rightKey = false;
            player.x += 0;

            leftKey = false;
            player.x -= 0;
        }
        crouchKey = true;
    }

    //Touche F == Block
    else if (e.keyCode == 70) {

        player.imageKey = STICKMAN_BLOCK;
        blockKey = true;

        //Si au moment du blocage il détecte que le crouch est activé alors le sprite passe a crouchBlock
        if (crouchKey == true) {

            player.imageKey = STICKMAN_CROUCH_BLOCK;
            crouchBlock = true;
        }


        //Touche droite ou gauche pressée au moment de s'accroupir == le player ne bouge plus
        if (rightKey == true || leftKey == true) {

            rightKey = false;
            player.x += 0;

            leftKey = false;
            player.x -= 0;
        }
    }

}

function keyUp(e) {

    //Documentation key
    //http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes

    //Fléche droite == touche relachée
    if (e.keyCode == 39) {
        rightKey = false;

    }
    //Fléche gauche == touche relachée
    else if (e.keyCode == 37) {
        leftKey = false;
    }
    //Touche uppercut == touche relachée + Affichage sprite de base
    else if (e.keyCode == 65) {
        uppercutKey = false;
        player.imageKey = STICKMAN_NORMAL;
    }
    //Touche kick == touche relachée + Affichage sprite de base + Rétablissement de la largeur et de la taille du sprite pris en compte
    else if (e.keyCode == 90) {

        kickKey = false;

        //Taille pour RIGHT
        if (player.srcX == 23) {

            player.width = 67;
            player.srcX = 83;
            player.imageKey = STICKMAN_NORMAL;
        }
        //Taille pour LEFT
        else if (player.srcX == 140) {

            player.width = 67;
            player.srcX = 156;
            player.imageKey = STICKMAN_NORMAL;
        }

    }
    //Touche FATALITY == touche relachée + Affichage sprite de base + Rétablissement de la largeur et de la taille du sprite pris en compte
    else if (e.keyCode == 69) {

        fatalityKey = false;

        //Taille pour RIGHT
        if (player.srcX == 5) {

            player.width = 67;
            player.srcX = 83;
            player.x += 5;
            player.imageKey = STICKMAN_NORMAL;
        }
        //Taille pour LEFT
        else if (player.srcX == 145) {

            player.width = 67;
            player.srcX = 156;
            player.x -= 5;
            player.imageKey = STICKMAN_NORMAL;
        }

    }
    //Touche space == touche relachée + Rétablissement de la hauteur de base
    else if (e.keyCode == 32) {
        player.y = height - 200;
        jumpKey = false;

    }
    //Touche bas == touche relachée + Affichage sprite de base
    else if (e.keyCode == 40) {

        player.imageKey = STICKMAN_NORMAL;
        crouchKey = false;

        console.log(rightKey + " " + leftKey)

    }

    //Touche F == BLOCK + Affichage du sprite de base
    else if (e.keyCode == 70) {

        //crouchBlock = false;
        console.log("Block " + blockKey);
        //Si on relache crouch en étant accroupis alors on repasse au crouch de base
        /*if(crouchBlock == true ){
         player.imageKey = STICKMAN_CROUCH;
         crouchBlock = false;
         }

         else*/
        if (blockKey == true) {
            player.imageKey = STICKMAN_NORMAL;
            blockKey = false;
        }

    }
}

function launchGame() {
    player = undefined; ennemy = undefined;
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    setInterval(loop, 1000 / 30);
    document.addEventListener('keydown', keyDown, false);
    document.addEventListener('keyup', keyUp, false);


    var socket = io();
    socket.emit('get Players');
    socket.on('get Players', function (players) {
        //console.log('recept '+ players);
        playersOnline = players;
    });

    //Broadcast listener
    socket.on('iUpdatePlayerPosition', function (playerJsonString) {
        var objFromJson = JSON.parse(playerJsonString);
        if (objFromJson.name !== currentPlayerName) {
            ennemy.updateFromJson(playerJsonString);
        }
    });

    socket.on('ioSendDegats', function (degatsJsonString) {
        receiveDegats(degatsJsonString);
    });
}

var isPlayerReverse = false;
var currentPlayerName = "PLAYER";
function createPlayers() {
    var playerNumber = getCurrentPlayer();
    currentPlayerName = localStorage.getItem("user");
    var ennemyName = getEnnemyName();

    if (playerNumber === 1) {
        isPlayerReverse = false;
        player = StickmanModel(currentPlayerName, (width / 8) - 25, height - 200, 67, 200, 83, 0, STICKMAN_NORMAL, false);
        ennemy = StickmanModel(ennemyName, (width / 1) - 100, height - 202, 67, 202, 156, 0, STICKMAN_NORMAL, true);
    } else if (playerNumber === 2) {
        isPlayerReverse = true;
        ennemy = StickmanModel(ennemyName, (width / 8) - 25, height - 200, 67, 200, 83, 0, STICKMAN_NORMAL, true);
        player = StickmanModel(currentPlayerName, (width / 1) - 100, height - 202, 67, 202, 156, 0, STICKMAN_NORMAL, false);
    }
}

function getEnnemyName() {
    playersOnline.forEach(function (obj, index, array) {
        if (obj.username != currentPlayerName) return obj.username;
    });
    return "";
}


var playerNumber;
function getCurrentPlayer() {

    var socket = io();
    var currentPlayer = localStorage.getItem("user");
    socket.emit('get Current Player', currentPlayer);
    socket.on('current Player', function (number) {
        //console.log('recept '+ players);
        playerNumber = number;

    });
    return playerNumber;
    /*playersOnline.forEach(function(item)
     {
     switch (item.number){
     case 1 : playerNumber = item.number;
     break;
     case 2 : playerNumber = item.number;
     break;
     }
     return playerNumber;


     /* if(item.username === localStorage.getItem("user") && item.number === 1)
     {
     //console.log(" current player 1 " + item.username);
     playerNumber = item.number;
     return playerNumber;

     }
     if(item.username === localStorage.getItem("user") && item.number === 2)
     {
     playerNumber = item.number;
     //console.log(" current player 2" + item.username);
     return playerNumber;
     }*/
    //});

}

function isInCollision() {
    //ABCD correspondent aux 4 angles du player dans l'ordre d'une montre en partant du haut gauche
    //EFGH correspondent aux 4 angles de l'ennemi dans l'ordre d'une montre en partant du haut gauche
    var __xA = player.x, __xB = player.x + player.width,
        __xE = ennemy.x, __xF = ennemy.x + ennemy.width;
    var __yA = player.y, __yD = player.y + player.height,
        __yE = ennemy.y, __yH = ennemy.y + ennemy.height;

    //Adjustements liés aux espaces blancs des images
    __xA += 10;
    __xB -= 10;
    __xE += 10;
    __xF -= 10;
    __yA += 65;
    __yE += 65;

    return ((__xA >= __xE && __xA <= __xF) || (__xB <= __xF && __xB >= __xE))
        && ((__yA >= __yE && __yA <= __yH) || (__yD <= __yH && __yD >= __yE));
}

function sendDegats(_degats) {
    ennemy.life -= _degats;


    var __degatsMessageJson = '{ "degats" : ' + _degats + '' +
        ', "causedBy" : "' + player.name + '"' +
        ', "infligeTo" : "' + ennemy.name + '" }';

    var socket = io();
    socket.emit('sendDegats', __degatsMessageJson);
}

function sendPlayerInformation() {
    var socket = io();
    socket.emit('updatePlayerPosition', player.toJson());
}

function receiveDegats(jsonString) {
    var objFromJson = JSON.parse(jsonString);
    if (objFromJson.causedBy !== currentPlayerName) {
        player.life -= objFromJson.degats;
        console.log(player.life);
        if(player.life <= 0){

            console.log(" player " + objFromJson.causedBy + " win ");
            var sendedResult = {winnerUser: objFromJson.causedBy , looserUser: currentPlayerName};
            var socket = io();

            socket.emit('sendResult', sendedResult );

        }
    }


}