var STICKMAN_NORMAL = 'resources/pictures/game/stickman_sprite.png';
var STICKMAN_UPPERRIGHT = 'resources/pictures/game/stickman_sprite_upperRight.png';
var STICKMAN_UPPERLEFT = 'resources/pictures/game/stickman_sprite_upperLeft.png';
var STICKMAN_KICKRIGHT = 'resources/pictures/game/stickman_sprite_kickRight.png';
var STICKMAN_KICKLEFT = 'resources/pictures/game/stickman_sprite_kickLeft.png';
var STICKMAN_ENNEMY_NORMAL = 'resources/pictures/game/stickman_sprite_ennemy.png';

function StickmanModel(_x,_y,_width,_height,_srcX,_srcY,_imageSrc) {
    var player = {
        x: _x,
        y: _y,
        width: _width,
        height: _height,
        image: new Image(),
        srcX: _srcX,
        srcY: _srcY,
        life: 100,

        draw: function(_context) {
            _context.drawImage(this.image, this.srcX, this.srcY, this.width, this.height, this.x, this.y, this.width, this.height);
        }
    };
    player.image.src = _imageSrc;

    return player;
}