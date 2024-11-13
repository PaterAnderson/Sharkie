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

/**
 * The `setAmmo` function sets the ammo value and updates the image based on the new ammo value.
 * @param ammo - The `ammo` parameter in the `setAmmo` function is used to set the ammunition count for
 * a game or application. It is a numerical value representing the amount of ammunition available for
 * the player or character.
 */
    setAmmo(ammo) {
        this.ammo = ammo;
        let path = this.AMMO_IMAGES[this.resolveAmmoIndex()];
        this.img = this.imageCache[path];
    }

/**
 * The function `resolveAmmoIndex` returns an index value based on the amount of ammo available.
 * @returns The resolveAmmoIndex() method returns a numerical value based on the current ammo count. If
 * the ammo count is 10, it returns 5. If the ammo count is 8 or more, it returns 4. If the ammo count
 * is 6 or more, it returns 3. If the ammo count is 4 or more, it returns 2. If the ammo count
 */
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