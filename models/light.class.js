class Light extends MovableObject {
    y = 0;
    height = 400;
    width = 500;
    speed = 0.035;

    constructor() {
        super().loadImage('img/3. Background/Layers/1. Light/1.png');

        this.x = Math.random() * 350;
        this.animate();
    }


    animate() {
        this.moveleft();
    }

    moveleft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}