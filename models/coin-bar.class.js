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

    setCoins(coins) {
        this.coins = coins; // => 0 ... 5
        let path = this.COIN_IMAGES[this.resolveCoinIndex()];
        this.img = this.imageCache[path];
    }

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