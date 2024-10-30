class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    energy = 100;
    lastHit = 0;

    isColliding(mo) {
        // Durchführung der Kollisionserkennung mit logischem ODER
        return !(!(this.getHitbox().x < mo.getHitbox().x + mo.getHitbox().width) ||
            !(this.getHitbox().x + this.getHitbox().width > mo.getHitbox().x) ||
            !(this.getHitbox().y < mo.getHitbox().y + mo.getHitbox().height) ||
            !(this.getHitbox().y + this.getHitbox().height > mo.getHitbox().y));
    }

    hit() {
        this.energy -= 10;
        this.world.character.isElectricHurt = false;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
        console.log(world.character.isElectricHurt);
    }

    bubbleHit() {
        this.energy -= 100;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    electricHit() {
        this.energy -= 40;
        this.world.character.isElectricHurt = true;

        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
        console.log(this.world.character.isElectricHurt);

        // Setzen Sie einen Timer, um isElectricHurt nach Ablauf einer bestimmten Zeit zu aktualisieren
        setTimeout(() => {
            let timePassed = new Date().getTime() - this.lastHit;
            this.world.character.isElectricHurt = false;
            console.log(this.world.character.isElectricHurt);
        }, 1000);
    }

    isDead() {
        return this.energy == 0;
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    moveRight() {
        console.log('Moving right');
    }

    moveleft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25)
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true
        } else {
            return this.y < 180;
        }
    }
}