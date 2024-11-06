class PufferFish extends MovableObject {

    IMAGES_FLOATING = [
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png',
    ];
    IMAGES_BULKFLOAT = [
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim5.png',
    ];
    IMAGES_BULKING = [
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition5.png',
    ];
    IMAGES_DEAD = [
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png',
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 2 (can animate by going down to the floor after the Fin Slap attack).png',
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 3 (can animate by going down to the floor after the Fin Slap attack).png',
    ];

    y = 360;
    height = 60;
    width = 80;
    currentImage = 0; 
    energy = 50; 
    despawnTimer = 500;

    constructor() {
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.loadImages(this.IMAGES_FLOATING);
        this.loadImages(this.IMAGES_BULKFLOAT);
        this.loadImages(this.IMAGES_BULKING);
        this.loadImages(this.IMAGES_DEAD);

        this.y = Math.random() * 450;
        this.x = 700 + Math.random() * 2500;
        this.speed = 0.15 + Math.random() * 0.45;
        this.isBulking = false; // Flag um zu wissen, ob wir bereits in der Bulk Animation sind.
        this.hasBulked = false; // Flag um zu wissen, ob die Bulk Animation bereits abgespielt wurde.
    }

    animate() {
        this.moveleft();
        this.intervalIDs.push(setInterval(() => {
            this.updateAnimation();
        }, 150));
    }

    updateAnimation() {
        // Berechne die Abstände zum Character
        let distanceX = this.x - world.character.x;
        let distanceY = this.y - world.character.y;
        let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        if (this.isDead()) {
            this.playDeadAnimation(this.IMAGES_DEAD);
            return;
        }

        // Überprüfung, ob der Pufferfish in den Radius des Characters kommt
        if (distance < 300 && !this.hasBulked && !this.isBulking) {
            this.playBulkAnimation();
        } else if (this.isBulking) {
        } else if (this.hasBulked) {
            this.playAnimation(this.IMAGES_BULKFLOAT); // Immer in BulkFloat bleiben
        } else {
            this.playAnimation(this.IMAGES_FLOATING);
        }
    }

    async playBulkAnimation() {
        this.isBulking = true; // Setze das Flag, da nun die Bulk Animation startet
        this.hasBulked = true; // Setze das Flag, dass die Bulk Animation bereits abgespielt wurde
        this.currentImage = 0;
        for (let index = 0; index < this.IMAGES_BULKING.length; index++) {
            this.playAnimation(this.IMAGES_BULKING);
            await this.sleep(150); // Warten für die Dauer der Animation
        }
        this.isBulking = false; // Setze das Flag zurück, nachdem die Bulking-Animation beendet ist
    }

    playDeadAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        if (i < images.length - 1) {
            this.currentImage++;
        }
    }

    throw() {
        this.speedY = 25;
        this.applyGravity();
        
        let directionMultiplier = this.otherDirection ? -1 : 1; 
        setInterval(() => {
            this.x += directionMultiplier * -10; 
        }, 1000 / 60);
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}