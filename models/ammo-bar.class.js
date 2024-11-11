class AmmoBar extends DrawableObject {

    AMMO_IMAGES = [
        'img/4. Marcadores/Purple/0_.png',
        'img/4. Marcadores/Purple/20_.png',
        'img/4. Marcadores/Purple/40_.png',
        'img/4. Marcadores/Purple/60_.png',
        'img/4. Marcadores/Purple/80_.png',
        'img/4. Marcadores/Purple/100_.png',
    ];

    constructor() {
        super();
        this.loadImages(this.AMMO_IMAGES);
        this. x = 10;
        this. y = 80;
        this.width = 200;
        this.height = 60;
        this.setAmmo(0);
    }

    setAmmo(ammo) {
        this.ammo = ammo;
        let path = this.AMMO_IMAGES[this.resolveAmmoIndex()];
        this.img = this.imageCache[path];
    }

    resolveAmmoIndex() {
        if (this.ammo == 10) {
            return 5;
        } else if (this.ammo >= 8) {         
            return 4;
        } else if (this.ammo >= 6) { 
            return 3;
        } else if (this.ammo >= 4) { 
            return 2;
        } else if (this.ammo >= 1) { 
            return 1;
        } else {
            return 0;
        }
    }

}