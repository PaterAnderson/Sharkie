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

    setPercentage(percentage) {
        this.percentage = percentage; 
        let path = this.HEALTH_IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

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