class JellyFish extends MovableObject {

    IMAGES_FLOATING = [
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png'
    ];
    IMAGES_DEAD = [
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L1.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L2.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L3.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L4.png'
    ];
    y = 360;
    height = 80;
    width = 80;
    despawnTimer = 500;
    currentImage = 0;

    constructor() {
        super().loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png');
        this.loadImages(this.IMAGES_FLOATING);

        this.y = Math.random() * 400;
        this.x = 600 + Math.random() * 2500;
        this.speed = 0.15 + Math.random() * 0.25;
    }

    /* The `animate()` method in the `JellyFish` class is responsible for animating the jellyfish
    object. */
    animate() {
        this.moveleft();
        this.intervalIDs.push(setInterval(() => {
            this.updateAnimation();
        }, 250));
    };

    /**
     * The function `updateAnimation` checks if an object is dead and plays the corresponding
     * animation.
     */
    updateAnimation() {
        if (this.isDead()) {
            this.playDeadAnimation(this.IMAGES_DEAD);
        } else {
            this.playAnimation(this.IMAGES_FLOATING);
        }
    }

    /**
     * The function playDeadAnimation cycles through a set of images to create a "dead" animation
     * effect.
     */
    playDeadAnimation() {
        this.currentImage = (this.currentImage + 1) % this.IMAGES_DEAD.length;
        this.loadImage(this.IMAGES_DEAD[this.currentImage]);
    }

}