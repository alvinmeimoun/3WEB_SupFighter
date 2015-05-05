function StickmanModel(_x,_y,_width,_height,_srcX,_srcY,_imageSrc) {
    var player = {
        x: _x,
        y: _y,
        width: _width,
        height: _height,
        image: new Image(),
        srcX: _srcX,
        srcY: _srcY,
        draw: function(_context) {
            _context.drawImage(this.image, this.srcX, this.srcY, this.width, this.height, this.x, this.y, this.width, this.height);
        }
    };
    player.image.src = _imageSrc;

    return player;
}