var DAMAGE_UPPER = 10;
var DAMAGE_KICK = 5;
var DAMAGE_PUNCH = 5;

var canvas, ctx, player, ennemy,
    width = 500,
    height = 400,
    rightKey = false,
    leftKey = false,
    uppercutKey = false,
    kickKey = false,
    jumpKey = false,
    crouchKey = false,
    upKey = false,
    downKey = false;

var damageHandledUpper = false, damageHandlerKick = false;

function clearCanvas() {
    ctx.clearRect(0, 0, width, height);
}

function drawShip() {
    if (rightKey) {
        player.x += 5;
        player.srcX = 83;
    } else if (leftKey) {
        player.x -= 5;
        player.srcX = 156;
    }
    else if (jumpKey) {

    }
    player.draw(ctx);
    ennemy.draw(ctx);

    if (rightKey == false || leftKey == false || uppercutKey == false || kickKey == false || jumpKey == false || crouchKey == false ) {
        player.srcX = 10;
    }

    var collision = isInCollision(player, ennemy);

    //Check damage upper
    if(!damageHandledUpper && collision && uppercutKey){
        ennemy.life -= DAMAGE_UPPER;
        damageHandledUpper = true;
    }
    //Check damage kick
    if(!damageHandlerKick && collision && kickKey){
        ennemy.life -= DAMAGE_KICK;
        damageHandlerKick = true;
    }

    //On reset l'état des handler damage
    if(!uppercutKey){
        damageHandledUpper = false;
    }
    if(!kickKey){
        damageHandlerKick = false;
    }
}

function loop() {
    clearCanvas();
    drawShip();
}

function keyDown(e) {

    //Documentation key
    //http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes

    //Fléche droite
    if (e.keyCode == 39) {
        rightKey = true;

        //UppercutKey pressée au moment du déplacement == le player s'arrête
        if (uppercutKey == true) {
            player.x += 0;
            rightKey = false;
        }
        //KickRight pressée au moment du déplacement == le player s'arrête
        else if (kickKey == true){
            player.x += 0;
            rightKey = false;
        }
        //Crouch pressée au moment du déplacement == le player s'arrête
        else if (crouchKey == true){
            player.x += 0;
            rightKey = false;
        }
    }
    //Fléche gauche
    else if (e.keyCode == 37) {
        leftKey = true;

        //UppercutKey pressée au moment du déplacement == le player s'arrête
        if (uppercutKey == true) {
            player.x -= 0;
            leftKey = false;
        }
        //KickRight pressée au moment du déplacement == le player s'arrête
        else if (kickKey == true){
            player.x -= 0;
            leftKey = false;
        }
        //crouch pressée au moment du déplacement == le player s'arrête
        else if (crouchKey == true){
            player.x -= 0;
            leftKey = false;
        }
    }

    //Touche A Uppercut
    else if (e.keyCode == 65) {

        //Touche droite préssée au moment du Upper == Sprite kick Droite
        if(rightKey == true){
            player.imageKey = STICKMAN_UPPERRIGHT;
        }
        //Touche gauche préssée au moment du Upper == Sprite kick Gauche
        else if(leftKey == true){
            player.imageKey = STICKMAN_UPPERLEFT;
        }
        //Disparaîtra avec les futur mises à jour
        //Pose probléme vu que le profil n'est pas bloquer
        //Touche rightKey && leftKey préssée == Upper de base
        else if (rightKey == false && leftKey == false){
            //player.imageKey = STICKMAN_UPPERRIGHT;
        }

        //Touche droite ou gauche pressée au moment de l'uppercut == le player ne bouge plus
        if (rightKey == true || leftKey == true) {

            rightKey = false;
            player.x += 0;

            leftKey = false;
            player.x -= 0;
        }

        uppercutKey = true;
    }

    //Touche Z Kick + Augmentation de la largeur pour le sprite Kick
    else if (e.keyCode == 90) {

        console.log("right " + rightKey);
        console.log("left " + leftKey);

        //Touche droite préssée au moment du Kick == Sprite kick Droite
        if(rightKey == true && leftKey == false){
            player.imageKey = STICKMAN_KICKRIGHT;
        }
        //Touche gauche préssée au moment du Kick == Sprite kick Gauche
        else if(leftKey == true && rightKey == false){
            player.imageKey = STICKMAN_KICKLEFT;
        }
        //Disparaîtra avec les futur mises à jour
        //Pose probléme vu que le profil n'est pas bloquer
        //Touche rightKey && leftKey préssée == Kick de base
        else if (rightKey == false && leftKey == false){
            //player.imageKey = STICKMAN_KICKRIGHT;
        }

        //Touche droite ou gauche pressée au moment du KickRight == le player ne bouge plus
        if (rightKey == true || leftKey == true) {

            rightKey = false;
            player.x += 0;

            leftKey = false;
            player.x -= 0;
        }

        player.width = 100;
        kickKey = true;
    }

    //Touche space == Jump + Augmentation de la valeur du saut
    else if (e.keyCode == 32) {
        player.y = height - 340;
        player.imageKey = STICKMAN_NORMAL;
        jumpKey = true;
    }
    //Touche bas == accroupir
    else if (e.keyCode == 40) {

        player.imageKey = STICKMAN_KICKCROUCH;

        //Touche droite ou gauche pressée au moment de s'accroupir == le player ne bouge plus
        if (rightKey == true || leftKey == true) {

            rightKey = false;
            player.x += 0;

            leftKey = false;
            player.x -= 0;
        }
        crouchKey = true;
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
    //Touche kick == touche relachée + Affichage sprite de base + Rétablissement de la largeur de base
    else if (e.keyCode == 90) {
        kickKey = false;
        player.width = 67;
        player.imageKey = STICKMAN_NORMAL;
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
    }


}


function launchGame() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    player = StickmanModel((width / 8) - 25, height - 200, 67, 200, 10, 0, STICKMAN_NORMAL, false);
    ennemy = StickmanModel((width / 1) - 100, height - 202, 67, 202, 10, 0, STICKMAN_NORMAL, true);

    setInterval(loop, 1000 / 30);
    document.addEventListener('keydown', keyDown, false);
    document.addEventListener('keyup', keyUp, false);
};

function isInCollision(playerA, playerB) {
    return playerA.x < playerB.x + (playerB.width / 2) &&
        playerA.x + playerA.width / 2 > playerB.x &&
        playerA.y < playerB.y + playerB.height - 65 &&
        playerA.y + playerA.height > playerB.y + 65;
}