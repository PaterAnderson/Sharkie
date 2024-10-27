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
    collectingCoin_sound = new Audio('audio/coin.mp3');
    collectingAmmo_sound = new Audio('audio/potion.mp3');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200);
    }

    checkThrowObjects() {
        if (this.keyboard.D) {
            if (this.character.useAmmo()) {
                let bubble = new ThrowableObject(this.character.x + 180, this.character.y + 100);
                this.throwableObject.push(bubble);

                this.ammoBar.setAmmo(this.character.ammo);
            } else {
            }
        }
    }

    checkCollisions() {

        this.level.enemies.forEach((enemy, enemyIndex) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }

            if (enemy.isDead()) {
                setTimeout(() => {
                    let index = this.level.enemies.indexOf(enemy)
                    if (index != -1) {
                        this.level.enemies.splice(index, 1);
                    }
                }, 1000); 
            }});

        this.throwableObject.forEach((throwable, index) => {
            this.level.enemies.forEach((enemy) => {
                if (throwable.isColliding(enemy)) {
                    enemy.bubbleHit();
                    throwable.remove();
                    this.throwableObject.splice(index, 1);
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

    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height)

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);
        //--------Space for fixed Objects----------
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
        };
        mo.draw(this.ctx);
        mo.drawHitbox(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        };
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