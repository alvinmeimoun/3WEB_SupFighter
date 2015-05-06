var STICKMAN_NORMAL = "KEY_STICKMAN_NORMAL";
var STICKMAN_UPPERRIGHT = "KEY_STICKMAN_UPPERRIGHT";
var STICKMAN_UPPERLEFT = "KEY_STICKMAN_UPPERLEFT";
var STICKMAN_KICKRIGHT = "KEY_SICKMAN_KICKRIGHT";
var STICKMAN_KICKLEFT = "KEY_STICKMAN_KICKLEFT";
var STICKMAN_KICKCROUCH = "KEY_STICKMAN_KICKCROUCH";
var STICKMAN_ENNEMY_NORMAL = "KEY_STICKMAN_ENNEMY_NORMAL";

function StickmanModel(_x,_y,_width,_height,_srcX,_srcY,_imageKey) {
    var player = {
        x: _x,
        y: _y,
        width: _width,
        height: _height,
        imageKey: _imageKey,
        srcX: _srcX,
        srcY: _srcY,
        life: 100,

        draw: function(_context) {
            var image = new Image();
            image.src = getStickmanImagePathFromKey(this.imageKey);
            _context.drawImage(image, this.srcX, this.srcY, this.width, this.height, this.x, this.y, this.width, this.height);
        },

        toJson: function(){
            return '{ ' +
                '"x": "'+ this.x + '"' +
                ',"y": "'+ + this.y + '"' +
                ',"width": "'+ + this.width + '"' +
                ',"height": "'+ + this.height + '"' +
                ',"imageKey": "'+ this.imageKey + '"' +
                ',"srcX": "'+ + this.srcX + '"' +
                ',"srcY": "'+ + this.srcY + '"' +
                ',"life": "'+ + this.life + '"' +
                ' }';
        },

        updateFromJson: function(jsonString){
            var objFromJson = JSON.parse( jsonString );

            this.x = objFromJson.x;
            this.y = objFromJson.y;
            this.width = objFromJson.width;
            this.height = objFromJson.height;
            this.imageKey = objFromJson.imageKey;
            this.srcX = objFromJson.srcX;
            this.srcY = objFromJson.srcY;
            this.life = objFromJson.life;
        }
    };

    return player;
}

function getStickmanImagePathFromKey(_imageKey){
    if(_imageKey == STICKMAN_NORMAL){
        return 'resources/pictures/game/stickman_sprite.png';
    } else if (_imageKey == STICKMAN_UPPERRIGHT){
        return 'resources/pictures/game/stickman_sprite_upperRight.png';
    } else if (_imageKey == STICKMAN_UPPERLEFT){
        return 'resources/pictures/game/stickman_sprite_upperLeft.png';
    } else if (_imageKey == STICKMAN_KICKRIGHT){
        return 'resources/pictures/game/stickman_sprite_kickRight.png';
    } else if (_imageKey == STICKMAN_KICKLEFT){
        return 'resources/pictures/game/stickman_sprite_kickLeft.png';
    } else if (_imageKey == STICKMAN_KICKCROUCH){
        return 'resources/pictures/game/stickman_sprite_crouch.png';
    } else if (_imageKey == STICKMAN_ENNEMY_NORMAL){
        return 'resources/pictures/game/stickman_sprite_ennemy.png';
    }
}