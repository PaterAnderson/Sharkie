class Character extends MovableObject {

    IMAGES_IDLE = [
        'img/1.Sharkie/1.IDLE/1.png',
        'img/1.Sharkie/1.IDLE/2.png',
        'img/1.Sharkie/1.IDLE/3.png',
        'img/1.Sharkie/1.IDLE/4.png',
        'img/1.Sharkie/1.IDLE/5.png',
        'img/1.Sharkie/1.IDLE/6.png',
        'img/1.Sharkie/1.IDLE/7.png',
        'img/1.Sharkie/1.IDLE/8.png',
        'img/1.Sharkie/1.IDLE/9.png',
        'img/1.Sharkie/1.IDLE/10.png',
        'img/1.Sharkie/1.IDLE/11.png',
        'img/1.Sharkie/1.IDLE/12.png',
        'img/1.Sharkie/1.IDLE/13.png',
        'img/1.Sharkie/1.IDLE/14.png',
        'img/1.Sharkie/1.IDLE/15.png',
        'img/1.Sharkie/1.IDLE/16.png',
        'img/1.Sharkie/1.IDLE/17.png',
        'img/1.Sharkie/1.IDLE/18.png'
    ];
    IMAGES_LONG_IDLE = [
        'img/1.Sharkie/2.Long_IDLE/i1.png',
        'img/1.Sharkie/2.Long_IDLE/I2.png',
        'img/1.Sharkie/2.Long_IDLE/I3.png',
        'img/1.Sharkie/2.Long_IDLE/I4.png',
        'img/1.Sharkie/2.Long_IDLE/I5.png',
        'img/1.Sharkie/2.Long_IDLE/I6.png',
        'img/1.Sharkie/2.Long_IDLE/I7.png',
        'img/1.Sharkie/2.Long_IDLE/I8.png',
        'img/1.Sharkie/2.Long_IDLE/I9.png',
        'img/1.Sharkie/2.Long_IDLE/I10.png',
        'img/1.Sharkie/2.Long_IDLE/I11.png',
        'img/1.Sharkie/2.Long_IDLE/I12.png',
        'img/1.Sharkie/2.Long_IDLE/I13.png',
        'img/1.Sharkie/2.Long_IDLE/I14.png'
    ];
    IMAGES_SWIM = [
        'img/1.Sharkie/3.Swim/1.png',
        'img/1.Sharkie/3.Swim/2.png',
        'img/1.Sharkie/3.Swim/3.png',
        'img/1.Sharkie/3.Swim/4.png',
        'img/1.Sharkie/3.Swim/5.png',
        'img/1.Sharkie/3.Swim/6.png'
    ];

    IMAGES_DEAD = [
        'img/1.Sharkie/6.dead/1.Poisoned/1.png',
        'img/1.Sharkie/6.dead/1.Poisoned/2.png',
        'img/1.Sharkie/6.dead/1.Poisoned/3.png',
        'img/1.Sharkie/6.dead/1.Poisoned/4.png',
        'img/1.Sharkie/6.dead/1.Poisoned/5.png',
        'img/1.Sharkie/6.dead/1.Poisoned/6.png',
        'img/1.Sharkie/6.dead/1.Poisoned/7.png',
        'img/1.Sharkie/6.dead/1.Poisoned/8.png',
        'img/1.Sharkie/6.dead/1.Poisoned/9.png',
        'img/1.Sharkie/6.dead/1.Poisoned/10.png',
        'img/1.Sharkie/6.dead/1.Poisoned/11.png',
        'img/1.Sharkie/6.dead/1.Poisoned/12.png'
    ];

    IMAGES_HURT = [
        'img/1.Sharkie/5.Hurt/1.Poisoned/1.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/2.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/3.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/4.png',
    ];

    IMAGES_ELECTRIC_HURT = [
        'img/1.Sharkie/5.Hurt/2.Electric shock/1.png',
        'img/1.Sharkie/5.Hurt/2.Electric shock/2.png',
        'img/1.Sharkie/5.Hurt/2.Electric shock/3.png',
        'img/1.Sharkie/5.Hurt/2.Electric shock/4.png',
        'img/1.Sharkie/5.Hurt/2.Electric shock/5.png'

    ];

    IMAGES_FINSLAP = [
        'img/1.Sharkie/4.Attack/Fin slap/1.png',
        'img/1.Sharkie/4.Attack/Fin slap/2.png',
        'img/1.Sharkie/4.Attack/Fin slap/3.png',
        'img/1.Sharkie/4.Attack/Fin slap/4.png',
        'img/1.Sharkie/4.Attack/Fin slap/5.png',
        'img/1.Sharkie/4.Attack/Fin slap/6.png',
        'img/1.Sharkie/4.Attack/Fin slap/7.png',
        'img/1.Sharkie/4.Attack/Fin slap/8.png',
    ];
    IMAGES_SHOOT = [
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/1.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/2.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/3.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/4.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/5.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/6.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/7.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/8.png',
    ];

    speed = 2;
    width = 250;
    height = 250;
    y = 90;
    x = 30;
    energy = 100;
    currentAnimation = 'idle';
    world;
    walking_sound = new Audio('audio/swimming.mp3');
    shooting_sound = new Audio('audio/shoot.mp3');
    melee_sound = new Audio('audio/melee.mp3');
    hurt_sound = new Audio('audio/sharkie-hurt.mp3');
    electric_hurt_sound = new Audio('audio/electric-damage.mp3');
    dying_sound = new Audio('audio/dying.mp3');
    lastKeyPressTime = Date.now();
    isLongIdle = false;
    currentLongIdleImageIndex = 0;
    isAlive = true;
    isShooting = false;
    isElectricHurt = false;
    isFinSlapAnimating = false;
    attackCooldown = false;
    canCreateBubble = true;
    attackCooldownTime = 600;
    shootCooldown = false;
    shootCooldownTime = 600;
    coins = 0;
    ammo = 0;

    constructor() {
        super().loadImage('img/1.Sharkie/1.IDLE/1.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ELECTRIC_HURT);
        this.loadImages(this.IMAGES_FINSLAP);
        this.loadImages(this.IMAGES_SHOOT);
        this.keyboard = keyboard;
    }

    /**
     * Starts the main animation loop, including movement handling.
     */
    animate() {
        this.startMovement();
        this.intervalIDs.push(setInterval(() => {
            this.updateAnimation();
        }, 150));
    }

    /**
     * Triggers the finishing slap animation.
     */
    animateAttack() {
        this.playFinSlapAnimation();
    }

    /**
     * Starts the movement loop that handles character movements.
     */
    startMovement() {
        this.intervalIDs.push(setInterval(() => {
            this.handleMovement();
        }, 1000 / 60));
    }

    /**
     * Updates the animation based on the character's current state and input.
     */
    updateAnimation() {
        this.checkKeyboardInput();
        this.updateCurrentAnimation();
        this.handleMovement();
        if (this.isDead()) {
            this.handleDeath();
        } else if (this.isElectricHurt) {
            this.playElectricHurt();
        } else if (this.isHurt()) {
            this.playHurt();
        } else if (this.isFinSlapAnimating) {
            this.playFinSlapAnimation();
        } else if (this.isShooting) {
            this.playShootingAnimation();
        } else {
            this.playCurrentAnimation();
        }
    }

    /**
     * Handles character death, plays the death sound, and triggers the dead animation.
     */
    handleDeath() {
        this.isAlive = false;
        this.dying_sound.play();
        this.playDeadAnimation(this.IMAGES_DEAD);
    }

    /**
     * Plays the electric hurt animation and sound.
     */
    playElectricHurt() {
        this.playElectricHurtAnimation();
        this.electric_hurt_sound.play();
    }

    /**
     * Plays the hurt animation and sound.
     */
    playHurt() {
        this.playAnimation(this.IMAGES_HURT);
        this.hurt_sound.play();
    }

    /**
     * Plays the electric hurt animation frames.
     */
    playElectricHurtAnimation() {
        this.playAnimation(this.IMAGES_ELECTRIC_HURT);
    }

    /**
     * Plays the current animation based on the character's state.
     */
    playCurrentAnimation() {
        switch (this.currentAnimation) {
            case 'swim':
                this.playAnimation(this.IMAGES_SWIM);
                break;
            case 'long_idle':
                this.updateLongIdleAnimation();
                break;
            case 'idle':
            default:
                this.playAnimation(this.IMAGES_IDLE);
                break;
        }
    }

    /**
     * Checks keyboard input for movement or attack actions.
     */
    checkKeyboardInput() {
        if (this.isMovementKeyPressed()) {
            this.handleMovementKeys();
        } else if (this.isAttackPressed()) {
            this.startFinSlapAttack();
        } else if (this.isShootingPressed()) {
            this.startShooting();
        } else {
            this.endSwimmingAnimation();
        }
    }

    /**
     * Checks if any movement keys are currently pressed.
     * @returns {boolean} - True if any movement key is pressed, otherwise false.
     */
    isMovementKeyPressed() {
        return this.keyboard.UP || this.keyboard.DOWN || this.keyboard.LEFT || this.keyboard.RIGHT;
    }

    /**
     * Handles logic when movement keys are pressed.
     */
    handleMovementKeys() {
        this.currentAnimation = 'swim';
        this.lastKeyPressTime = Date.now();
        this.isLongIdle = false;
        this.currentLongIdleImageIndex = 0;
        this.isFinSlapAnimating = false;

        if (!this.isAnimatingSwim) {
            this.isAnimatingSwim = true;
        }
    }

    /**
     * Checks if the attack key is pressed.
     * @returns {boolean} - True if the attack key is pressed and attack can occur, otherwise false.
     */
    isAttackPressed() {
        return this.keyboard.ATTACK && !this.attackCooldown && this.isAlive;
    }

    /**
     * Checks if the shooting key is pressed.
     * @returns {boolean} - True if the shoot key is pressed and shooting is allowed, otherwise false.
     */
    isShootingPressed() {
        return this.keyboard.SPACE && this.canShoot();
    }

    /**
     * Ends the swimming animation state.
     */
    endSwimmingAnimation() {
        this.isAnimatingSwim = false;
    }

    /**
     * Checks if the character can shoot based on cooldown and ammo availability.
     * @returns {boolean} - True if the character can shoot, otherwise false.
     */
    canShoot() {
        return !this.shootCooldown && this.ammo > 0 && this.isAlive;
    }

    /**
     * Initiates the shooting action.
     */
    startShooting() {
        this.isShooting = true;
        this.currentImage = 0;
        this.shootCooldown = true;

        this.playShootingAnimation();
        setTimeout(() => {
            this.shootCooldown = false;
            this.shooting_sound.pause();
            this.shooting_sound.currentTime = 0;
        }, this.shootCooldownTime);
    }

    /**
     * Initiates the finishing slap attack.
     */
    startFinSlapAttack() {
        this.isFinSlapAnimating = true;
        this.currentImage = 0;
        this.attackCooldown = true;
        this.animateAttack();
        this.melee_sound.play();

        setTimeout(() => {
            this.attackCooldown = false;
            this.melee_sound.pause();
            this.melee_sound.currentTime = 0;
        }, this.attackCooldownTime);
    }

    /**
     * Plays the shooting animation and manages ammo usage.
     */
    playShootingAnimation() {
        if (this.isShooting) {
            let isFinished = this.playAnimation(this.IMAGES_SHOOT);
            if (isFinished && this.useAmmo()) {
                this.shooting_sound.play();
                this.world.ammoBar.setAmmo(this.ammo);
                let bubble = new ThrowableObject(this.x + 180, this.y + 100, this.otherDirection);
                this.world.throwableObject.push(bubble);
                this.canCreateBubble = false;
                this.isShooting = false;
            } else {
                setTimeout(() => this.playShootingAnimation(), 80);
            }
            setTimeout(() => {
                this.canCreateBubble = true;
            }, 600);
        }
    }

    /**
     * Updates the current animation based on user input and idle time.
     */
    updateCurrentAnimation() {
        const currentTime = Date.now();
        const elapsed = currentTime - this.lastKeyPressTime;
        this.isLongIdle = elapsed > 15000;

        this.currentAnimation = this.isAnimatingSwim ? 'swim' : (this.isLongIdle ? 'long_idle' : 'idle');
    }

    /**
     * Handles all movement for the character, including horizontal and vertical directions.
     */
    handleMovement() {
        let isMoving = false;
        isMoving |= this.handleHorizontalMovement();
        isMoving |= this.handleVerticalMovement();
        this.updateWalkSound(isMoving);
        this.updateCameraPosition();
    }

    /**
     * Handles horizontal movement to the left or right based on keyboard input.
     * @returns {boolean} - True if the character moved horizontally, otherwise false.
     */
    handleHorizontalMovement() {
        if (this.keyboard.RIGHT && this.x < this.world.level.level_end_x && this.isAlive) {
            this.x += this.speed;
            this.otherDirection = false;
            return true;
        }
        if (this.keyboard.LEFT && this.x > 0 && this.isAlive) {
            this.x -= this.speed;
            this.otherDirection = true;
            return true;
        }
        return false;
    }

    /**
     * Handles vertical movement up or down based on keyboard input.
     * @returns {boolean} - True if the character moved vertically, otherwise false.
     */
    handleVerticalMovement() {
        if (this.keyboard.UP && this.y > -120 && this.isAlive) {
            this.y -= this.speed;
            return true;
        }
        if (this.keyboard.DOWN && this.y < 290 && this.isAlive) {
            this.y += this.speed;
            return true;
        }
        return false;
    }

    /**
     * Updates the walking sound based on whether the character is moving.
     * @param {boolean} isMoving - Indicates if the character is currently moving.
     */
    updateWalkSound(isMoving) {
        if (isMoving) {
            this.playWalkSound();
        } else {
            this.stopWalkSound();
        }
    }

    /**
     * Updates the camera's position to follow the character.
     */
    updateCameraPosition() {
        this.world.camera_x = 0 - this.x;
    }

    /**
     * Plays the finishing slap animation frames if the character is currently animating.
     */
    playFinSlapAnimation() {
        if (this.isFinSlapAnimating) {
            if (this.currentImage < this.IMAGES_FINSLAP.length) {
                let path = this.IMAGES_FINSLAP[this.currentImage];
                this.img = this.imageCache[path];
                this.currentImage++;

                setTimeout(() => this.playFinSlapAnimation(), 80);
            } else {
                this.isFinSlapAnimating = false;
            }
        }
    }

    /**
     * Plays the walking sound if it is not already playing.
     */
    playWalkSound() {
        if (this.walking_sound.paused) {
            this.walking_sound.currentTime = 0;
            this.walking_sound.play();
        }
    }

    /**
     * Stops the walking sound if it is currently playing.
     */
    stopWalkSound() {
        if (!this.walking_sound.paused) {
            this.walking_sound.pause();
        }
    }

    /**
     * Updates the long idle animation based on the current idle state of the character.
     */
    updateLongIdleAnimation() {
        if (this.currentLongIdleImageIndex < 10) {
            this.handleInitialImages();
        } else {
            this.handleSubsequentImages();
        }
    }

    /**
     * Handles the initial frame images for long idle animation.
     */
    handleInitialImages() {
        let i = this.currentLongIdleImageIndex % this.IMAGES_LONG_IDLE.length;
        let path = this.IMAGES_LONG_IDLE[i];
        this.img = this.imageCache[path];
        this.currentLongIdleImageIndex++;
    }

    /**
     * Handles the subsequent frame images for long idle animation.
     */
    handleSubsequentImages() {
        this.currentLongIdleImageIndex = this.calculateCurrentIndexForSubsequentImages();
        let path = this.IMAGES_LONG_IDLE[this.currentLongIdleImageIndex];
        this.img = this.imageCache[path];
        this.currentLongIdleImageIndex++;

        if (this.currentLongIdleImageIndex >= 14) {
            this.currentLongIdleImageIndex = 10;
        }
    }

    /**
     * Calculates the current index for subsequent images in the long idle animation.
     * @returns {number} - The calculated index for images.
     */
    calculateCurrentIndexForSubsequentImages() {
        return 10 + (this.currentLongIdleImageIndex - 10) % 4;
    }

    /**
     * Plays the dead animation frames using the provided images.
     * @param {Array} images - The array of image paths for the dead animation.
     */
    playDeadAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        if (i < images.length - 1) {
            this.currentImage++;
        }
    }

    /**
     * Increases the ammo count, capping it between 0 and 10.
     */
    addAmmo() {
        this.ammo += 1;
        if (this.ammo < 0) {
            this.ammo = 0;
        } else if (this.ammo > 10) {
            this.ammo = 10;
        }
    }

    /**
     * Uses 1 ammo if available.
     * @returns {boolean} - True if ammo was successfully used, otherwise false.
     */
    useAmmo() {
        if (this.ammo > 0) {
            this.ammo -= 1;
            return true;
        }
        return false;
    }

    /**
     * Returns the hitbox object for the character.
     * @returns {Object} - The hitbox with properties x, y, width, and height.
     */
    getHitbox() {
        return {
            x: this.x + 50,
            y: this.y + 120,
            width: this.width - 100,
            height: this.height - 180
        };
    }

    /**
     * Increases the coin count, capping it between 0 and 10.
     */
    addCoin() {
        this.coins += 1;
        if (this.coins < 0) {
            this.coins = 0;
        } else if (this.coins > 10) {
            this.coins = 10;
        }
    }
}

