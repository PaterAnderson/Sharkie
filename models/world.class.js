class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    victoryImage = new Image();
    gameOverImage = new Image();
    tryAgainImage = new Image();
    showVictoryScreen = false;
    showGameOverScreen = false;
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
    winningSound = new Audio('audio/winning.mp3');
    loosingSound = new Audio('audio/loosing.mp3');

    constructor(canvas, keyboard) {
        this.victoryImage.src = "img/6.Botones/Tittles/You win/Mesa de trabajo 1.png";
        this.gameOverImage.src = "img/6.Botones/Tittles/Game Over/Recurso 9.png";
        this.tryAgainImage.src = "img/6.Botones/Try again/Recurso 15.png";
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

    restart() {
        this.stop(); // Stopp alle Animationen und Intervalle
        this.character = new Character(); // Setze den Charakter zurück
        this.level = level1; // Setze das Level zurück

        this.camera_x = 0; // Setze die Kamera zurück
        this.showVictoryScreen = false;
        this.showGameOverScreen = false;

        // Reset der Statusleisten
        this.statusBar = new StatusBar();
        this.ammoBar = new AmmoBar();
        this.coinBar = new CoinBar();

        // Leere die kollektionen für Objekt
        this.throwableObject = [];
        this.finslapObject = [];
        this.canCreateFinslap = true;

        // Setze das Spiel wieder an
        this.setWorld();
        this.run();
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

                    if (enemy instanceof Endboss) {
                        this.showVictoryScreen = true;
                        this.winningSound.play();
                        this.stop();
                    }
                }, enemy.despawnTimer);
            }
            if (this.character.isDead()) {
                setTimeout(() => {
                    this.showGameOverScreen = true;
                    this.loosingSound.play();
                }, 1500);
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
                    if (enemy instanceof PufferFish) {
                        enemy.throw();
                    } else if (enemy instanceof SuperJellyFish) {
                        this.character.electricHit();
                        this.statusBar.setPercentage(this.character.energy);
                    }
                    enemy.slapHit();
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
        if (this.showVictoryScreen) {
            this.ctx.drawImage(this.victoryImage, 0, 0, this.canvas.width, this.canvas.height);
            let tryAgainScaleFactor = 0.3; 
            let tryAgainWidth = this.tryAgainImage.width * tryAgainScaleFactor;
            let tryAgainHeight = this.tryAgainImage.height * tryAgainScaleFactor;
            let tryAgainX = (this.canvas.width - tryAgainWidth) / 2;
            let tryAgainY = this.canvas.height - tryAgainHeight - 100; 
            this.ctx.drawImage(this.tryAgainImage, tryAgainX, tryAgainY, tryAgainWidth, tryAgainHeight);
        } else if (this.showGameOverScreen) {
            let scaleFactor = 0.3;
            let newWidth = this.gameOverImage.width * scaleFactor;
            let newHeight = this.gameOverImage.height * scaleFactor;
            let x = (this.canvas.width - newWidth) / 2;
            let y = (this.canvas.height - newHeight) / 3;
            this.ctx.drawImage(this.gameOverImage, x, y, newWidth, newHeight);
            this.ctx.drawImage(this.tryAgainImage, x + 75, y + 150, newWidth - 150, newHeight - 100);
        }
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