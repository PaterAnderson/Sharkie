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
}