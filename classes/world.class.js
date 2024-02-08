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
    endbossActive;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }


    /**
     * Connects certain objects with this one.
     */
    setWorld() {
        this.character.world = this;
        this.collectableObject.world = this;
        this.chicken.world = this;
        this.endboss.world = this;
    }


    /**
     * Starts all necessary intervals.
     */
    run() {
        setStoppableInterval(() => this.checkCollissions(), 1000 / 60);
        setStoppableInterval(() => this.checkThrownObjects(), 100);
        setStoppableInterval(() => this.activateEndboss(), 100);
        this.collectableObject.checkCollectables();
        this.collectableObject.spawnCollectableObjects();
        this.chicken.spawnNormalChicken();
        this.chicken.spawnSmallChicken();
    }


    /**
     * Check if character is colliding with enemy.
     */
    checkCollissions() {
        if (gameRunning) {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy) && enemy.healthPoints > 0) {
                    if (this.isOnChicken(enemy)) {
                        this.jumpedOnEnemy(enemy);
                    } else {
                        this.characterGotHit();
                    }
                }
            });
        }
    }


    /**
     * Reduces character's healthpoints and plays hurt sound.
     */
    characterGotHit() {
        this.character.hit(1);
        allSounds[2].play();
        this.healthBar.percentage = this.character.healthPoints;
        this.healthBar.setPercentage();
    }


    /**
     * Kills enemy if character jumps on it.
     * @param {object} enemy - Either small or big chicken.
     */
    jumpedOnEnemy(enemy) {
        enemy.healthPoints = 0;
        allSounds[4].play();
        this.character.jump();
        allSounds[1].play();
    }


    /**
     * @param {object} enemy - Either small or big chicken.
     * @returns - Condition when checking if character has jumped on a chicken.
     */
    isOnChicken(enemy) {
        return this.character.isAboveGround() && this.character.speed_y <= 0 && enemy.type;
    }


    /**
     * Update the thrown objects and it's according status bar's properties.
     */
    checkThrownObjects() {
        if (this.isThrowing()) {
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
    }


    /**
     * @returns - Condition when checking if character is throwing a bottle.
     */
    isThrowing() {
        return gameRunning && this.keyboard.SHIFT && this.collectableObject.bottleAmount > 0 && this.throwDelay === false;
    }


    /**
     * Periodically checks if thrown bottle hit an enemy.
     * @param {object} bottle - Thrown bottle.
     */
    checkIfBottleHit(bottle) {
        this.level.enemies.forEach((enemy) => {
            if (bottle.isColliding(enemy) && !this.collisionStatus) {
                if (enemy.type) {
                    allSounds[4].play();
                    enemy.hit(100);
                } else {
                    this.endbossGotHit();
                }
            }
        });
        requestAnimationFrame(() => this.checkIfBottleHit(bottle));
    }


    /**
     * Reduces endboss's healthpoints and updates it's status bar.
     */
    endbossGotHit() {
        this.endboss.hit(20);
        this.endbossBar.percentage = this.endboss.healthPoints;
        this.endbossBar.setPercentage();
        this.collisionStatus = true;
    }


    /**
     * Draw any object on canvas multiple times a second to create a fluid motion.
     */
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
        this.drawHud();
        this.ctx.translate(-this.camera_x, 0);
        requestAnimationFrame(() => this.draw());
    }


    /**
     * Draws the hud on the map.
     */
    drawHud() {
        this.addToMap(this.healthBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.endbossBar);
        this.ctx.translate(this.camera_x, 0);
    }


    /**
     * Iterates through array containing objects.
     * @param {array} objects - Multiple objects to be drawn on the map.
     */
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }


    /**
     * Draws an object on the map.
     * @param {object} mo - Objects to be drawn on the map.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    /**
     * Flips the image on the y-axis if character walks towards left.
     * @param {object} mo - Character.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * - 1;
    }


    /**
     * Flips the image to default if character walks towards right.
     * @param {object} mo - Character.
     */
    flipImageBack(mo) {
        mo.x = mo.x * - 1;
        this.ctx.restore();
    }


    /**
     * Activates endboss when character reaches a certain place on the map.
     */
    activateEndboss() {
        if (gameRunning && this.character.x >= 3000 && !this.endbossActive) {
            this.level.enemies.push(this.endboss);
            let index = this.level.enemies.indexOf(this.endboss);
            this.level.enemies[index].animate();
            this.endbossActive = true;
        }
    }
}