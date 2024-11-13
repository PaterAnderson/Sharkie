class DrawableObject {
    x = 120;
    y = 200;
    img;
    height = 100;
    width = 100;
    imageCache = {};
    currentImage = 0;

    /**
    * Loads an image from the specified path.
    * @param {string} path - The path to the image file to load.
    */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the image on the specified canvas context at the object's position.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to draw on.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Retrieves the hitbox of the object.
     * @returns {Object} An object representing the hitbox with properties x, y, width, and height.
     */
    getHitbox() {
        let hitbox = {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
        return hitbox;
    }

    /**
     * Draws the hitbox for debugging purposes on the specified canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to draw the hitbox on.
     */
    drawHitbox(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'transparent';
        ctx.rect(this.getHitbox().x, this.getHitbox().y, this.getHitbox().width, this.getHitbox().height);
        ctx.stroke();
    }

    /**
     * Loads multiple images from an array of paths into an image cache.
     * @param {string[]} arr - An array of paths to the image files to load.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}





