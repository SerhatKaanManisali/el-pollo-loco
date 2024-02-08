class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speed_y = 0;
    acceleration = 1;
    healthPoints = 100;
    lastHit = 0;
    offset_top = 200;
    offset_bottom = -10;
    offset_right = -50;
    offset_left = 50


    /**
     * Simulates gravity in game.
     */
    applyGravity() {
        setStoppableInterval(() => this.pullDown(), 1000 / 40);
    }


    /**
     * Pulls down if object is in air and has no velocity upwords or downwords.
     */
    pullDown() {
        if (gameRunning) {
            if (this.isAboveGround() || this.speed_y > 0) {
                this.y -= this.speed_y;
                this.speed_y -= this.acceleration;
            } else {
                this.speed_y = 0;
            }
        }
    }


    /**
     * Subtracts healthpoints from total amount.
     * @param {number} number - Amount of healthpoints to be subtracted.
     */
    hit(number) {
        this.healthPoints -= number;
        if (this.healthPoints < 0) {
            this.healthPoints = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * @returns - Condition when checking if character or endboss is dead.
     */
    isDead() {
        return this.healthPoints === 0;
    }


    /**
     * @returns - Condition when checking if bottle or character is in the air.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return this.y < 360;
        }
        return this.y < 130;
    }


    /**
     * Checks wheter two objects are colliding or not.
     * @param {object} mo - Object to check collision with.
     * @returns - Condition when checking if two objects are colliding.
     */
    isColliding(mo) {
        return (this.x + this.width + this.offset_right) >= mo.x &&
        (this.x + this.offset_left) <= (mo.x + mo.width) &&
        (this.y + this.offset_bottom + this.height) >= mo.y &&
        (this.y + this.offset_top) <= (mo.y + mo.height);
    }


    /**
     * @returns - True if character or endboss has been hit in the past 0.5 seconds.
     */
    isHurt() {
        let timePassed = new Date() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 0.5;
    }


    /**
     * Iterates through array in order to create an animation.
     * @param {Array} images - Array of images to be animated.
     */
    playAnimation(images) {
        let index = this.currentIamge % images.length;
        let path = images[index];
        this.img = this.imageCache[path];
        this.currentIamge++;
    }


    /**
     * Moves object to right by increasing the x coordinate.
     */
    moveRight() {
        this.x += this.speed;
    }


    /**
     * Moves object to left by decreasing the x coordinate.
     */
    moveLeft() {
        this.x -= this.speed;
    }
    

    /**
     * Makes object jump by increasing the velocity on the y axis.
     */
    jump() {
        this.speed_y = 20;
    }
}