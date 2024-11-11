class DrawableObject {
    x = 120;
    y = 200;
    img;
    height = 100;
    width = 100;
    imageCache = {};
    currentImage = 0;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    getHitbox() {
        let hitbox = {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
        return hitbox;
    }

    drawHitbox(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'transparent';
        ctx.rect(this.getHitbox().x, this.getHitbox().y, this.getHitbox().width, this.getHitbox().height);
        ctx.stroke();
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}





