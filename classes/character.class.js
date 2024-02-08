class Character extends MovableObject {
    y = 130;
    height = 300;
    width = 130;
    speed = 7;
    IMAGES_IDLE_LONG = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ]
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png'
    ];
    IMAGES_FALLING = [
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ]
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ]
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ]
    world;
    idleStart = 0;


    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png', 0);
        this.loadImages(this.IMAGES_IDLE_LONG);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_FALLING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.animate();
        allSounds[2].volume = 0.35;
        allSounds[3].volume = 0.15;
    }


    /**
     * Starts character's animations.
     */
    animate() {
        setStoppableInterval(() => this.moveCharacter(), 1000 / 60);
        setStoppableInterval(() => this.playCharacter(), 100);
    }


    /**
     * Moves character on the map.
     */
    moveCharacter() {
        if (gameRunning) {
            if (this.canMoveRight())
                this.moveRight();
            if (this.canMoveLeft())
                this.moveLeft();
            if (this.canJump())
                this.jump();
        }
        this.world.camera_x = -this.x + 100;
    }



    /**
     * Moves character to the right.
     */
    moveRight() {
        super.moveRight();
        this.otherDirection = false;
        if (!this.isAboveGround()) {
            allSounds[0].play();
        }
    }


    /**
     * Moves character to the left.
     */
    moveLeft() {
        super.moveLeft();
        this.otherDirection = true
        if (!this.isAboveGround()) {
            allSounds[0].play();
        }
    }


    /**
     * Makes character jump.
     */
    jump() {
        super.jump();
        allSounds[1].volume = 0.5;
        allSounds[1].play();
    }


    /**
     * @returns - Condition when checking if character wants to move to the right.
     */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }


    /**
     * @returns - Condition when checking if character wants to move to the left.
     */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0;
    }


    /**
     * @returns - Condition when checking if character wants to jump.
     */
    canJump() {
        return this.world.keyboard.SPACE && !this.isAboveGround();
    }


    /**
     * Animates character depending on it's actions.
     */
    playCharacter() {
        if (gameRunning) {
            if (this.isDead()) {
                this.playDead();
            } else if (this.isHurt()) {
                this.playHurt();
            } else if (this.isAboveGround() && this.speed_y > 0) {
                this.playJump();
            } else if (this.isAboveGround() && this.speed_y < 0) {
                this.playFall();
            } else if (this.isMoving()) {
                this.playWalk();
            } else if (this.isIdle()) {
                this.playIdleLong();
            } else {
                this.playIdle();
            }
        }
    }


    /**
     * @returns - Condition when checking if character is moving to the left or to the right.
     */
    isMoving() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
    }


    /**
     * @returns - Condition when checking if character isn't moving.
     */
    isIdle() {
        return this.idleStart >= 5000
    }


    /**
     * Plays death animation.
     */
    playDead() {
        this.playAnimation(this.IMAGES_DEAD);
        allSounds[3].pause();
        setTimeout(stopGame(), 100);
    }


    /**
     * Plays animation when character is hurt.
     */
    playHurt() {
        this.playAnimation(this.IMAGES_HURT);
        this.idleStart = 0;
        allSounds[3].pause();
    }


    /**
     * Plays animation when character is jumping.
     */
    playJump() {
        this.playAnimation(this.IMAGES_JUMPING);
        this.idleStart = 0;
        allSounds[3].pause();
    }


    /**
     * Plays animation when character is falling.
     */
    playFall() {
        this.playAnimation(this.IMAGES_FALLING);
        this.idleStart = 0;
        allSounds[3].pause();
    }


    /**
     * Plays animation when character is walking.
     */
    playWalk() {
        this.playAnimation(this.IMAGES_WALKING);
        this.idleStart = 0;
        allSounds[3].pause();
    }


    /**
     * Plays animation when character hasn't been moving for too long.
     */
    playIdleLong() {
        this.playAnimation(this.IMAGES_IDLE_LONG);
        allSounds[3].play();
    }


    /**
     * Plays standard animation when standing still for a few seconds.
     */
    playIdle() {
        this.playAnimation(this.IMAGES_IDLE);
        this.idleStart += 100;
        allSounds[3].pause();
    }
}