class Endboss extends MovableObject {

    IMAGES_SPAWNING = [
        'img/2.Enemy/3 Final Enemy/1.Introduce/1.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/2.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/3.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/4.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/5.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/6.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/7.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/8.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/9.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/10.png'
    ];
    IMAGES_FLOATING = [
        'img/2.Enemy/3 Final Enemy/2.floating/1.png',
        'img/2.Enemy/3 Final Enemy/2.floating/2.png',
        'img/2.Enemy/3 Final Enemy/2.floating/3.png',
        'img/2.Enemy/3 Final Enemy/2.floating/4.png',
        'img/2.Enemy/3 Final Enemy/2.floating/5.png',
        'img/2.Enemy/3 Final Enemy/2.floating/6.png',
        'img/2.Enemy/3 Final Enemy/2.floating/7.png',
        'img/2.Enemy/3 Final Enemy/2.floating/8.png',
        'img/2.Enemy/3 Final Enemy/2.floating/9.png',
        'img/2.Enemy/3 Final Enemy/2.floating/10.png',
        'img/2.Enemy/3 Final Enemy/2.floating/11.png',
        'img/2.Enemy/3 Final Enemy/2.floating/12.png',
        'img/2.Enemy/3 Final Enemy/2.floating/13.png'
    ];
    IMAGES_ATTACK = [
        'img/2.Enemy/3 Final Enemy/Attack/1.png',
        'img/2.Enemy/3 Final Enemy/Attack/2.png',
        'img/2.Enemy/3 Final Enemy/Attack/3.png',
        'img/2.Enemy/3 Final Enemy/Attack/4.png',
        'img/2.Enemy/3 Final Enemy/Attack/5.png',
        'img/2.Enemy/3 Final Enemy/Attack/6.png'
    ];
    IMAGES_HURT = [
        'img/2.Enemy/3 Final Enemy/Hurt/1.png',
        'img/2.Enemy/3 Final Enemy/Hurt/2.png',
        'img/2.Enemy/3 Final Enemy/Hurt/3.png',
        'img/2.Enemy/3 Final Enemy/Hurt/4.png'
    ];
    IMAGES_DEAD = [
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png'
    ];

    y = -650;
    height = 600;
    width = 600;
    energy = 500;
    world;
    spawning_sound = new Audio('audio/boss-spawn.mp3');
    boss_music = new Audio('audio/boss-music.mp3');
    boss_bite = new Audio('audio/bite.mp3');
    boss_hurt = new Audio('audio/boss-hurt.mp3');
    boss_death = new Audio('audio/boss-death.mp3');
    spawning = false;
    spawned = false;
    speed = 0.8;
    firstframedead = true;
    isAttacking = false;
    hasMovedLeft = false;
    despawnTimer = 1000;

    constructor(world) {
        super().loadImage(this.IMAGES_FLOATING[0]);
        this.world = world;
        this.loadImages(this.IMAGES_FLOATING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_SPAWNING);
        this.loadImages(this.IMAGES_ATTACK);
        this.x = 2000;
        this.currentImage = 0;
    }

/**
 * Starts the animation loop, managing movement and attack animations.
 */
animate() {
    if (this.hasMovedLeft) {
        this.moveleft();
    }
    this.startAttackAnimation();
    this.intervalIDs.push(setInterval(() => {
        this.updateAnimation();
    }, 180));          
}

/**
 * Updates the current animation state based on character's movement and actions.
 */
updateAnimation() {
    this.handleMovement();
    this.handleStateAnimations();
    if (!this.spawned) {
        this.handleSpawning();
        return;
    }
    if (this.spawning) {
        this.handleSpawningAnimation();
        return;
    }
    this.checkMusicPlay();
}

/**
 * Handles the spawning logic for the character.
 */
handleSpawning() {
    if (this.checkSpawnDistance()) {
        this.spawning = true;
        this.spawned = true;
        this.currentImage = 0;
    }
}

/**
 * Manages the spawning animation, including sound effects.
 */
handleSpawningAnimation() {
    this.playAnimation(this.IMAGES_SPAWNING);
    if (this.currentImage >= 10) {
        this.spawning = false;
    }
    this.y = -150;
    if (!this.isSoundMuted) {
        this.spawning_sound.play();
    }
}

/**
 * Handles the movement of the character after spawning.
 */
handleMovement() {
    if (this.spawned && !this.hasMovedLeft) { 
        this.moveleft();
        this.hasMovedLeft = true; 
    }
}

/**
 * Handles the animation states based on the character's current status.
 */
handleStateAnimations() {
    if (this.isDead()) {
        this.handleDeathAnimation();
        this.spawned = false;
    } else if (this.isHurt()) {
        this.handleHurtAnimation();
    } else if (this.isAttacking) {
        this.handleAttackAnimation();
    } else {
        this.playAnimation(this.IMAGES_FLOATING);
    }
}

/**
 * Manages the death animation of the character.
 */
handleDeathAnimation() {
    this.boss_music.pause();
    if (this.firstframedead) {
        this.currentImage = 0;
        this.firstframedead = false;
    }
    this.playDeadAnimation(this.IMAGES_DEAD);
}

/**
 * Manages the hurt animation of the character, including sound effects.
 */
handleHurtAnimation() {
    if (!this.isSoundMuted) {
        this.boss_hurt.play();
    }
    this.playAnimation(this.IMAGES_HURT);
}

/**
 * Manages the attack animation of the character.
 */
handleAttackAnimation() {
    this.playAnimation(this.IMAGES_ATTACK);
    if (this.currentImage >= 6) {
        this.isAttacking = false;
        this.currentImage = 0;
    }
}

/**
 * Plays the specified animation frames.
 * @param {Array} images - The array of image paths for the animation.
 */
playAnimation(images) {
    this.currentImage = this.currentImage % images.length;
    let path = images[this.currentImage];
    this.img = this.imageCache[path];
    this.currentImage++;
}

/**
 * Plays the dead animation frames.
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
 * Returns the hitbox object for the character.
 * @returns {Object} - The hitbox with properties x, y, width, and height.
 */
getHitbox() {
    return {
        x: this.x + 40,
        y: this.y + 220,
        width: this.width - 80,
        height: this.height - 350
    }
}

/**
 * Checks if the character is within the required distance to spawn.
 * @returns {boolean} - True if the character can spawn, otherwise false.
 */
checkSpawnDistance() {
    return world.character.x >= 1500;
}

/**
 * Checks the health status of the character.
 * @returns {boolean} - True if the character is dead, otherwise false.
 */
checkCharacterHealth() {
    return world.character.isDead();
}

/**
 * Manages the background music based on the character's state.
 */
checkMusicPlay() {
    this.intervalIDs.push(setInterval(() => {
        if (this.spawned && !this.isSoundMuted && !this.isDead() && !this.checkCharacterHealth() && this.x >= -500) {
            this.boss_music.play();
        } else {
            this.boss_music.pause();
        }
    }, 200));
}

/**
 * Starts the attack animation with a defined interval.
 */
startAttackAnimation() {
    this.intervalIDs.push(setInterval(() => {
        if (!this.isDead() && !this.isHurt() && this.spawning == false) {
            this.isAttacking = true;
            this.currentImage = 0;
            if (this.spawned) {
                if (!this.isSoundMuted) {
                    this.boss_bite.play();
                }
            }
        }
    }, 5000));
}
}