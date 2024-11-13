class EndbossBar extends DrawableObject {
    
    HEALTH_IMAGES = [
        'img/4. Marcadores/orange/1.png',
        'img/4. Marcadores/orange/2.png',
        'img/4. Marcadores/orange/3.png',
        'img/4. Marcadores/orange/4.png',
        'img/4. Marcadores/orange/5.png',
        'img/4. Marcadores/orange/6.png',
    ]

    percentage = 100;

    constructor(x = 500, y = 0) {
        super();
        this.loadImages(this.HEALTH_IMAGES);
        this.x = x;
        this.y = y; 
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    /**
     * The function `setPercentage` sets the percentage value and updates the image based on the
     * percentage.
     * @param percentage - The `percentage` parameter in the `setPercentage` function is used to update
     * the percentage value of an object. This function sets the `percentage` property of the object to
     * the provided value and then resolves the path to the corresponding image based on the updated
     * percentage value.
     */
    setPercentage(percentage) {
        this.percentage = percentage; 
        let path = this.HEALTH_IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * The function `resolveImageIndex` returns an image index based on the value of the `percentage`
     * property.
     * @returns The resolveImageIndex() function returns a numerical value based on the value of the
     * percentage property of the object it is called on. The return value is determined as follows:
     * - If the percentage is exactly 500, it returns 5.
     * - If the percentage is greater than or equal to 400, it returns 4.
     * - If the percentage is greater than or equal to 300, it
     */
    resolveImageIndex() {
        if (this.percentage == 500) {
            return 5;
        } else if (this.percentage >= 400) { 
            return 4;
        } else if (this.percentage >= 300) { 
            return 3;
        } else if (this.percentage >= 200) { 
            return 2;
        } else if (this.percentage >= 100) { 
            return 1;
        } else {
            return 0; 
        }
    }
}