class AmmoItem extends MovableObject {
    AMMO_IMG = [
        'img/4. Marcadores/Posión/Animada/1.png',
        'img/4. Marcadores/Posión/Animada/2.png',
        'img/4. Marcadores/Posión/Animada/3.png',
        'img/4. Marcadores/Posión/Animada/4.png',
        'img/4. Marcadores/Posión/Animada/5.png',
        'img/4. Marcadores/Posión/Animada/6.png',
        'img/4. Marcadores/Posión/Animada/7.png',
        'img/4. Marcadores/Posión/Animada/8.png',
    ];

    y = 10;
    height = 60;
    width = 50;
    static MIN_DISTANCE = 100;
    static ammo = [];
    static MAX_Y = 500; 
    intervalIDs = [];

    constructor(world) {
        super().loadImage('img/4. Marcadores/Posión/Animada/1.png');
        this.loadImages(this.AMMO_IMG);
        this.placeAmmo();
        this.world = world; 
    }

    placeAmmo() {
        this.x = 800 + Math.random() * 1500;
        this.y = Math.random() * -100;

        AmmoItem.ammo.push({ x: this.x, y: this.y });
    }

    animate() {
        this.drop();
        this.intervalIDs.push(setInterval(() => {
            this.playAnimation(this.AMMO_IMG);
        }, 250));
    }

    drop() {
        this.speedY = 40;
        const gravityInterval = setInterval(() => {
            this.y += 1;
            if (this.y >= AmmoItem.MAX_Y) {
                this.y = AmmoItem.MAX_Y;
                AmmoItem.ammo = AmmoItem.ammo.filter(ammo => ammo.x !== this.x && ammo.y !== this.y);
                this.placeAmmo();
                this.drop();
                clearInterval(gravityInterval);
            }
        }, 30);
        this.intervalIDs.push(gravityInterval);
    }

    static resetAmmo() {
        AmmoItem.ammo.forEach(ammo => {
            ammo.intervalIDs.forEach(id => clearInterval(id));
        });
        AmmoItem.ammo = [];
    }
}