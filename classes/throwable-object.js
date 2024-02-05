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
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 80;
        this.speed = 8;
        allSounds[10].volume = 0.35;
        allSounds[11].volume = 0.35;
        this.throw();
    }


    throw() {
        this.speed_y = 12;
        this.applyGravity();
        setStoppableInterval(() => {
            if (gameRunning && this.speed_y !== 0) {
                this.moveRight();
            }
        }, 1000 / 60);
        this.bottleAnimation = setInterval(() => this.animateBottle(), 100);
    }


    animateBottle() {
        if (gameRunning && !this.isAboveGround() && this.splashSound === true) {
            this.playAnimation(this.IMAGES_BOTTLE_SPLASHING);
            allSounds[10].pause();
            allSounds[11].play();
            clearInterval(this.bottleAnimation);
            setTimeout(() => {
                this.width = 0;
                this.height = 0;
                this.y = - 999;
            }, 150);
        } else {
            this.playAnimation(this.IMAGES_BOTTLE_ROTATING);
            allSounds[10].play();
        }
    }


    checkIfBottleHit(bottle) {
        this.world.level.enemies.forEach((enemy) => {
            if (bottle.isColliding(enemy) && !this.collisionStatus) {
                if (enemy.type) {
                    allSounds[4].play();
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