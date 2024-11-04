class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    ammoBar = new AmmoBar();
    coinBar = new CoinBar();
    throwableObject = [];
    finslapObject = [];
    canCreateFinslap = true;
    intervalIDs = [];

    collectingCoin_sound = new Audio('audio/coin.mp3');
    collectingAmmo_sound = new Audio('audio/potion.mp3');
    hit_sound = new Audio('audio/enemy-hit.mp3');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        this.intervalIDs.push(setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200));
        this.level.enemies.forEach(enemy => {
            enemy.startAnimation();
        });
        this.level.lights.forEach(light => {
            light.startAnimation();
        });
        this.character.startAnimation();
    }

    stop() {
        this.level.enemies.forEach(enemy => {
            enemy.stopAnimation();
        });
        this.level.lights.forEach(light => {
            light.stopAnimation();
        });
        this.character.stopAnimation();
        this.intervalIDs.forEach(id => {
            clearInterval(id);
        });
    }


    checkThrowObjects() {
        if (this.keyboard.ATTACK && this.canCreateFinslap) {
            let slap = new Finslap(this.character.x + 210, this.character.y + 130, this.character.otherDirection);
            this.finslapObject.push(slap);
            this.canCreateFinslap = false;

            setTimeout(() => {
                this.removeFinslapObject(slap);
            }, 300);

            setTimeout(() => {
                this.canCreateFinslap = true;
            }, 600);
        }
    }


    checkCollisions() {
        this.level.enemies.forEach((enemy, enemyIndex) => {
            if (this.character.isColliding(enemy)) {
                if (enemy.energy > 0) {
                    if (enemy instanceof SuperJellyFish) {
                        this.character.electricHit();
                        this.statusBar.setPercentage(this.character.energy);
                    } else {
                        this.character.hit();
                        this.statusBar.setPercentage(this.character.energy);
                    }
                }
            }


            if (enemy.isDead()) {
                setTimeout(() => {
                    let index = this.level.enemies.indexOf(enemy);
                    if (index != -1) {
                        this.level.enemies.splice(index, 1);
                    }
                }, enemy.despawnTimer);
                if (enemy instanceof Endboss) {
                    setTimeout(() => { 
                        this.stop();
                    }, enemy.despawnTimer);
                }
            }
        });

        this.throwableObject.forEach((throwable, index) => {
            this.level.enemies.forEach((enemy) => {
                if (throwable.isColliding(enemy)) {
                    enemy.bubbleHit();
                    this.hit_sound.play();
                    throwable.remove();
                    this.throwableObject.splice(index, 1);
                }
            });
        });

        this.finslapObject.forEach((finslap, index) => {
            this.level.enemies.forEach((enemy) => {
                if (finslap.isColliding(enemy)) {
                    enemy.bubbleHit();
                    this.hit_sound.play();
                    this.removeFinslapObject();
                }
            });
        });

        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.character.addCoin();
                this.coinBar.setCoins(this.character.coins);
                this.collectingCoin_sound.play();
                this.level.coins.splice(index, 1);
            }
        });

        this.level.ammo.forEach((ammo, index) => {
            if (this.character.isColliding(ammo)) {
                this.character.addAmmo();
                this.ammoBar.setAmmo(this.character.ammo);
                this.collectingAmmo_sound.play();
                this.level.ammo.splice(index, 1);

                let AmmoItemIndex = AmmoItem.ammo.indexOf(ammo);
                AmmoItem.ammo.splice(AmmoItemIndex, 1);

                if (this.level.ammo.length <= 1) {
                    for (let index = this.level.ammo.length; index <= 5; index++) {
                        this.level.ammo.push(new AmmoItem());
                    }
                }
            }
        });
    }

    removeFinslapObject(slap) {
        const index = this.finslapObject.indexOf(slap);
        if (index !== -1) {
            this.finslapObject.splice(index, 1);
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);

        // Space for fixed Objects
        this.addToMap(this.statusBar);
        this.addToMap(this.ammoBar);
        this.addToMap(this.coinBar);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.lights);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.ammo);
        this.addObjectsToMap(this.throwableObject);
        this.addObjectsToMap(this.finslapObject);

        this.ctx.translate(-this.camera_x, 0);

        // Draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach((o) => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawHitbox(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}