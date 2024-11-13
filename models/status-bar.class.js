class StatusBar extends DrawableObject {

    HEALTH_IMAGES = [
        'img/4. Marcadores/Purple/0_ .png',
        'img/4. Marcadores/Purple/20__1.png',
        'img/4. Marcadores/Purple/40_ .png',
        'img/4. Marcadores/Purple/60_ .png',
        'img/4. Marcadores/Purple/80_ .png',
        'img/4. Marcadores/Purple/100_ .png'
    ];

    percentage = 100;

    constructor(x = 10, y = 0) {
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
     * the provided value and then resolves the image path based on the updated percentage value.
     */
    setPercentage(percentage) {
        this.percentage = percentage; 
        let path = this.HEALTH_IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * The function `resolveImageIndex` returns an image index based on the percentage value provided.
     * @returns The resolveImageIndex() function returns a numerical value based on the percentage
     * property of the object it is called on. The value returned corresponds to different image
     * indexes based on the percentage value. If the percentage is 100, it returns 5. If the percentage
     * is greater than or equal to 80, it returns 4. If the percentage is greater than or equal to 60,
     * it returns
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) { 
            return 4;
        } else if (this.percentage >= 60) { 
            return 3;
        } else if (this.percentage >= 40) { 
            return 2;
        } else if (this.percentage >= 10) { 
            return 1;
        } else {
            return 0; 
        }
    }

}
