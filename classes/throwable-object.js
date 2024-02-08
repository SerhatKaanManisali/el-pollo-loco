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


    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_BOTTLE_ROTATING);
        this.loadImages(this.IMAGES_BOTTLE_SPLASHING);
        this.setUpProperties(x, y);
        this.throw();
    }


    /**
     * Sets up throwable objects properties.
     * @param {number} x - Throwable objects x coordinate.
     * @param {number} y - Throwable objects y coordinate.
     */
    setUpProperties(x, y) {
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 80;
        this.speed = 8;
        this.offset_top = 30;
        this.offset_left = 20;
        this.offset_right = -20;
        allSounds[10].volume = 0.35;
        allSounds[11].volume = 0.35;
    }


    /**
     * Throws bottle.
     */
    throw() {
        this.speed_y = 12;
        this.applyGravity();
        setStoppableInterval(() => this.moveBottle(), 1000 / 60);
        this.bottleAnimation = setInterval(() => this.animateBottle(), 100);
        allIntervals.push(this.bottleAnimation);
    }


    /**
     * Moves bottle to right.
     */
    moveBottle() {
        if (gameRunning && this.speed_y !== 0)
            this.moveRight();
    }


    /**
     * Plays animations for thrown bottle.
     */
    animateBottle() {
        if (gameRunning && !this.isAboveGround()) {
            this.playSplash();
        } else {
            this.playRotate();
        }
    }


    /**
     * Plays rotate animation while bottle is in the air.
     */
    playRotate() {
        this.playAnimation(this.IMAGES_BOTTLE_ROTATING);
        allSounds[10].play();
    }


    /**
     * Plays splash animation when bottle hits the ground.
     */
    playSplash() {
        this.playAnimation(this.IMAGES_BOTTLE_SPLASHING);
        allSounds[10].pause();
        allSounds[11].play();
        clearInterval(this.bottleAnimation);
        setTimeout(() => this.removeBottle(), 150);
    }


    /**
     * Removes bottle from map.
     */
    removeBottle() {
        this.width = 0;
        this.height = 0;
        this.y = - 999;
    }
}