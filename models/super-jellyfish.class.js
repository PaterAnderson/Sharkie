class SuperJellyFish extends MovableObject {

    y = 360;
    height = 100;
    width = 100;
    IMAGES_FLOATING = [
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 2.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 3.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 4.png'
    ];

    constructor() {
        super().loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png');
        this.loadImages(this.IMAGES_FLOATING);

        this.y = Math.random() * 430;
        this.x = 850 + Math.random() * 2500;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    animate() {
        this.moveleft();
        setInterval(() => {
            this.playAnimation(this.IMAGES_FLOATING);
        }, 250);
    };
}