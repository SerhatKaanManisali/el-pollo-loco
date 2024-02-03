class ThrowableObject extends MovableObject {
    world;
    IMAGES_BOTTLE_ROTATING = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    IMAGES_BOTTLE_SPLASHING = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];
    bottleAnimation;
    throwBottle_sound = new Audio('audio/throw-bottle.mp3');
    splashBottle_sound = new Audio('audio/break-bottle.mp3');
    throwDelay = false;
    splashSound = false;
    collisionStatus = false;


    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_BOTTLE_ROTATING);
        this.loadImages(this.IMAGES_BOTTLE_SPLASHING);
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 80;
        this.speed = 8;
        this.throwBottle_sound.volume = 0.35;
        this.splashBottle_sound.volume = 0.35;
        this.throw();
    }


    throw() {
        this.speed_y = 12;
        this.applyGravity();
        setStoppableInterval(() => {
            if (this.speed_y !== 0) {
                this.moveRight();
            }
        }, 1000 / 60);
        this.bottleAnimation = setInterval(() => this.animateBottle(), 100);
        this.splashSound = true;
    }


    animateBottle() {
        if (!this.isAboveGround() && this.splashSound === true) {
            this.playAnimation(this.IMAGES_BOTTLE_SPLASHING);
            this.throwBottle_sound.pause();
            this.splashBottle_sound.play();
            clearInterval(this.bottleAnimation);
            setTimeout(() => {
                this.width = 0;
                this.height = 0;
                this.y = - 999;
            }, 150);
        } else {
            this.playAnimation(this.IMAGES_BOTTLE_ROTATING);
            this.throwBottle_sound.play();
        }
    }


    checkThrownObjects() {
        setStoppableInterval(() => {
            if (this.world.keyboard.SHIFT && this.world.collectableObject.bottleAmount > 0 && this.throwDelay === false) {
                this.throwDelay = true;
                this.collisionStatus = false;
                let bottle = new ThrowableObject(this.world.character.x + 50, this.world.character.y + 100);
                this.world.level.throwableObjects.push(bottle);
                this.world.collectableObject.reduceBottleAmount();
                this.world.bottleBar.percentage = this.world.collectableObject.bottleAmount;
                this.world.bottleBar.setPercentage();
                this.checkIfBottleHit(bottle);
                setTimeout(() => {
                    this.throwDelay = false;
                }, 1000);
            }
        }, 100);
    }


    checkIfBottleHit(bottle) {
        this.world.level.enemies.forEach((enemy) => {
            if (bottle.isColliding(enemy) && !this.collisionStatus) {
                if (enemy.type) {
                    this.world.chicken.chickenHurt_sound.play();
                    enemy.hit(100);
                } else {
                    this.world.endboss.hit(20);
                    this.world.endbossBar.percentage = this.world.endboss.healthPoints;
                    this.world.endbossBar.setPercentage();
                    this.collisionStatus = true;
                }
            }
        });
        requestAnimationFrame(() => this.checkIfBottleHit(bottle));
    }
}