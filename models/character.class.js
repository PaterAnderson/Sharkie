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

    speed = 3; //2
    width = 250;
    height = 250;
    y = 90;
    x = 30;
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
    ammo = 10;

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

    animate() {
        this.startMovement();
        this.intervalIDs.push(setInterval(() => {
            this.updateAnimation();
        }, 150));
    }

    animateAttack() {
        this.playFinSlapAnimation(); // Direkt die Animation starten
    }

    startMovement() {
        this.intervalIDs.push(setInterval(() => {
            this.handleMovement();
        }, 1000 / 60));
    }

    updateAnimation() {
        this.checkKeyboardInput();
        this.updateCurrentAnimation();
        this.handleMovement();

        if (this.isDead()) {
            this.isAlive = false;
            this.dying_sound.play();
            this.playDeadAnimation(this.IMAGES_DEAD);
            setTimeout(() => {
                this.world.stop();
            }, 1500);
            return;
        }

        if (this.isElectricHurt) {
            this.playElectricHurtAnimation();
            this.electric_hurt_sound.play();
            return;
        }

        if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            this.hurt_sound.play();
            return;
        }

        if (this.isFinSlapAnimating) {
            this.playFinSlapAnimation();
            return;
        }

        if (this.isShooting) {
            this.playShootingAnimation();
            return;
        }

        this.playCurrentAnimation();
    }

    playElectricHurtAnimation() {
        this.playAnimation(this.IMAGES_ELECTRIC_HURT);
    }

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

    checkKeyboardInput() {
        if (this.keyboard.UP || this.keyboard.DOWN || this.keyboard.LEFT || this.keyboard.RIGHT) {
            this.currentAnimation = 'swim';
            this.lastKeyPressTime = Date.now();
            this.isLongIdle = false;
            this.currentLongIdleImageIndex = 0;
            this.isFinSlapAnimating = false; 

            if (!this.isAnimatingSwim) {
                this.isAnimatingSwim = true;
            }
        } else if (this.keyboard.ATTACK && !this.attackCooldown && this.isAlive) {
            this.startFinSlapAttack();
        } else if (this.keyboard.SPACE && this.canShoot()) {
            this.startShooting();
        } else {
            this.isAnimatingSwim = false;
        }
    }

    canShoot() {
        return !this.shootCooldown && this.ammo > 0 && this.isAlive;
    }

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

    startFinSlapAttack() {
        this.isFinSlapAnimating = true;
        this.currentImage = 0; // Setze den aktuellen Frame auf 0
        this.attackCooldown = true; // Cooldown aktivieren für die Nahkampfattacke
        this.animateAttack(); // Attack Animation starten
        this.melee_sound.play(); // Melee-Sound abspielen

        setTimeout(() => {
            this.attackCooldown = false; // Cooldown zurücksetzen
            this.melee_sound.pause(); // Den Sound anhalten
            this.melee_sound.currentTime = 0; 
        }, this.attackCooldownTime);
    }

    playShootingAnimation() {
        if (this.isShooting) {
            let isFinished = this.playAnimation(this.IMAGES_SHOOT);
            if (isFinished && this.useAmmo()) { 
                this.shooting_sound.play();
                this.world.ammoBar.setAmmo(this.ammo);
                let bubble = new ThrowableObject(this.x + 180, this.y + 100, this.otherDirection);
                this.world.throwableObject.push(bubble);
                this.canCreateBubble = false;
                this.isShooting = false; // Setze auf false, wenn die Animation beendet ist
            } else {
                setTimeout(() => this.playShootingAnimation(), 80);
            }
            setTimeout(() => {
                this.canCreateBubble = true;
            }, 600);
        }
    }

    updateCurrentAnimation() {
        const currentTime = Date.now();
        const elapsed = currentTime - this.lastKeyPressTime;

        if (elapsed > 3000) { // Zeitraum von 3 Sekunden
            this.isLongIdle = true;
        } else {
            this.isLongIdle = false;
        }

        if (this.isAnimatingSwim) {
            this.currentAnimation = 'swim';
        } else {
            this.currentAnimation = this.isLongIdle ? 'long_idle' : 'idle';
        }
    }

    handleMovement() {
        let isMoving = false;

        if (this.keyboard.RIGHT && this.x < this.world.level.level_end_x && this.isAlive) {
            this.x += this.speed;
            this.otherDirection = false;
            isMoving = true;
        }
        if (this.keyboard.LEFT && this.x > 0 && this.isAlive) {
            this.x -= this.speed;
            this.otherDirection = true;
            isMoving = true;
        }
        if (this.keyboard.UP && this.y > -120 && this.isAlive) {
            this.y -= this.speed;
            isMoving = true;
        }
        if (this.keyboard.DOWN && this.y < 290 && this.isAlive) {
            this.y += this.speed;
            isMoving = true;
        }

        if (isMoving) {
            this.playWalkSound();
        } else {
            this.stopWalkSound();
        }

        this.world.camera_x = 0 - this.x;
    }

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

    playWalkSound() {
        if (this.walking_sound.paused) {
            this.walking_sound.currentTime = 0;
            this.walking_sound.play();
        }
    }

    stopWalkSound() {
        if (!this.walking_sound.paused) {
            this.walking_sound.pause();
        }
    }

    updateLongIdleAnimation() {
        if (this.currentLongIdleImageIndex < 10) {
            this.handleInitialImages();
        } else {
            this.handleSubsequentImages();
        }
    }

    handleInitialImages() {
        let i = this.currentLongIdleImageIndex % this.IMAGES_LONG_IDLE.length;
        let path = this.IMAGES_LONG_IDLE[i];
        this.img = this.imageCache[path];
        this.currentLongIdleImageIndex++;
    }

    handleSubsequentImages() {
        this.currentLongIdleImageIndex = this.calculateCurrentIndexForSubsequentImages();
        let path = this.IMAGES_LONG_IDLE[this.currentLongIdleImageIndex];
        this.img = this.imageCache[path];
        this.currentLongIdleImageIndex++;

        if (this.currentLongIdleImageIndex >= 14) {
            this.currentLongIdleImageIndex = 10; // Zurück auf 11-14 Zyklus setzen
        }
    }

    calculateCurrentIndexForSubsequentImages() {
        return 10 + (this.currentLongIdleImageIndex - 10) % 4; 
    }

    playDeadAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        if (i < images.length - 1) {
            this.currentImage++;
        }
    }

    addAmmo() {
        this.ammo += 1;
        if (this.ammo < 0) {
            this.ammo = 0;
        } else if (this.ammo > 10) {
            this.ammo = 10;
        }
    }

    useAmmo() {
        if (this.ammo > 0) {
            this.ammo -= 1;
            return true;
        }
        return false;
    }

    getHitbox() {
        return {
            x: this.x + 50,
            y: this.y + 120,
            width: this.width - 100,
            height: this.height - 180
        };
    }

    addCoin() {
        this.coins += 1;
        if (this.coins < 0) {
            this.coins = 0;
        } else if (this.coins > 10) {
            this.coins = 10;
        }
    }
}

