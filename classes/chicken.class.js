class Chicken extends MovableObject {
    world;
    y = 350;
    height = 75;
    width = 75;
    IMAGES_WALKING_NORMAL = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGES_DEAD_NORMAL = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];
    IMAGES_WALKING_SMALL = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMAGES_DEAD_SMALL = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];
    type;


    constructor(type) {
        super();
        this.setUpProperties(type);
        this.loadImages(this.IMAGES_WALKING_NORMAL);
        this.loadImages(this.IMAGES_DEAD_NORMAL);
        this.loadImages(this.IMAGES_WALKING_SMALL);
        this.loadImages(this.IMAGES_DEAD_SMALL);
        this.loadImage(this.pickImage());
        this.setUpSmallChicken();
        this.animate();
    }


    /**
     * Sets up chicken's properties.
     * @param {string} type - Type of the chicken, which is supposed to spawn.
     */
    setUpProperties(type) {
        this.x = 700 + Math.random() * 3300;
        this.type = type;
        this.speed = 0.5 + Math.random() * 2;
        allSounds[4].volume = 0.35;
    }


    /**
     * Sets up small chicken's properties.
     */
    setUpSmallChicken() {
        if (this.isSmall()) {
            this.height = 50;
            this.width = 50;
            this.speed = this.speed + Math.random() * 5;
            this.y = 370;
        }
    }


    /**
     * Picks the image to be shown first, depending on the chicken's type.
     * @returns - First element of an array.
     */
    pickImage() {
        if (this.isNormal()) {
            return this.IMAGES_WALKING_NORMAL[0];
        } else if (this.isSmall()) {
            return this.IMAGES_WALKING_SMALL[0];
        }
    }


    /**
     * @returns - Condition when checking if chicken is small.
     */
    isSmall() {
        return this.type === 'small';
    }


    /**
     * @returns - Condition when checking if chicken is normal.
     */
    isNormal() {
        return this.type === 'normal';
    }


    /**
     * Starts animating chicken.
     */
    animate() {
        setStoppableInterval(() => this.moveChicken(), 1000 / 60);
        setStoppableInterval(() => this.playChicken(), 200);
    }


    /**
     * Moves chicken to left.
     */
    moveChicken() {
        if (gameRunning)
            this.moveLeft();
    }


    /**
     * Plays moving animation depending on chicken's type.
     */
    playChicken() {
        if (gameRunning) {
            if (this.isNormal()) {
                this.playNormalChicken();
            } else if (this.isSmall()) {
                this.playSmallChicken();
            }
        }
    }


    /**
     * Plays moving animation for chicken which has the type "normal".
     */
    playNormalChicken() {
        if (this.isDead()) {
            this.playNormalDead();
        } else
            this.playAnimation(this.IMAGES_WALKING_NORMAL);
    }


    /**
     * Plays death animation for chicken which has the type "normal".
     */
    playNormalDead() {
        this.playAnimation(this.IMAGES_DEAD_NORMAL);
        this.speed = 0;
        this.despawnChicken();
    }


    /**
     * Plays moving animation for chicken which has the type "small".
     */
    playSmallChicken() {
        if (this.isDead()) {
            this.playSmallDead();
        } else
            this.playAnimation(this.IMAGES_WALKING_SMALL);
    }


    /**
     * Plays death animation for chicken which has the type "small".
     */
    playSmallDead() {
        this.playAnimation(this.IMAGES_DEAD_SMALL);
        this.speed = 0;
        this.despawnChicken();
    }


    /**
     * Despawns dead chickens's corbse.
     */
    despawnChicken() {
        setTimeout(() => {
            this.height = 0;
            this.width = 0;
        }, 5000)
    }


    /**
     * Periodically spanws a chicken which has the type "normal".
     */
    spawnNormalChicken() {
        setStoppableInterval(() => {
            if (gameRunning) {
                let chicken = new Chicken('normal');
                this.world.level.enemies.push(chicken);
            }
        }, 5000);
    }


    /**
     * Periodically spanws a chicken which has the type "small".
     */
    spawnSmallChicken() {
        setStoppableInterval(() => {
            if (gameRunning) {
                let chicken = new Chicken('small');
                this.world.level.enemies.push(chicken);
            }
        }, 7500);
    }
}