class CoinBar extends DrawableObject {

    COIN_IMAGES = [
        'img/4. Marcadores/Purple/0_ _1.png',
        'img/4. Marcadores/Purple/20_ .png',
        'img/4. Marcadores/Purple/40_ _1.png',
        'img/4. Marcadores/Purple/60_ _1.png',
        'img/4. Marcadores/Purple/80_ _1.png',
        'img/4. Marcadores/Purple/100__1.png',
    ];

    constructor() {
        super();
        this.loadImages(this.COIN_IMAGES);
        this. x = 10;
        this. y = 40;
        this.width = 200;
        this.height = 60;
        this.setCoins(0);
    }

/**
 * The `setCoins` function sets the number of coins and updates the image displayed accordingly.
 * @param coins - The `coins` parameter in the `setCoins` function is used to set the value of the
 * `coins` property of the object. This function also uses the `coins` value to determine the path of
 * the image to be displayed based on the resolved coin index.
 */
    setCoins(coins) {
        this.coins = coins; 
        let path = this.COIN_IMAGES[this.resolveCoinIndex()];
        this.img = this.imageCache[path];
    }

/**
 * The `resolveCoinIndex` function returns an index based on the number of coins, with specific
 * thresholds for different index values.
 * @returns The `resolveCoinIndex` function returns a value based on the number of coins. If the number
 * of coins is 10, it returns 5. If the number of coins is greater than or equal to 8, it returns 4. If
 * the number of coins is greater than or equal to 6, it returns 3. If the number of coins is greater
 * than or equal to
 */
    resolveCoinIndex() {
        if (this.coins == 10) {
            return 5;
        } else if (this.coins >= 8) {
            return 4;
        } else if (this.coins >= 6) {
            return 3;
        } else if (this.coins >= 4) {
            return 2;
        } else if (this.coins >= 2) {
            return 1;
        } else {
            return 0;
        }
    }

}