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

    speed = 10; //2
    width = 250;
    height = 250;
    y = 90;
    x = 30;
    currentAnimation = 'idle';
    world;
    walking_sound = new Audio('audio/swimming.mp3');
    shooting_sound = new Audio('audio/shoot.mp3');
    lastKeyPressTime = Date.now();
    isLongIdle = false;
    currentLongIdleImageIndex = 0;
    isFinSlapAnimating = false;
    attackCooldown = false;
    attackCooldownTime = 600;
    coins = 0;
    ammo = 0;


    constructor() {
        super().loadImage('img/1.Sharkie/1.IDLE/1.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_FINSLAP);
        this.keyboard = keyboard;
        this.animate();
        this.startMovement();
    }

    animate() {
        setInterval(() => {
            this.updateAnimation();
        }, 200);
    }

    animateAttack() {
        this.playFinSlapAnimation(); // Direkt die Animation starten
    }

    startMovement() {
        setInterval(() => {
            this.handleMovement();
        }, 1000 / 60);
    }

    updateAnimation() {
        this.checkKeyboardInput();
        this.updateCurrentAnimation();
        this.handleMovement();

        if (this.isDead()) {
            this.playDeadAnimation(this.IMAGES_DEAD);
            return;
        }

        if (this.isHurt()) {
            this.playHurtAnimation();
            return;
        }

        if (this.isFinSlapAnimating) {
            this.playFinSlapAnimation();
            return;
        }

        this.playCurrentAnimation();
    }

    playHurtAnimation() {
        this.playAnimation(this.IMAGES_HURT);
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
            this.isFinSlapAnimating = false; // Stop FinSlap, wenn in Bewegung

            if (!this.isAnimatingSwim) {
                this.isAnimatingSwim = true;
            }
        } else if (this.keyboard.ATTACK && !this.attackCooldown) { // Prüfen, ob die Attack-Taste gedrückt ist und kein Cooldown aktiv ist
            this.isFinSlapAnimating = true;
            this.currentImage = 0; // Setze den aktuellen Frame auf 0
            this.attackCooldown = true; // Aktivieren des Cooldowns
            this.animateAttack(); // Attack Animation starten
            setTimeout(() => {
                this.attackCooldown = false; // Cooldown nach der festgelegten Zeit zurücksetzen
            }, this.attackCooldownTime);
        } else {
            this.isAnimatingSwim = false;
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

        if (this.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.x += this.speed;
            this.otherDirection = false;
            isMoving = true;
        }
        if (this.keyboard.LEFT && this.x > 0) {
            this.x -= this.speed;
            this.otherDirection = true;
            isMoving = true;
        }
        if (this.keyboard.UP && this.y > -120) {
            this.y -= this.speed;
            isMoving = true;
        }
        if (this.keyboard.DOWN && this.y < 290) {
            this.y += this.speed;
            isMoving = true;
        }
        if (this.keyboard.SPACE) {
            this.shooting_sound.play();
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
        return 10 + (this.currentLongIdleImageIndex - 10) % 4; // Bilder 11-14
    }

    playDeadAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        if (i < images.length - 1) {
            this.currentImage++;
        }
    }

    stayDead() {
        this.currentAnimation = 'dead';
        this.currentImage = this.IMAGES_DEAD.length - 1; // Setze den Animationsindex auf das letzte Bild

        // Zeige das letzte Bild aus dem IMAGES_DEAD-Array permanent an
        this.img = this.imageCache[this.IMAGES_DEAD[this.currentImage]];

        // Setze alle Animationen zurück, um unerwünschte Animationen zu vermeiden
        this.isFinSlapAnimating = false;
        this.isAnimatingSwim = false;
        this.isLongIdle = false;
    }

    addAmmo() {
        this.ammo += 1;
        if (this.ammo < 0) {
            this.ammo = 0;
        } else if (this.ammo > 10) {
            this.ammo = 10
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
        }
    }

    addCoin() {
        this.coins += 1;
        if (this.coins < 0) {
            this.coins = 0;
        } else if (this.coins > 10) {
            this.coins = 10
        }
    }
}
