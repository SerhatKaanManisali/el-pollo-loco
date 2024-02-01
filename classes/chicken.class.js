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
    chickenHurt_sound = new Audio ('audio/chicken-hurt.mp3');


    constructor(type) {
        super();
        this.x = 700 + Math.random() * 3300;
        this.type = type;
        this.speed = 0.5 + Math.random() * 2;
        this.chickenHurt_sound.volume = 0.35;
        this.loadImages(this.IMAGES_WALKING_NORMAL);
        this.loadImages(this.IMAGES_DEAD_NORMAL);
        this.loadImages(this.IMAGES_WALKING_SMALL);
        this.loadImages(this.IMAGES_DEAD_SMALL);
        this.loadImage(this.pickImage());
        this.setUpChicken();
        this.animate();
    }


    setUpChicken() {
        if (this.type === 'small') {
            this.height = 50;
            this.width = 50;
            this.speed = this.speed + Math.random() * 5;
            this.y = 370;
        }
    }


    pickImage() {
        if (this.type === 'normal') {
            return this.IMAGES_WALKING_NORMAL[0];
        } else if (this.type === 'small') {
            return this.IMAGES_WALKING_SMALL[0];
        }
    }


    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            if (this.type === 'normal') {
                if (this.isDead()) {
                    this.playAnimation(this.IMAGES_DEAD_NORMAL);
                    this.speed = 0;
                    setTimeout(() => {
                        this.height = 0;
                        this.width = 0;
                    }, 5000)
                } else
                    this.playAnimation(this.IMAGES_WALKING_NORMAL);
            } else if (this.type === 'small') {
                if (this.isDead()) {
                    this.playAnimation(this.IMAGES_DEAD_SMALL);
                    this.speed = 0;
                    setTimeout(() => {
                        this.height = 0;
                        this.width = 0;
                    }, 5000)
                } else
                    this.playAnimation(this.IMAGES_WALKING_SMALL);
            }
        }, 200);
    }


    spawnChicken() {
        setInterval(() => {
            let chicken = new Chicken('normal');
            this.world.level.enemies.push(chicken);
        }, 5000);
        setInterval(() => {
            let chicken = new Chicken('small');
            this.world.level.enemies.push(chicken);
        }, 7500);
    }
}