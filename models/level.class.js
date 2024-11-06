class Level {
    enemies;
    lights;
    coins;
    ammo;
    backgroundObjects;
    level_end_x = 2200;
    level_end_y = 50;

    constructor(enemies, lights, coins, ammo, backgroundObjects) {
        this.enemies = enemies;
        this.lights = lights;
        this.coins = coins;
        this.ammo = ammo;
        this.backgroundObjects = backgroundObjects;
    }

    
    resetEnemies() {
        this.enemies = []; 
        this.enemies = [
            new JellyFish(),
            new JellyFish(),
            new JellyFish(),
            new JellyFish(),
            new JellyFish(),
            new JellyFish(),
            new SuperJellyFish(),
            new SuperJellyFish(),
            new SuperJellyFish(),
            new PufferFish(),
            new PufferFish(),
            new PufferFish(),
            new PufferFish(),
            new PufferFish(),
            new PufferFish(),
            new PufferFish(),
            new Endboss()
        ];
    }

    resetCoins() {
        this.coins = [];
        this.coins = [
            new CoinItem(),
            new CoinItem(),
            new CoinItem(),
            new CoinItem(),
            new CoinItem(),
            new CoinItem(),
            new CoinItem(),
            new CoinItem(),
            new CoinItem(),
            new CoinItem()
        ];
    }


    resetLights() {
        this.lights = [];
        this.lights = [
            new Light()
        ];
    }
}