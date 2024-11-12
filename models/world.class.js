class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    victoryImage = new Image();
    gameOverImage = new Image();
    showVictoryScreen = false;
    showGameOverScreen = false;
    statusBar = new StatusBar();
    ammoBar = new AmmoBar();
    coinBar = new CoinBar();
    throwableObject = [];
    finslapObject = [];
    canCreateFinslap = true;
    intervalIDs = [];
    isGamePaused = false;
    isGameStopped = false;

    collectingCoin_sound = new Audio('audio/coin.mp3');
    collectingAmmo_sound = new Audio('audio/potion.mp3');
    hit_sound = new Audio('audio/enemy-hit.mp3');
    winningSound = new Audio('audio/winning.mp3');
    loosingSound = new Audio('audio/loosing.mp3');

    constructor(canvas, keyboard) {
        this.loadImages();
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.isSoundMuted = false;
        this.endbossBar = new StatusBar(500);
        this.draw();
        this.expectPause();
        this.endboss = new Endboss(this);
    }

    loadImages() {
        this.victoryImage.src = "img/6.Botones/Tittles/You win/Mesa de trabajo 1.png";
        this.gameOverImage.src = "img/6.Botones/Tittles/Game Over/Recurso 9.png";
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        this.intervalIDs.push(setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkEndbossPosition();
            removeStartMenu();
        }, 200));
        this.level.enemies.forEach(enemy => enemy.startAnimation());
        this.level.lights.forEach(light => light.startAnimation());
        this.level.coins.forEach(coin => coin.startAnimation());
        this.level.ammo.forEach(ammo => ammo.startAnimation());
        this.character.startAnimation();
        this.isGameStopped = false;
    }

    stop() {
        if (this.isGameStopped) return;
        this.isGameStopped = true;
        this.level.enemies.forEach(enemy => enemy.stopAnimation());
        this.level.lights.forEach(light => light.stopAnimation());
        this.level.coins.forEach(coin => coin.stopAnimation());
        this.level.ammo.forEach(ammo => ammo.stopAnimation());
        this.character.stopAnimation();
        this.intervalIDs.forEach(id => clearInterval(id));
        this.intervalIDs = [];
    }

    restart() {
        this.stop();
        this.resetWorld();
        this.setWorld();
        this.run();
    }

    resetWorld() {
        this.character = new Character();
        this.camera_x = 0;
        this.resetFlags();
        this.resetObjects();
        this.throwableObject = [];
        this.finslapObject = [];
        this.resetWorldItems();
        removeRetryButton();
        removeRetryButton2();
    }

    resetWorldItems() {
        this.level.resetEnemies();
        this.level.resetCoins();
        this.level.resetAmmo();
        this.level.resetLights();
        this.level.resetBackgroundObjects();
    }

    resetFlags() {
        this.isSoundMuted = false;
        this.showVictoryScreen = false;
        this.showGameOverScreen = false;
        this.canCreateFinslap = true;
    }

    resetObjects() {
        this.statusBar = new StatusBar();
        this.ammoBar = new AmmoBar();
        this.coinBar = new CoinBar();
    }

    checkThrowObjects() {
        if (this.keyboard.ATTACK && this.canCreateFinslap) {
            this.createFinslap();
        }
    }

    createFinslap() {
        let slap = new Finslap(this.character.x + 210, this.character.y + 130, this.character.otherDirection);
        this.finslapObject.push(slap);
        this.canCreateFinslap = false;

        setTimeout(() => this.removeFinslapObject(slap), 300);
        setTimeout(() => this.canCreateFinslap = true, 600);
    }

    checkCollisions() {
        this.checkCharacterEnemyCollisions();
        this.checkThrowableCollisions();
        this.checkCoinCollisions();
        this.checkAmmoCollisions();
    }

    checkCharacterEnemyCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.isGameStopped) {
                this.handleCharacterHitByEnemy(enemy);
            }
            if (enemy.isDead() && !this.isGameStopped) {
                this.handleEnemyDeath(enemy);
            }
        });
        if (this.character.isDead() && !this.isGameStopped) {
            this.showGameOver();
        }
    }

    handleCharacterHitByEnemy(enemy) {
        if (enemy.energy > 0) {
            if (enemy instanceof SuperJellyFish) {
                this.character.electricHit();
            } else {
                this.character.hit();
            }
            this.statusBar.setPercentage(this.character.energy);
        }
    }

    handleEnemyDeath(enemy) {
        setTimeout(() => {
            const index = this.level.enemies.indexOf(enemy);
            if (index !== -1) {
                this.level.enemies.splice(index, 1);
            }
            if (enemy instanceof Endboss) {
                this.showVictoryScreen = true;
                this.winningSound.play();
                this.stop();
            }
        }, enemy.despawnTimer);
    }

    showGameOver() {
        setTimeout(() => {
            this.showGameOverScreen = true;
            this.loosingSound.play();
            this.stop();
        }, 1500);
    }

    checkThrowableCollisions() {
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
                    this.handleFinslapHit(enemy);
                    this.removeFinslapObject(finslap);
                }
            });
        });
    }

    handleFinslapHit(enemy) {
        if (enemy instanceof PufferFish) {
            enemy.throw();
        } else if (enemy instanceof SuperJellyFish) {
            this.character.electricHit();
            this.statusBar.setPercentage(this.character.energy);
        }
        enemy.slapHit();
        this.hit_sound.play();
    }

    checkCoinCollisions() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.character.addCoin();
                this.coinBar.setCoins(this.character.coins);
                this.collectingCoin_sound.play();
                this.level.coins.splice(index, 1);
            }
        });
    }

    checkAmmoCollisions() {
        this.level.ammo.forEach((ammo, index) => {
            if (this.character.isColliding(ammo)) {
                this.collectAmmo(ammo, index);
            }
        });
    }

    checkEndbossPosition() {
        for (let enemy of this.level.enemies) {
            if (enemy instanceof Endboss) {
                if (enemy.x <= -500) {
                    this.stop();
                    this.showGameOver();
                }
            }
        }
    }

    checkEnbossSpawn() {
        for (let enemy of this.level.enemies) {
            if (enemy instanceof Endboss) {
                if (enemy.spawned) {
                    this.addToMap(this.endbossBar);
                    this.endbossBar.setBossPercentage(enemy.energy);
                } else {
                    return;
                }
            }
        }
    }

    collectAmmo(ammo, index) {
        this.character.addAmmo();
        this.ammoBar.setAmmo(this.character.ammo);
        this.collectingAmmo_sound.play();
        this.level.ammo.splice(index, 1);

        let AmmoItemIndex = AmmoItem.ammo.indexOf(ammo);
        AmmoItem.ammo.splice(AmmoItemIndex, 1);

        if (this.level.ammo.length <= 1) {
            this.spawnAmmoItems();
        }
    }

    spawnAmmoItems() {
        for (let index = this.level.ammo.length; index <= 5; index++) {
            this.level.ammo.push(new AmmoItem());
        }
    }

    removeFinslapObject(slap) {
        const index = this.finslapObject.indexOf(slap);
        if (index !== -1) {
            this.finslapObject.splice(index, 1);
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0);

        this.addFixedObjectsToMap();
        this.ctx.translate(this.camera_x, 0);
        this.addDynamicObjectsToMap();
        this.ctx.translate(-this.camera_x, 0);

        this.handleEndGameScreens();
        this.handleOptionsMenu();
        requestAnimationFrame(() => this.draw());
    }

    handleOptionsMenu() {
        if (this.isGamePaused) {
            this.addControllsMenu();
            return;
        } else {
            removeControllsMenu();
        }
    }

    addFixedObjectsToMap() {
        this.checkEnbossSpawn();
        this.addToMap(this.statusBar);
        this.addToMap(this.ammoBar);
        this.addToMap(this.coinBar);
    }

    addDynamicObjectsToMap() {
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.lights);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.ammo);
        this.addObjectsToMap(this.throwableObject);
        this.addObjectsToMap(this.finslapObject);
    }

    handleEndGameScreens() {
        if (this.showVictoryScreen) {
            this.drawVictoryScreen(this.victoryImage);
            addRetryButton2();
        } else if (this.showGameOverScreen) {
            this.drawScreen(this.gameOverImage);
            addRetryButton();
        }
    }

    togglePause() {
        this.isGamePaused = !this.isGamePaused;
        this.keyboard.PAUSE = this.isGamePaused;

        if (this.isGamePaused) {
            this.stop();
        } else {
            this.run();
        }
    }

    expectPause() {
        document.addEventListener('keydown', (event) => {
            if (event.code === 'Escape') {
                this.togglePause();
            }
        });
        document.getElementById('pause-btn').addEventListener('touchstart', () => {
            this.togglePause();
        });
    }

    drawVictoryScreen() {
        this.ctx.drawImage(this.victoryImage, 0, 0, this.canvas.width, this.canvas.height);
    }

    drawScreen(image) {
        let scaleFactor = 0.3;
        let newWidth = image.width * scaleFactor;
        let newHeight = image.height * scaleFactor;
        let x = (this.canvas.width - newWidth) / 2;
        let y = (this.canvas.height - newHeight) / 2.5;

        this.ctx.drawImage(image, x, y, newWidth, newHeight);
    }

    toggleSound() {
        this.isSoundMuted = !this.isSoundMuted;
        this.updateEnemySound();
        this.updateCharacterSounds();
        this.updateWorldSounds();
    }

    updateEnemySound() {
        for (let enemy of this.level.enemies) {
            if (enemy instanceof Endboss) {
                enemy.isSoundMuted = this.isSoundMuted;
            }
        }
    }

    updateWorldSounds() {
        let sounds = [
            this.collectingCoin_sound,
            this.collectingAmmo_sound,
            this.hit_sound,
            this.winningSound,
            this.loosingSound,
        ];
        sounds.forEach(sound => {
            sound.muted = this.isSoundMuted;
        });
    }

    updateCharacterSounds() {
        let sounds = [
            this.character.dying_sound,
            this.character.electric_hurt_sound,
            this.character.hurt_sound,
            this.character.melee_sound,
            this.character.shooting_sound,
            this.character.walking_sound
        ];
        sounds.forEach(sound => {
            sound.muted = this.isSoundMuted;
        });
    }

    addObjectsToMap(objects) {
        objects.forEach((o) => this.addToMap(o));
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

    addControllsMenu() {
        document.getElementById('controllsMenu').classList.remove('d-none');
        this.checkSoundSymbol();
    }

    checkSoundSymbol() {
        if (!this.isSoundMuted && this.isGamePaused) {
            document.getElementById('muteButton').classList.add('d-none');
            document.getElementById('unmuteButton').classList.remove('d-none');
        } else {
            document.getElementById('unmuteButton').classList.add('d-none');
            document.getElementById('muteButton').classList.remove('d-none');
        }
    }
}