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
    startMenuImage = new Image();
    startButton = new Image();
    optionMenu = new Image();
    soundUmuteImg = new Image();
    soundMuteImg = new Image();
    showVictoryScreen = false;
    showGameOverScreen = false;
    statusBar = new StatusBar();
    ammoBar = new AmmoBar();
    coinBar = new CoinBar();
    throwableObject = [];
    finslapObject = [];
    canCreateFinslap = true;
    intervalIDs = [];
    isGameActive = false;
    isGamePaused = false;

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
        this.draw();
        this.expectPause();
        canvas.addEventListener('click', (event) => this.handleCanvasClick(event));
        this.endboss = new Endboss(this);
    }

    loadImages() {
        this.victoryImage.src = "img/6.Botones/Tittles/You win/Mesa de trabajo 1.png";
        this.gameOverImage.src = "img/6.Botones/Tittles/Game Over/Recurso 9.png";
        this.tryAgainImage.src = "img/6.Botones/Try again/Recurso 15.png";
        this.startMenuImage.src = "img/welcome-screen.png";
        this.startButton.src = "img/start.png";
        this.optionMenu.src = "img/controlls.png";
        this.soundUmuteImg.src = "img/unmute.png";
        this.soundMuteImg.src = "img/mute.png";
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        this.intervalIDs.push(setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200));
        this.level.enemies.forEach(enemy => enemy.startAnimation());
        this.level.lights.forEach(light => light.startAnimation());
        this.character.startAnimation();
    }

    stop() {
        this.level.enemies.forEach(enemy => enemy.stopAnimation());
        this.level.lights.forEach(light => light.stopAnimation());
        this.character.stopAnimation();
        this.intervalIDs.forEach(id => clearInterval(id));
    }

    restart() {
        this.stop();
        this.resetWorld();
        this.setWorld();
        this.run();
    }

    resetWorld() {
        this.isSoundMuted = false;
        this.character = new Character();
        this.level = level1;
        this.camera_x = 0;
        this.showVictoryScreen = false;
        this.showGameOverScreen = false;
        this.statusBar = new StatusBar();
        this.ammoBar = new AmmoBar();
        this.coinBar = new CoinBar();
        this.throwableObject = [];
        this.finslapObject = [];
        this.canCreateFinslap = true;
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
            if (this.character.isColliding(enemy)) {
                this.handleCharacterHitByEnemy(enemy);
            }
            if (enemy.isDead()) {
                this.handleEnemyDeath(enemy);
            }
        });
        if (this.character.isDead()) {
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
            this.drawPauseMenu();
            this.drawSoundIcon();
            return;
        }
    }

    drawSoundIcon() {
        const iconX = 520; 
        const iconY = 43;
        const iconSize = 60;

        if (this.isSoundMuted) {
            this.ctx.drawImage(this.soundMuteImg, iconX, iconY, iconSize, iconSize);
        } else {
            this.ctx.drawImage(this.soundUmuteImg, iconX, iconY, iconSize, iconSize);
        }
    }

    addFixedObjectsToMap() {
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
            this.drawTryAgainButton(0.3, -100);
        } else if (this.showGameOverScreen) {
            this.drawScreen(this.gameOverImage);
            this.drawTryAgainButton(0.3, -200);
        }
        if (!this.isGameActive) {
            this.drawStartMenu();
            this.drawStartButton();
        }
    }

    togglePause() {
        this.isGamePaused = !this.isGamePaused; // Umkehren des Pause-Status
        this.keyboard.PAUSE = this.isGamePaused; // Aktualisieren des PAUSE-Keys

        if (this.isGamePaused) {
            this.stop(); // Stoppe das Spiel, wenn es pausiert wird
        } else {
            this.run(); // Starte das Spiel neu, wenn es fortgesetzt wird
        }
    }

    expectPause() {
        document.addEventListener('keydown', (event) => {
            if (event.code === 'Escape') {
                this.togglePause();
            }
        });
    }

    drawPauseMenu() {
        if (this.optionMenu.complete) {
            let scaleFactor = 1;
            let newWidth = this.optionMenu.width * scaleFactor;
            let newHeight = this.optionMenu.height * scaleFactor;
            let x = (this.canvas.width - newWidth) / 2;
            let y = (this.canvas.height - newHeight) / 2;
            this.ctx.drawImage(this.optionMenu, x, y, newWidth, newHeight);
        }
    }

    drawStartMenu() {
        if (this.startMenuImage.complete) {
            let scaleFactor = 1;
            let newWidth = this.startMenuImage.width * scaleFactor;
            let newHeight = this.startMenuImage.height * scaleFactor;
            let x = (this.canvas.width - newWidth) / 2;
            let y = (this.canvas.height - newHeight) / 2;
            this.ctx.drawImage(this.startMenuImage, x, y, newWidth, newHeight);
            this.drawStartButton();
        }
    }

    drawStartButton() {
        if (this.startButton.complete) {
            let scaleFactor = 1;
            let newWidth = this.startButton.width * scaleFactor;
            let newHeight = this.startButton.height * scaleFactor;
            let x = (this.canvas.width - newWidth) / 2;
            let y = (this.canvas.height - newHeight) / 2.3;

            this.ctx.drawImage(this.startButton, x, y, newWidth, newHeight);
        }
    }

    drawVictoryScreen() {
        this.ctx.drawImage(this.victoryImage, 0, 0, this.canvas.width, this.canvas.height);
    }

    drawScreen(image) {
        let scaleFactor = 0.3;
        let newWidth = image.width * scaleFactor;
        let newHeight = image.height * scaleFactor;
        let x = (this.canvas.width - newWidth) / 2;
        let y = (this.canvas.height - newHeight) / 3;

        this.ctx.drawImage(image, x, y, newWidth, newHeight);
    }

    drawTryAgainButton(scaleFactor, offsetY) {
        let tryAgainWidth = this.tryAgainImage.width * scaleFactor;
        let tryAgainHeight = this.tryAgainImage.height * scaleFactor;
        let tryAgainX = (this.canvas.width - tryAgainWidth) / 2;
        let tryAgainY = this.canvas.height - tryAgainHeight + offsetY;

        this.ctx.drawImage(this.tryAgainImage, tryAgainX, tryAgainY, tryAgainWidth, tryAgainHeight);
    }

    handleCanvasClick(event) {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        if (!this.isGameActive) {
            this.handleStartButtonClick(x, y);
        } else {
            this.handleTryAgainButtonClick(x, y);
            this.handleSoundIconClick(x, y); 
        }
    }

    handleSoundIconClick(x, y) {
        const iconX = 520; 
        const iconY = 43; 
        const iconSize = 60; 

        if (x >= iconX && x <= iconX + iconSize && y >= iconY && y <= iconY + iconSize) {
            this.toggleSound(); 
        }
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

    handleStartButtonClick(x, y) {
        if (this.isInsideStartButton(x, y)) {
            this.isGameActive = true;
            this.restart();
        }
    }

    handleTryAgainButtonClick(x, y) {
        if (this.showVictoryScreen && this.isInsideTryAgainButton(x, y, 0.3, -100)) {
            this.restart();
        } else if (this.showGameOverScreen && this.isInsideTryAgainButton(x, y, 0.3, -200)) {
            this.restart();
        }
    }

    isInsideStartButton(x, y) {
        let scaleFactor = 1;
        let buttonWidth = this.startButton.width * scaleFactor;
        let buttonHeight = this.startButton.height * scaleFactor;
        let buttonX = (this.canvas.width - buttonWidth) / 2;
        let buttonY = (this.canvas.height - buttonHeight) / 2.3;

        return x >= buttonX && x <= buttonX + buttonWidth &&
            y >= buttonY && y <= buttonY + buttonHeight;
    }

    isInsideTryAgainButton(x, y, scaleFactor, offsetY) {
        let tryAgainWidth = this.tryAgainImage.width * scaleFactor;
        let tryAgainHeight = this.tryAgainImage.height * scaleFactor;
        let tryAgainX = (this.canvas.width - tryAgainWidth) / 2;
        let tryAgainY = this.canvas.height - tryAgainHeight + offsetY;

        return x >= tryAgainX && x <= tryAgainX + tryAgainWidth &&
            y >= tryAgainY && y <= tryAgainY + tryAgainHeight;
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
}