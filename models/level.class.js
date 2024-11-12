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
        CoinItem.coins = [];
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

    resetAmmo() {
        this.ammo = [];
        this.ammo = [
            new AmmoItem(),
            new AmmoItem(),
            new AmmoItem(),
            new AmmoItem(),
            new AmmoItem()
        ];
    }


    resetLights() {
        this.lights = [];
        this.lights = [
            new Light()
        ];
    }

    resetBackgroundObjects() {
        this.backgroundObjects = [];
        this.backgroundObjects = [
            new BackgroundObject('img/3. Background/Layers/5. Water/D2.png', -720),
            new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D2.png', -720),
            new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', -720),
            new BackgroundObject('img/3. Background/Layers/2. Floor/D2.png', -720),
    
            new BackgroundObject('img/3. Background/Layers/5. Water/D1.png', 0),
            new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D1.png', 0),
            new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D1.png', 0),
            new BackgroundObject('img/3. Background/Layers/2. Floor/D1.png', 0),
    
            new BackgroundObject('img/3. Background/Layers/5. Water/D2.png', 720),
            new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D2.png', 720),
            new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', 720),
            new BackgroundObject('img/3. Background/Layers/2. Floor/D2.png', 720),
    
            new BackgroundObject('img/3. Background/Layers/5. Water/D1.png', 720 * 2),
            new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D1.png', 720 * 2),
            new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D1.png', 720 * 2),
            new BackgroundObject('img/3. Background/Layers/2. Floor/D1.png', 720 * 2),
    
            new BackgroundObject('img/3. Background/Layers/5. Water/D2.png', 720 * 3),
            new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D2.png', 720 * 3),
            new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', 720 * 3),
            new BackgroundObject('img/3. Background/Layers/2. Floor/D2.png', 720 * 3),
    
            new BackgroundObject('img/3. Background/Layers/5. Water/D1.png', 720 * 4),
            new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D1.png', 720 * 4),
            new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D1.png', 720 * 4),
            new BackgroundObject('img/3. Background/Layers/2. Floor/D1.png', 720 * 4),
        ];
    }
}