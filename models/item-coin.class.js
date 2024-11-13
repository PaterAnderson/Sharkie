class CoinItem extends MovableObject {
    COIN_IMG = [
        'img/4. Marcadores/1. Coins/1.png',
        'img/4. Marcadores/1. Coins/2.png',
        'img/4. Marcadores/1. Coins/3.png',
        'img/4. Marcadores/1. Coins/4.png'
    ];

    y = 30;
    height = 40;
    width = 40;
    static MIN_DISTANCE = 250; 
    static coins = [];

    constructor() {
        super().loadImage('img/4. Marcadores/1. Coins/1.png');
        this.loadImages(this.COIN_IMG);
        this.placeCoin();
    }

    /**
     * The `placeCoin` function generates random coordinates for a coin and ensures the position is
     * valid before adding it to the list of coins.
     */
    placeCoin() {
        let validPosition = false;

        while (!validPosition) {
            this.x = 800 + Math.random() * 1500;
            this.y = Math.random() * 450;
            validPosition = this.isPositionValid(this.x, this.y);
        }
        CoinItem.coins.push({ x: this.x, y: this.y });
    }

    /**
     * The function `isPositionValid` checks if a new position is valid based on the distance from
     * existing coins.
     * @param newX - The `newX` parameter represents the x-coordinate of a potential new position.
     * @param newY - The `newY` parameter represents the new y-coordinate of a position that you want
     * to check for validity. The `isPositionValid` function checks if this new position is valid based
     * on the distance from existing coins.
     * @returns The function `isPositionValid(newX, newY)` is returning a boolean value. It returns
     * `false` if the new position (newX, newY) is too close to any existing coin (within a minimum
     * distance specified by `CoinItem.MIN_DISTANCE`), and it returns `true` if the new position is
     * valid and not too close to any existing coin.
     */
    isPositionValid(newX, newY) {
        for (let coin of CoinItem.coins) {
            let distance = Math.sqrt(Math.pow(newX - coin.x, 2) + Math.pow(newY - coin.y, 2));
            if (distance < CoinItem.MIN_DISTANCE) {
                return false; 
            }
        }
        return true; 
    }

    /* The `animate()` method in the `CoinItem` class is setting up an animation for the coin object.
    It uses `setInterval()` to repeatedly call a function that plays the animation of the coin by
    cycling through the images in the `COIN_IMG` array every 250 milliseconds. This creates a visual
    effect of the coin appearing to move or change its appearance at a regular interval. The
    `intervalIDs` array is used to keep track of the interval IDs created by `setInterval()` so that
    they can be cleared later if needed to stop the animation. */
    animate() {
        this.intervalIDs.push(setInterval(() => {
            this.playAnimation(this.COIN_IMG);
        }, 250));
    };
}