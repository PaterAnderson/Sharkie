class ThrowableObject extends MovableObject {

    constructor(x, y) {
        super().loadImage('img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png');
        this.x = x;
        this.y = y;
        this.height = 30;
        this.width = 30;
        this.damage = 100;
        this.throw();
    }

    throw() {
        this.speedY = 5;
        this.applyGravity();
        setInterval(() => {
            this.x += 30;
        }, 50);
    }

    hitEnemy(enemy) {
        enemy.hit(this.damage); 
    }

    remove() {
        // Logik, um das Wurfobjekt zu entfernen (z.B. von der Welt oder dem Canvas)
        this.isRemoved = true; // Setze ein Flag, um das Wurfobjekt als entfernt zu markieren
    }
}