class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    healthBar = new StatusBar('HEALTH', 100, 20);
    bottleBar = new StatusBar('BOTTLE', 0, 70);
    coinBar = new StatusBar('COIN', 0, 120);
    throwableObject = new ThrowableObject();
    collectableObject = new CollectableObject();
    chicken = new Chicken();
    endboss = new Endboss();
    endbossBar = new StatusBar('ENDBOSS', 100, 170);


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }


    setWorld() {
        this.character.world = this;
        this.collectableObject.world = this;
        this.throwableObject.world = this;
        this.chicken.world = this;
        this.endboss.world = this;
    }


    run() {
        this.checkCollissions();
        this.throwableObject.checkThrownObjects();
        this.collectableObject.checkCollectables();
        this.activateEndboss();
        this.collectableObject.spawnBottle();
        this.collectableObject.spanwCoin();
        this.chicken.spawnNormalChicken();
        this.chicken.spawnSmallChicken();
    }


    checkCollissions() {
        setStoppableInterval(() => {
            if (gameRunning) {
                this.level.enemies.forEach((enemy) => {
                    if (this.character.isColliding(enemy) && enemy.healthPoints > 0) {
                        if (this.character.isAboveGround() && this.character.speed_y <= 0 && enemy.type) {
                            enemy.healthPoints = 0;
                            this.chicken.chickenHurt_sound.play();
                            this.character.jump();
                            this.character.jump_sound.play();
                        } else {
                            this.character.hit(5);
                            this.character.hurt_sound.play();
                            this.healthBar.percentage = this.character.healthPoints;
                            this.healthBar.setPercentage();
                        }
                    }
                });
            }
        }, 100);
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.throwableObjects);
        this.addObjectsToMap(this.level.collectableObjects);
        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);
        // HUD starts here
        this.addToMap(this.healthBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.endbossBar);
        this.ctx.translate(this.camera_x, 0);
        // HUD ends here
        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }


    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * - 1;
    }


    flipImageBack(mo) {
        mo.x = mo.x * - 1;
        this.ctx.restore();
    }


    activateEndboss() {
        setStoppableInterval(() => {
            if (gameRunning && this.character.x >= 3000) {
                this.level.enemies.push(this.endboss);
            }
        }, 100);
    }
}