var canvas, ctx, sprites,spritesEnnemy,
    width = 500,
    height = 400,
    rightKey = false,
    leftKey = false,
    uppercutKey = false,
    kickRight = false,
    upKey = false,
    downKey = false,

    ship_x = (width / 8) - 25, ship_y = height - 200, ship_w = 67, ship_h = 200,
    srcX = 10, srcY = 0,

    ennemy_x = (width / 1) - 100, shipEnnemy_y = height - 202, shipEnnemy_w = 67, shipEnnemy_h = 202,
    srcEnnemyX = 10, srcEnnemyY = 0;

function clearCanvas() {
    ctx.clearRect(0, 0, 500, 400);
}

function drawShip() {
    if (rightKey) {
        ship_x += 5;
        srcX = 83;
    } else if (leftKey) {
        ship_x -= 5;
        srcX = 156;
    }
    ctx.drawImage(sprites, srcX, srcY, ship_w, ship_h, ship_x, ship_y, ship_w, ship_h);
    ctx.drawImage(spritesEnnemy, srcEnnemyX, srcEnnemyY, shipEnnemy_w, shipEnnemy_h, ennemy_x, shipEnnemy_y, shipEnnemy_w, shipEnnemy_h);
    if (rightKey == false || leftKey == false || uppercutKey == false|| kickRight == false) {
        srcX = 10;
    }
}

function loop() {
    clearCanvas();
    drawShip();
}

function keyDown(e) {
    if (e.keyCode == 39) {
        console.log("RIGHT");
        //sprites.src = 'resources/pictures/game/stickman_sprite.png';
        rightKey = true;
    }
    else if (e.keyCode == 37) {
        console.log("LEFT");
        //sprites.src = 'resources/pictures/game/stickman_sprite.png';
        leftKey = true;
    }
    else if (e.keyCode == 65) {
        console.log("A");
        sprites.src = 'resources/pictures/game/stickman_sprite_upper.png';
        uppercutKey = true;
    }
    else if (e.keyCode == 90){
        console.log("Z");
        ship_w = 100;

        sprites.src = 'resources/pictures/game/stickman_sprite_kickRigt.png';
        kickRight = true;
    }
}
function keyUp(e) {
    if (e.keyCode == 39) {
        rightKey = false;
    }
    else if (e.keyCode == 37) {
        leftKey = false;
    }
    else if (e.keyCode == 65) {
        uppercutKey = false;
        sprites.src = 'resources/pictures/game/stickman_sprite.png';
    }
    else if (e.keyCode == 90) {
        kickRight = false;
        ship_w = 67;
        sprites.src = 'resources/pictures/game/stickman_sprite.png';
    }
}

function spriteCall() {
    if (rightKey == true) {

        sprites.src = 'resources/pictures/game/stickman_sprite.png';
    }
    else if (leftKey == true) {
        sprites.src = 'resources/pictures/game/stickman_sprite.png';
    }
    else if (uppercutKey == true) {

        console.log("A");
        sprites.src = 'resources/pictures/game/stickman_sprite_upper.png';

    }
    else if (kickRight == true) {

        console.log("A");
        sprites.src = 'resources/pictures/game/stickman_sprite_kickRigt.png';

    }
}
function launchGame() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    sprites = new Image();
    sprites.src = 'resources/pictures/game/stickman_sprite.png';
    spritesEnnemy = new Image();
    spritesEnnemy.src = 'resources/pictures/game/stickman_sprite_ennemy.png';

    spriteCall();
    setInterval(loop, 1000 / 30);
    document.addEventListener('keydown', keyDown, false);
    document.addEventListener('keyup', keyUp, false);
};