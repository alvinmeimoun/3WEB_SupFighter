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

    //TODO collision
    //var collision = ship_x < ennemy_x + shipEnnemy_w &&
    //    ship_x + ship_w > ennemy_x &&
    //    ship_y < shipEnnemy_y + shipEnnemy_h &&
    //    ship_y + ship_h > shipEnnemy_y;
    //console.log(collision);
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
        player.image.src = 'resources/pictures/game/stickman_sprite_upper.png';
        uppercutKey = true;
    }
    //Touche Z Kick + Augmentation de la largeur pour le sprite Kick
    else if (e.keyCode == 90){
        player.width = 100;

        player.image.src = 'resources/pictures/game/stickman_sprite_kickRigt.png';
        kickRight = true;
    }
    //Touche space == Jump + Augmentation de la valeur du saut
    else if(e.keyCode == 32){
        player.y = height - 340;
        player.image.src = 'resources/pictures/game/stickman_sprite.png';
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
        player.image.src = 'resources/pictures/game/stickman_sprite.png';
    }
    //Touche kick == touche relachée + Affichage sprite de base + Rétablissement de la largeur de base
    else if (e.keyCode == 90) {
        kickRight = false;
        player.width = 67;
        player.image.src = 'resources/pictures/game/stickman_sprite.png';
    }
    //Touche space == touche relachée + Rétablissement de la hauteur de base
    else if (e.keyCode == 32){
        player.y = height - 200;
    }
}

function spriteCall() {
    if (rightKey == true) {

        player.image.src = 'resources/pictures/game/stickman_sprite.png';
    }
    else if (leftKey == true) {
        player.image.src = 'resources/pictures/game/stickman_sprite.png';
    }
    else if (uppercutKey == true) {
        player.image.src = 'resources/pictures/game/stickman_sprite_upper.png';

    }
    else if (kickRight == true) {
        player.image.src = 'resources/pictures/game/stickman_sprite_kickRigt.png';

    }
}
function launchGame() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    player = StickmanModel((width / 8) - 25, height - 200, 67, 200, 10, 0, 'resources/pictures/game/stickman_sprite.png');
    ennemy = StickmanModel((width / 1) - 100, height - 202, 67, 202, 10, 0, 'resources/pictures/game/stickman_sprite_ennemy.png');

    spriteCall();
    setInterval(loop, 1000 / 30);
    document.addEventListener('keydown', keyDown, false);
    document.addEventListener('keyup', keyUp, false);
};