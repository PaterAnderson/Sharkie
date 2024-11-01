class JellyFish extends MovableObject {

    y = 360;
    height = 80;
    width = 80;
    IMAGES_FLOATING = [
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png'
    ];

    constructor() {
        super().loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png');
        this.loadImages(this.IMAGES_FLOATING);

        this.y = Math.random() * 400;
        this.x = 600 + Math.random() * 2500;
        this.speed = 0.15 + Math.random() * 0.25;
    }

    animate() {
        this.moveleft();
        this.intervalIDs.push(setInterval(() => {
            this.playAnimation(this.IMAGES_FLOATING);
        }, 250));
    };
}