class ThrowableObject extends MovableObject {
      constructor(x, y, otherDirection = false) {
        super().loadImage('img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png');

        if (otherDirection) {
            this.x = x - 150; 
            this.y = y + 50;
        } else {
            this.x = x; 
            this.y = y + 50; 
        }
        
        this.width = 30; 
        this.height = 30; 
        this.otherDirection = otherDirection; 

        this.throw(); 
    }

    throw() {
        this.speedY = 5;
        this.applyGravity();
        
        let directionMultiplier = this.otherDirection ? -1 : 1; 
        setInterval(() => {
            this.x += directionMultiplier * 30; 
        }, 50);
    }

    hitEnemy(enemy) {
        enemy.hit(this.damage); 
    }

    remove() {
        this.isRemoved = true; 
    }
}