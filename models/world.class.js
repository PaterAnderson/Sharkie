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
    canCreateBubble = true;

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
        if (this.keyboard.D && this.canCreateBubble) {
            if (this.character.useAmmo()) {
                let bubble = new ThrowableObject(this.character.x + 180, this.character.y + 100);
                this.throwableObject.push(bubble);
                this.ammoBar.setAmmo(this.character.ammo);
                this.canCreateBubble = false;
            }
            setTimeout(() => {
                this.canCreateBubble = true; 
            }, 600);  
        }
        
        if (this.keyboard.ATTACK && this.canCreateFinslap) {
            let slap = new Finslap(this.character.x + 210, this.character.y + 130);
            this.finslapObject.push(slap);
            this.canCreateFinslap = false;  // Cooldown aktivieren

            // Objekt nach 300 ms löschen
            setTimeout(() => {
                this.removeFinslapObject(slap);
            }, 300);  // Löschen nach 300 ms

            // Cooldown zurücksetzen nach 1 Sekunde
            setTimeout(() => {
                this.canCreateFinslap = true;  // Cooldown zurücksetzen
            }, 600);  // Cooldown-Zeit für die Erstellung eines neuen Finslaps
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
                    let index = this.level.enemies.indexOf(enemy);
                    if (index != -1) {
                        this.level.enemies.splice(index, 1);
                    }
                }, 1000);
            }
        });

        // Check collisions for throwable objects
        this.throwableObject.forEach((throwable, index) => {
            this.level.enemies.forEach((enemy) => {
                if (throwable.isColliding(enemy)) {
                    enemy.bubbleHit();
                    throwable.remove();
                    this.throwableObject.splice(index, 1);
                }
            });
        });

        // Check collisions for finslap objects
        this.finslapObject.forEach((finslap, index) => {
            this.level.enemies.forEach((enemy) => {
                if (finslap.isColliding(enemy)) {
                    enemy.bubbleHit(); // Damaging the enemy
                    this.removeFinslapObject(); // Optionally remove the finslap object upon collision
                    // You can re-enable this if you keep the finslap once created
                    // this.finslapObject.splice(index, 1);
                }
            });
        });

        // Check collisions for coins
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.character.addCoin();
                this.coinBar.setCoins(this.character.coins);
                this.collectingCoin_sound.play();
                this.level.coins.splice(index, 1);
            }
        });

        // Check collisions for ammo
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
            this.finslapObject.splice(index, 1); // Nur das spezifische Finslap-Objekt entfernen
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