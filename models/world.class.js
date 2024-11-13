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
    isGameOverShowing = false;
    endbossBar = new EndbossBar();
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
        this.draw();
        this.expectPause();
        this.endboss = new Endboss(this);
    }

    /**
    * Loads necessary images for the game scenes.
    */
    loadImages() {
        this.victoryImage.src = "img/6.Botones/Tittles/You win/Mesa de trabajo 1.png";
        this.gameOverImage.src = "img/6.Botones/Tittles/Game Over/Recurso 9.png";
    }

    /**
     * Sets the world reference in the character object.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Starts the game loop and initializes animations for game objects.
     */
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

    /**
     * Stops the game loop and halts all game object animations.
     */
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

    /**
     * Restarts the game after stopping it and resetting the world state.
     */
    restart() {
        this.stop();
        this.resetWorld();
        this.setWorld();
        this.loadSoundSetting();
        this.run();
    }

    /**
     * Resets the world state to prepare for a new game.
     */
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

    /**
     * Resets various world items to their initial states.
     */
    resetWorldItems() {
        this.level.resetEnemies();
        this.level.resetAmmo();
        this.level.resetLights();
        this.level.resetBackgroundObjects();
        this.level.resetCoins();
    }

    /**
     * Resets game status flags.
     */
    resetFlags() {
        this.isGameOverShowing = false;
        
        this.showVictoryScreen = false;
        this.showGameOverScreen = false;
        this.canCreateFinslap = true;
    }

    /**
     * Resets and initializes the interface objects for the game.
     */
    resetObjects() {
        this.statusBar = new StatusBar();
        this.endbossBar = new EndbossBar();
        this.ammoBar = new AmmoBar();
        this.coinBar = new CoinBar();
    }

    /**
    * Lädt die Soundeinstellung aus dem LocalStorage.
    */
    loadSoundSetting() {
        const mutedSetting = localStorage.getItem('isSoundMuted');
        console.log('Lade Sound-Einstellung:', mutedSetting);
        this.isSoundMuted = mutedSetting === 'true';
        this.updateWorldSounds();
        this.updateEnemySound();
        this.updateCharacterSounds();
    }

    /**
     * Checks if the attack button is pressed to potentially create a finslap.
     */
    checkThrowObjects() {
        if (this.keyboard.ATTACK && this.canCreateFinslap) {
            this.createFinslap();
        }
    }

    /**
     * Creates a finslap object and manages its lifecycle.
     */
    createFinslap() {
        let slap = new Finslap(this.character.x + 210, this.character.y + 130, this.character.otherDirection);
        this.finslapObject.push(slap);
        this.canCreateFinslap = false;

        setTimeout(() => this.removeFinslapObject(slap), 300);
        setTimeout(() => this.canCreateFinslap = true, 600);
    }

    /**
 * Checks for all types of collisions in the game.
 */
    checkCollisions() {
        this.checkCharacterEnemyCollisions();
        this.checkThrowableCollisions();
        this.checkCoinCollisions();
        this.checkAmmoCollisions();
    }

    /**
     * Checks for collisions between the character and enemies.
     */
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

    /**
     * Handles the event when the character collides with an enemy.
     * @param {Enemy} enemy - The enemy object that the character collided with.
     */
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

    /**
     * Handles the event when an enemy dies.
     * @param {Enemy} enemy - The enemy that has died.
     */
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

    /**
     * Displays the game over screen if the character dies.
     */
    showGameOver() {
        if (!this.isGameOverShowing) {
            this.isGameOverShowing = true;
            setTimeout(() => {
                this.showGameOverScreen = true;
                this.loosingSound.play();
                this.stop();
            }, 1500);
        }
    }

    /**
     * Checks for collisions between throwable objects and enemies.
     */
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

    /**
     * Handles what happens when a finslap hits an enemy.
     * @param {Enemy} enemy - The enemy that has been hit by a finslap.
     */
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

    /**
     * Checks for collisions between the character and coins.
     */
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

    /**
     * Checks for collisions between the character and ammo items.
     */
    checkAmmoCollisions() {
        this.level.ammo.forEach((ammo, index) => {
            if (this.character.isColliding(ammo)) {
                this.collectAmmo(ammo, index);
            }
        });
    }

    /**
     * Checks the position of the end boss to determine if the game should end.
     */
    checkEndbossPosition() {
        for (let enemy of this.level.enemies) {
            if (enemy instanceof Endboss && enemy.x <= -500) {
                this.stop();
                this.showGameOver();
            }
        }
    }

    /**
     * Adds the end boss health bar to the map if the end boss has spawned.
     */
    checkEnbossSpawn() {
        for (let enemy of this.level.enemies) {
            if (enemy instanceof Endboss) {
                if (enemy.spawned) {
                    this.addToMap(this.endbossBar);
                    this.endbossBar.setPercentage(enemy.energy);
                } else {
                    return;
                }
            }
        }
    }

    /**
     * Collects ammo when the character collides with an ammo item.
     * @param {Ammo} ammo - The ammo item collected by the character.
     * @param {number} index - The index of the ammo item in the level's ammo array.
     */
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

    /**
 * Spawns additional ammo items in the level until there are at least 5.
 */
    spawnAmmoItems() {
        for (let index = this.level.ammo.length; index <= 5; index++) {
            this.level.ammo.push(new AmmoItem());
        }
    }

    /**
     * Removes a specified finslap object from the list of throwable objects.
     * @param {Finslap} slap - The finslap object to be removed.
     */
    removeFinslapObject(slap) {
        const index = this.finslapObject.indexOf(slap);
        if (index !== -1) {
            this.finslapObject.splice(index, 1);
        }
    }

    /**
     * Main draw function that handles rendering the game scene.
     */
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

    /**
     * Handles the display of the options menu if the game is paused.
     */
    handleOptionsMenu() {
        if (this.isGamePaused) {
            this.addControllsMenu();
            return;
        } else {
            removeControllsMenu();
        }
    }

    /**
     * Adds fixed objects such as status bars to the game map.
     */
    addFixedObjectsToMap() {
        this.checkEnbossSpawn();
        this.addToMap(this.statusBar);
        this.addToMap(this.ammoBar);
        this.addToMap(this.coinBar);
    }

    /**
     * Adds dynamic objects (character, enemies, etc.) to the game map.
     */
    addDynamicObjectsToMap() {
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.lights);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.ammo);
        this.addObjectsToMap(this.throwableObject);
        this.addObjectsToMap(this.finslapObject);
    }

    /**
     * Handles and displays the end game screens based on the game state.
     */
    handleEndGameScreens() {
        if (this.showVictoryScreen) {
            this.drawVictoryScreen(this.victoryImage);
            addRetryButton2();
        } else if (this.showGameOverScreen) {
            this.drawScreen(this.gameOverImage);
            addRetryButton();
        }
    }

    /**
     * Toggles the pause state of the game.
     */
    togglePause() {
        this.isGamePaused = !this.isGamePaused;
        this.keyboard.PAUSE = this.isGamePaused;

        if (this.isGamePaused) {
            this.stop();
        } else {
            this.run();
        }
    }

    /**
     * Sets up event listeners for pausing the game with keyboard or touch controls.
     */
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

    /**
     * Draws the victory screen using the victory image.
     */
    drawVictoryScreen() {
        this.ctx.drawImage(this.victoryImage, 0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Draws a specified screen image centered on the canvas.
     * @param {HTMLImageElement} image - The image to be drawn on the screen.
     */
    drawScreen(image) {
        let scaleFactor = 0.3;
        let newWidth = image.width * scaleFactor;
        let newHeight = image.height * scaleFactor;
        let x = (this.canvas.width - newWidth) / 2;
        let y = (this.canvas.height - newHeight) / 2.5;

        this.ctx.drawImage(image, x, y, newWidth, newHeight);
    }

    /**
     * Toggles the sound on and off for the entire game.
     */
    toggleSound() {
        this.isSoundMuted = !this.isSoundMuted;
        this.updateEnemySound();
        this.updateCharacterSounds();
        this.updateWorldSounds();
        this.saveSoundSetting();
    }

    /**
    * Speichert die aktuelle Soundeinstellung im LocalStorage.
    */
    saveSoundSetting() {
        localStorage.setItem('isSoundMuted', this.isSoundMuted);
    }

    /**
     * Updates the sound settings for enemy objects.
     */
    updateEnemySound() {
        for (let enemy of this.level.enemies) {
            if (enemy instanceof Endboss) {
                enemy.isSoundMuted = this.isSoundMuted;
            }
        }
    }

    /**
     * Updates sound settings for various in-game sounds.
     */
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

    /**
 * Updates sound settings for the character's sounds based on mute status.
 */
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

    /**
     * Adds multiple objects to the map by iterating through the array.
     * @param {Array} objects - The array of objects to add to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach((o) => this.addToMap(o));
    }

    /**
     * Adds a single object to the map, handling its drawing and hitbox display.
     * @param {GameObject} mo - The object to be added to the map.
     */
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

    /**
     * Flips the object's image horizontally for rendering in the opposite direction.
     * @param {GameObject} mo - The object whose image will be flipped.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the object's image orientation after flipping.
     * @param {GameObject} mo - The object to restore its image orientation.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Displays the controls menu in the game.
     */
    addControllsMenu() {
        document.getElementById('controllsMenu').classList.remove('d-none');
        this.checkSoundSymbol();
    }

    /**
     * Updates the visibility of the sound symbol based on the game's sound settings.
     */
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