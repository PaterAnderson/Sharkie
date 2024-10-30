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
    spawning_sound = new Audio('audio/boss-spawn.mp3');
    boss_music = new Audio('audio/boss-music.mp3');
    boss_bite = new Audio('audio/bite.mp3');
    boss_hurt = new Audio('audio/boss-hurt.mp3');
    boss_death = new Audio('audio/boss-death.mp3');
    spawning = false;
    spawned = false;
    speed = 0.1;
    firstframedead = true;
    isAttacking = false;

    constructor() {
        super().loadImage(this.IMAGES_FLOATING[0]);
        this.loadImages(this.IMAGES_FLOATING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_SPAWNING);
        this.loadImages(this.IMAGES_ATTACK);
        this.x = 2000;
        this.currentImage = 0; // Initialisierung der aktuellen Bildindex
        this.animate();
        this.startAttackAnimation();
    }

    animate() {
        setInterval(() => {
            this.updateAnimation();
        }, 180);
    }

    updateAnimation() {
        if (!this.spawned) {
            if (this.checkSpawnDistance()) {
                this.spawned = true;
                this.spawning = true;
                this.currentImage = 0;
            }
        }
        if (this.spawning) {
            this.playAnimation(this.IMAGES_SPAWNING);
            if (this.currentImage >= 10) {
                this.spawning = false;
            }
            this.y = -150;
            this.spawning_sound.play();
            this.moveleft();
            this.boss_music.play();
            return;
        }
        if (this.isDead()) {
            if (this.firstframedead) {
                this.currentImage = 0;
                this.firstframedead = false;
            }
            this.playDeadAnimation(this.IMAGES_DEAD);
        } else if (this.isHurt()) {
            this.boss_hurt.play();
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.isAttacking) {
            this.playAnimation(this.IMAGES_ATTACK);
            if (this.currentImage >= 6) {
                this.isAttacking = false;
                this.currentImage = 0;
            }
        } else {
            this.playAnimation(this.IMAGES_FLOATING);
        }
    }

    playAnimation(images) {
        this.currentImage = this.currentImage % images.length;
        let path = images[this.currentImage];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    playDeadAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        if (i < images.length - 1) {
            this.currentImage++;
        }
    }

    getHitbox() {
        return {
            x: this.x + 40,
            y: this.y + 220,
            width: this.width - 80,
            height: this.height - 350
        }
    }

    checkSpawnDistance() {
        return world.character.x >= 1500;
    }

    startAttackAnimation() {
        setInterval(() => {
            if (!this.isDead() && !this.isHurt() && this.spawning == false) {
                this.isAttacking = true;
                this.currentImage = 0;
                // Den Bite-Sound nur abspielen, wenn der Boss gespawnt ist und angreift
                if (this.spawned) {
                    this.boss_bite.play();
                }
            }
        }, 5000);
    }
}