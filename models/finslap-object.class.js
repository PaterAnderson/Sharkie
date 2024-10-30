class Finslap extends MovableObject {

    constructor(x, y) {
        super().loadImage('img/1.Sharkie/4.Attack/Fin slap/hitbox.png');
        this.x = x;
        this.y = y;
        this.height = 30;
        this.width = 40;
        this.damage = 100;
        this.throw();
    }

    throw() {
        this.speedY = 2;
        this.applyGravity();
        setInterval(() => {
            this.x += 1;
        }, 50);
    }
}