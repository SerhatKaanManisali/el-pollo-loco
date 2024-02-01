class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speed_y = 0;
    acceleration = 1;
    healthPoints = 100;
    lastHit = 0;
    offset_y = -10;
    offset_x = 0;


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speed_y > 0) {
                this.y -= this.speed_y;
                this.speed_y -= this.acceleration;
            } else {
                this.speed_y = 0;
            }
        }, 1000 / 40);
    }


    hit(number) {
        this.healthPoints -= number;
        if (this.healthPoints < 0) {
            this.healthPoints = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    isDead() {
        return this.healthPoints === 0;
    }


    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return this.y < 360;
        }
        return this.y < 130;
    }


    isColliding(mo) {
        return (this.x + this.width + this.offset_x) >= mo.x && (this.x + this.offset_x) <= (mo.x + mo.width) && 
        (this.y + this.offset_y + this.height) >= mo.y &&
        (this.y + this.offset_y) <= (mo.y + mo.height);
    }


    isHurt() {
        let timePassed = new Date() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 0.5;
    }


    playAnimation(images) {
        let index = this.currentIamge % images.length;
        let path = images[index];
        this.img = this.imageCache[path];
        this.currentIamge++;
    }


    moveRight() {
        this.x += this.speed;
    }


    moveLeft() {
        this.x -= this.speed;
    }
    

    jump() {
        this.speed_y = 20;
    }
}