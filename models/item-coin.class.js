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
    static MIN_DISTANCE = 200; // Mindestabstand zwischen den Coins
    static coins = [];

    constructor() {
        super().loadImage('img/4. Marcadores/1. Coins/1.png');
        this.loadImages(this.COIN_IMG);
        this.placeCoin();
        this.animate();

    }

    placeCoin() {
        let validPosition = false;

        while (!validPosition) {
            this.x = 800 + Math.random() * 1500;
            this.y = Math.random() * 450;
            validPosition = this.isPositionValid(this.x, this.y);
        }
        CoinItem.coins.push({ x: this.x, y: this.y });
    }

    isPositionValid(newX, newY) {
        for (let coin of CoinItem.coins) {
            let distance = Math.sqrt(Math.pow(newX - coin.x, 2) + Math.pow(newY - coin.y, 2));
            if (distance < CoinItem.MIN_DISTANCE) {
                return false; // Position ist zu nah, also ungültig
            }
        }
        return true; // Position ist gültig
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.COIN_IMG);
        }, 250);
    };
}