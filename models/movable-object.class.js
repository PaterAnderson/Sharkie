class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    energy = 100;
    lastHit = 0;
    despawnTimer = 0;
    intervalIDs = [];

    /**
     * The startAnimation function calls the animate method.
     */
    startAnimation() {
        this.animate();
    }

    /**
     * The `stopAnimation` function clears all interval timers stored in the `intervalIDs` array.
     */
    stopAnimation() {
        this.intervalIDs.forEach(id => {
            clearInterval(id);
        });
    }

    /**
     * The function `isColliding` checks if two objects are colliding based on their hitboxes.
     * @param mo - The `mo` parameter in the `isColliding` function represents another object with a
     * hitbox that you want to check for collision with the object calling the `isColliding` function.
     * The function compares the hitboxes of the two objects to determine if they are colliding based
     * on their positions
     * @returns The `isColliding` function is returning a boolean value that indicates whether the
     * hitboxes of two objects are colliding. If the hitboxes are colliding, the function will return
     * `true`, otherwise it will return `false`.
     */
    isColliding(mo) {
        return !(!(this.getHitbox().x < mo.getHitbox().x + mo.getHitbox().width) ||
            !(this.getHitbox().x + this.getHitbox().width > mo.getHitbox().x) ||
            !(this.getHitbox().y < mo.getHitbox().y + mo.getHitbox().height) ||
            !(this.getHitbox().y + this.getHitbox().height > mo.getHitbox().y));
    }

    /**
     * The `hit` function decreases the energy of an object by 10, sets a flag to indicate the object
     * is not hurt by electricity, and updates the last hit timestamp if the energy is not negative.
     */
    hit() {
        this.energy -= 10;
        this.world.character.isElectricHurt = false;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * The function `bubbleHit` decreases the energy by 100 and updates the last hit time if the energy
     * is not negative.
     */
    bubbleHit() {
        this.energy -= 100;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * The slapHit function reduces the energy by 50 and updates the last hit time if the energy is not
     * negative.
     */
    slapHit() {
        this.energy -= 50;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * The function `electricHit` decreases the energy of an object by 40, sets a flag indicating
     * electric hurt, and resets the energy to 0 if it goes below 0, while also tracking the time of
     * the last hit and updating the electric hurt flag after a delay of 1 second.
     */
    electricHit() {
        this.energy -= 40;
        this.world.character.isElectricHurt = true;

        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }

        setTimeout(() => {
            let timePassed = new Date().getTime() - this.lastHit;
            this.world.character.isElectricHurt = false;
        }, 1000);
    }

    /**
     * The `isDead` function checks if the energy level of an object is zero to determine if it is
     * dead.
     * @returns The `isDead()` function is returning a boolean value based on whether the `energy`
     * property of the object is equal to 0. If the `energy` is 0, the function will return `true`,
     * indicating that the object is dead. Otherwise, it will return `false`.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * The function `isHurt()` calculates the time passed since the last hit and returns true if it's
     * less than 1 second.
     * @returns The `isHurt()` function is returning a boolean value indicating whether the time passed
     * since the last hit is less than 1 second.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    /**
     * The `moveleft` function continuously decreases the value of `this.x` by `this.speed` at a rate
     * of 60 times per second.
     */
    moveleft() {
        this.intervalIDs.push(setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60));
    }

    /**
     * 
     * @param {string[]} images 
     * @returns {boolean}
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
        return (this.currentImage % images.length) == 0;
    }

    /**
     * The `applyGravity` function simulates gravity by decreasing the vertical position (`y`) of an
     * object over time.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25)
    }

    /**
     * The function `isAboveGround` checks if an object is above the ground level based on its
     * y-coordinate.
     * @returns The `isAboveGround()` function is checking if the object is an instance of
     * `ThrowableObject`. If it is, then it returns `true`. If not, it checks if the `y` property of
     * the object is less than 180 and returns the result.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true
        } else {
            return this.y < 180;
        }
    }
}