class Endboss extends MovableObject {
    y = 100;
    height = 350;
    width = 250;
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ]
    world;
    distance;
    attackRange = 30;
    chaseRange = 250;
    dead = false;


    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 4000;
        this.speed = 0.5;
        allSounds[8].volume = 0.15;
        allSounds[9].volume = 0.15;
        this.animate();
    }


    animate() {
        setStoppableInterval(() => {
            if (gameRunning) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setStoppableInterval(() => {
            if (gameRunning) {
                if (this.isDead()) {
                    this.playAnimation(this.IMAGES_DEAD);
                    allSounds[9].play();
                    setTimeout(stopGame(), 100);
                } else if (this.isHurt()) {
                    this.playAnimation(this.IMAGES_HURT);
                    allSounds[7].play();
                } else if (this.x - (this.world.character.x + this.world.character.width) <= this.attackRange) {
                    this.attack();
                } else if (this.x - (this.world.character.x + this.world.character.width) <= this.chaseRange) {
                    this.chase();
                } else {
                    this.speed = 0.5;
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 200);
    }


    attack() {
        this.speed = 0;
        this.playAnimation(this.IMAGES_ATTACK);
        allSounds[8].play();
        this.world.character.hit(1);
        allSounds[2].play();
        this.world.healthBar.percentage = this.world.character.healthPoints;
        this.world.healthBar.setPercentage();
    }


    chase() {
        this.speed = 3;
        this.playAnimation(this.IMAGES_WALKING);
    }
}