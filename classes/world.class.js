class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    healthBar = new StatusBar('HEALTH', 100, 0);
    bottleBar = new StatusBar('BOTTLE', 0, 50);
    coinBar = new StatusBar('COIN', 0, 100);
    collectableObject = new CollectableObject();
    chicken = new Chicken();
    endboss = new Endboss();
    endbossBar = new StatusBar('ENDBOSS', 100, 150);
    throwDelay = false;
    collisionStatus = false;


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
        this.chicken.world = this;
        this.endboss.world = this;
    }


    run() {
        this.checkCollissions();
        this.checkThrownObjects();
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
                            allSounds[4].play();
                            this.character.jump();
                            allSounds[1].play();
                        } else {
                            this.character.hit(1);
                            allSounds[2].play();
                            this.healthBar.percentage = this.character.healthPoints;
                            this.healthBar.setPercentage();
                        }
                    }
                });
            }
        }, 1000 / 60);
    }


    checkThrownObjects() {
        setStoppableInterval(() => {
            if (gameRunning && this.keyboard.SHIFT && this.collectableObject.bottleAmount > 0 && this.throwDelay === false) {
                this.throwDelay = true;
                this.collisionStatus = false;
                let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 100);
                this.level.throwableObjects.push(bottle);
                this.collectableObject.reduceBottleAmount();
                this.bottleBar.percentage = this.collectableObject.bottleAmount;
                this.bottleBar.setPercentage();
                this.checkIfBottleHit(bottle);
                setTimeout(() => {
                    this.throwDelay = false;
                }, 1000);
            }
        }, 100);
    }


    checkIfBottleHit(bottle) {
        this.level.enemies.forEach((enemy) => {
            if (bottle.isColliding(enemy) && !this.collisionStatus) {
                if (enemy.type) {
                    allSounds[4].play();
                    enemy.hit(100);
                } else {
                    this.endboss.hit(20);
                    this.endbossBar.percentage = this.endboss.healthPoints;
                    this.endbossBar.setPercentage();
                    this.collisionStatus = true;
                }
            }
        });
        requestAnimationFrame(() => this.checkIfBottleHit(bottle));
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