class SuperJellyFish extends MovableObject {

    IMAGES_FLOATING = [
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 2.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 3.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 4.png'
    ];

    y = 360;
    height = 100;
    width = 100;
    energy = 150;

    constructor() {
        super().loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png');
        this.loadImages(this.IMAGES_FLOATING);

        this.y = Math.random() * 430;
        this.x = 850 + Math.random() * 2000;
        this.speed = 0.15 + Math.random() * 0.25;
    }

    /* The `animate()` method in the `SuperJellyFish` class is defining the behavior of the object when
    it is animated. */
    animate() {
        this.moveleft();
        this.intervalIDs.push(setInterval(() => {
            this.playAnimation(this.IMAGES_FLOATING);
        }, 250));
    };
}