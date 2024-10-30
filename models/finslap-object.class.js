class Finslap extends MovableObject {

    constructor(x, y, otherDirection = false) {
        super().loadImage('img/1.Sharkie/4.Attack/Fin slap/hitbox.png');
        
        if (otherDirection) {
            this.x = x - 210; 
            this.y = y;      
        } else {
            this.x = x;      
            this.y = y;      
        }
        
        this.height = 30;
        this.width = 40;
        this.damage = 100;
        this.otherDirection = otherDirection; 
        this.throw();
    }

    throw() {
        this.speedY = 2;
        this.applyGravity();

        const directionMultiplier = this.otherDirection ? -1 : 1; 
        setInterval(() => {
            this.x += directionMultiplier; 
        }, 50);
    }
}