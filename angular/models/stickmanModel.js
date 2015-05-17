var STICKMAN_NORMAL = "KEY_STICKMAN_NORMAL";
var STICKMAN_UPPER = "KEY_STICKMAN_UPPER";
var STICKMAN_KICK = "KEY_STICKMAN_KICK";
var STICKMAN_CROUCH = "KEY_STICKMAN_CROUCH";
var STICKMAN_CROUCH_BLOCK = "KEY_STICKMAN_CROUCH_BLOCK";
var STICKMAN_BLOCK = "KEY_STICKMAN_BLOCK";
var STICKMAN_FATALITY = "KEY_STICKMAN_FATALITY";
var STICKMAN_WINNER = "KEY_STICKMAN_WINNER";
var STICKMAN_LOOSER = "KEY_STICKMAN_LOOSER";

function StickmanModel(_name,_x,_y,_width,_height,_srcX,_srcY,_imageKey,_isEnnemy) {
    var player = {
        x: _x,
        y: _y,
        name: _name,
        width: _width,
        height: _height,
        imageKey: _imageKey,
        srcX: _srcX,
        srcY: _srcY,
        life: 100,
        score: 0,
        isEnnemy: _isEnnemy,

        draw: function(_context) {
            var image = new Image();
            image.src = getStickmanImagePathFromKey(this.imageKey, this.isEnnemy);
            _context.drawImage(image, this.srcX, this.srcY, this.width, this.height, this.x, this.y, this.width, this.height);
        },

        toJson: function(){
            return '{ ' +
                    '"name": "' + this.name +'"'+
                ',"x": '+ this.x + '' +
                ',"y": ' + this.y + '' +
                ',"width": ' + this.width + '' +
                ',"height": ' + this.height + '' +
                ',"imageKey": "'+ this.imageKey + '"' +
                ',"srcX": ' + this.srcX + '' +
                ',"srcY": ' + this.srcY + '' +
                ',"life": ' + this.life + '' +
                ',"score": ' + this.score + '' +
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
            this.score = objFromJson.score;
            this.name = objFromJson.name;
        }
    };

    return player;
}

function getStickmanImagePathFromKey(_imageKey, _isEnnemy){
    if(_imageKey == STICKMAN_NORMAL){
        if(_isEnnemy) return 'resources/pictures/game/ennemy/stickman_sprite_ennemy.png';
        else return 'resources/pictures/game/player/stickman_sprite.png';
    }  else if (_imageKey == STICKMAN_CROUCH){
        if(_isEnnemy) return 'resources/pictures/game/ennemy/stickman_sprite_crouch_ennemy.png';
        return 'resources/pictures/game/player/stickman_sprite_crouch.png';
    } else if (_imageKey == STICKMAN_KICK){
        if(_isEnnemy) return 'resources/pictures/game/ennemy/stickman_sprite_kick_ennemy.png';
        return 'resources/pictures/game/player/stickman_sprite_kick.png'
    } else if (_imageKey == STICKMAN_UPPER){
        if(_isEnnemy) return 'resources/pictures/game/ennemy/stickman_sprite_uppercut_ennemy.png';
        return 'resources/pictures/game/player/stickman_sprite_uppercut.png'
    } else if (_imageKey == STICKMAN_BLOCK){
        if(_isEnnemy) return 'resources/pictures/game/ennemy/stickman_sprite_block_ennemy.png';
        return 'resources/pictures/game/player/stickman_sprite_block.png'
    } else if (_imageKey == STICKMAN_CROUCH_BLOCK){
        if(_isEnnemy) return 'resources/pictures/game/ennemy/stickman_sprite_crouchBlock_ennemy.png';
        return 'resources/pictures/game/player/stickman_sprite_crouchBlock.png';
    } else if (_imageKey == STICKMAN_FATALITY){
        if (_isEnnemy) return 'resources/pictures/game/ennemy/stickman_sprite_fatality_ennemy.png';
        return 'resources/pictures/game/player/stickman_sprite_fatality.png';
    } else if (_imageKey == STICKMAN_WINNER){
        if (_isEnnemy) return 'resources/pictures/game/ennemy/stickman_sprite_winner_ennemy.png';
        return 'resources/pictures/game/player/stickman_sprite_winner.png';
    } else if (_imageKey == STICKMAN_LOOSER){
        if (_isEnnemy) return 'resources/pictures/game/ennemy/stickman_sprite_crouch_defeat_ennemy.png';
        return 'resources/pictures/game/player/stickman_sprite_crouch_defeat.png';
    }
}