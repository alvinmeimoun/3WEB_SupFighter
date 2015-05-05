var DAMAGE_UPPER = 10;
var DAMAGE_KICK = 5;
var DAMAGE_PUNCH = 5;

var canvas, ctx, player, ennemy,
    width = 500,
    height = 400,
    rightKey = false,
    leftKey = false,
    uppercutKey = false,
    kickRight = false,
    jumpKey = false,
    upKey = false,
    downKey = false;

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
    player.draw(ctx);
    ennemy.draw(ctx);

    if (rightKey == false || leftKey == false || uppercutKey == false|| kickRight == false || jumpKey == false) {
        player.srcX = 10;
    }

    var collision = isInCollision(player, ennemy);
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
    }
    //Fléche gauche
    else if (e.keyCode == 37) {
        leftKey = true;
    }
    //Touche A Uppercut
    else if (e.keyCode == 65) {
        player.image.src = STICKMAN_UPPER;
        uppercutKey = true;
    }
    //Touche Z Kick + Augmentation de la largeur pour le sprite Kick
    else if (e.keyCode == 90){
        player.width = 100;

        player.image.src = STICKMAN_KICKRIGHT;
        kickRight = true;
    }
    //Touche space == Jump + Augmentation de la valeur du saut
    else if(e.keyCode == 32){
        player.y = height - 340;
        player.image.src = STICKMAN_NORMAL;
        jumpKey = true;
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
        player.image.src = STICKMAN_NORMAL;
    }
    //Touche kick == touche relachée + Affichage sprite de base + Rétablissement de la largeur de base
    else if (e.keyCode == 90) {
        kickRight = false;
        player.width = 67;
        player.image.src = STICKMAN_NORMAL;
    }
    //Touche space == touche relachée + Rétablissement de la hauteur de base
    else if (e.keyCode == 32){
        player.y = height - 200;
    }
}

function spriteCall() {
    if (rightKey == true) {

        player.image.src = STICKMAN_NORMAL;
    }
    else if (leftKey == true) {
        player.image.src = STICKMAN_NORMAL;
    }
    else if (uppercutKey == true) {
        player.image.src = STICKMAN_UPPER;

    }
    else if (kickRight == true) {
        player.image.src = STICKMAN_KICKRIGHT;

    }
}
function launchGame() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    player = StickmanModel((width / 8) - 25, height - 200, 67, 200, 10, 0, STICKMAN_NORMAL);
    ennemy = StickmanModel((width / 1) - 100, height - 202, 67, 202, 10, 0, STICKMAN_ENNEMY_NORMAL);

    spriteCall();
    setInterval(loop, 1000 / 30);
    document.addEventListener('keydown', keyDown, false);
    document.addEventListener('keyup', keyUp, false);
};

function isInCollision(playerA, playerB){
    return playerA.x < playerB.x + (playerB.width/2) &&
        playerA.x + playerA.width/2 > playerB.x &&
        playerA.y < playerB.y + playerB.height - 65 &&
        playerA.y + playerA.height > playerB.y  + 65;
}