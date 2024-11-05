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

    collectingCoin_sound = new Audio('audio/coin.mp3');
    collectingAmmo_sound = new Audio('audio/potion.mp3');
    hit_sound = new Audio('audio/enemy-hit.mp3');
    winningSound = new Audio('audio/winning.mp3');
    loosingSound = new Audio('audio/loosing.mp3');

    constructor(canvas, keyboard) {
        this.victoryImage.src = "img/6.Botones/Tittles/You win/Mesa de trabajo 1.png";
        this.gameOverImage.src = "img/6.Botones/Tittles/Game Over/Recurso 9.png";
        this.tryAgainImage.src = "img/6.Botones/Try again/Recurso 15.png";
        this.startMenuImage.src = "img/welcome-screen.png";
        this.startButton.src = "img/start.png";
        this.startButton.src = "img/start.png";
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        canvas.addEventListener('click', (event) => this.handleCanvasClick(event));
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
        this.stop();
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

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
        if (this.showVictoryScreen) {
            this.drawVictoryScreen(this.victoryImage);
            this.drawTryAgainButton(0.3, -100); 
        } else if (this.showGameOverScreen) {
            this.drawScreen(this.gameOverImage);
            this.drawTryAgainButton(0.3, -200); 
        }
        if (!this.isGameActive) {
            this.drawStartButton()
            this.drawStartMenu();
            return;
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
            let scaleFactor = 1; // Setze den Skalierungsfaktor für den Button
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
    
        // Überprüfen, ob der Klick auf den Startbutton war
        if (!this.isGameActive) {
            if (this.isInsideStartButton(x, y)) {
                this.isGameActive = true;
                this.restart(); 
            }
        }
    
        // Überprüfen, ob der Klick innerhalb des Try Again Buttons war
        if (this.showVictoryScreen) {
            if (this.isInsideTryAgainButton(x, y, 0.3, -100)) {
                this.restart();
            }
        } else if (this.showGameOverScreen) {
            if (this.isInsideTryAgainButton(x, y, 0.3, -200)) {
                this.restart();
            }
        }
    }

    isInsideStartButton(x, y) {
    let scaleFactor = 1; // Verwende denselben Skalierungsfaktor wie in drawStartButton
    let buttonWidth = this.startButton.width * scaleFactor;
    let buttonHeight = this.startButton.height * scaleFactor;
    let buttonX = (this.canvas.width - buttonWidth) / 2;
    let buttonY = (this.canvas.height - buttonHeight) / 2.3; // Entsprechend der Position in drawStartButton

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