class CollectableObject extends DrawableObject {
    IMAGES_BOTTLE_ON_GROUND = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];
    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];
    height = 100;
    width = 80;
    y = 335;
    coinAmount = 0;
    bottleAmount = 0;
    type;
    world;
    image;


    constructor(image, type) {
        super();
        this.setUpProperties(image, type);
        this.setUpCoin();
        this.loadImage(this.pickImage());
    }


    /**
     * Sets up collectable object's properties. 
     * @param {string} image - Type of 
     * @param {string} type - Type of collectable object, which is supposed to spawn.
     */
    setUpProperties(image, type) {
        this.x = 100 + Math.random() * 2500;
        this.type = type;
        this.image = image;
    }


    /**
     * Sets up properties for coin, if collectable object's type is "coin".
     */
    setUpCoin() {
        allSounds[6].volume = 0.25;
        if (this.isCoin()) {
            this.y = 335 - Math.random() * 250;
            this.width = 150;
            this.height = 150;
        }
    }


    /**
     * @returns - Condition when checking if collectable object is a coin.
     */
    isCoin() {
        return this.type === 'coin';
    }


    /**
     * @returns - Condition when checking if collectable object is a bottle.
     */
    isBottle() {
        return this.type === 'bottle';
    }


    /**
     * @returns - Condition when checking if bottle is leaning towards left.
     */
    isLeft() {
        return this.image === 'left';
    }


    /**
     * @returns - Condition when checking if coin is small.
     */
    isSmall() {
        return this.image === 'small'
    }


    /**
     * @returns - Image's path depending on collectable object's type.
     */
    pickImage() {
        if (this.isBottle())
            return this.pickBottleImage();
        else if (this.isCoin())
            return this.pickCoinImage();
    }


    /**
     * @returns - Image's path depending on coin's size.
     */
    pickCoinImage() {
        if (this.isSmall()) {
            return this.IMAGES_COIN[0];
        } else {
            return this.IMAGES_COIN[1];
        }
    }


    /**
     * @returns - Image's path depending on which site bottle is leaning towards. 
     */
    pickBottleImage() {
        if (this.isLeft()) {
            return this.IMAGES_BOTTLE_ON_GROUND[0];
        } else {
            return this.IMAGES_BOTTLE_ON_GROUND[1];
        }
    }


    /**
     * Periodically checks interactions with collectable objects.
     */
    checkCollectables() {
        setStoppableInterval(() => this.chekIfCollecting(), 100);
    }


    /**
     * Checks if character is collecting collectable objects.
     */
    chekIfCollecting() {
        if (gameRunning) {
            this.world.level.collectableObjects.forEach((co) => {
                if (this.isCollectingBottle(co))
                    this.collectBottle(co);
                else if (this.isCollectingCoin(co))
                    this.collectCoin(co);
            });
        };
    }


    /**
     * @returns - Condition when checking if character is collecting bottle.
     */
    isCollectingBottle(co) {
        return this.world.character.isColliding(co) && co.isBottle() && this.bottleAmount < 100;
    }


    /**
     * @returns - Condition when checking if character is collecting coin.
     */
    isCollectingCoin(co) {
        return this.world.character.isColliding(co) && co.type === 'coin' && this.coinAmount < 100;
    }


    /**
     * Periodically spawns collectable objects.
     */
    spawnCollectableObjects() {
        setStoppableInterval(() => this.spawnBottle(), 4000);
        setStoppableInterval(() => this.spanwCoin(), 5000);
    }


    /**
     * Periodically spawns bottles on the ground.
     */
    spawnBottle() {
        if (gameRunning && this.bottleAmount < 100) {
            this.type = 'bottle'
            if (this.isLastLeft()) {
                this.addBottleToLevel('right');
            } else {
                this.addBottleToLevel('left');
            }
        }
    }


    /**
     * Periodically spawns coins.
     */
    spanwCoin() {
        if (gameRunning && this.coinAmount < 100) {
            this.type = 'coin'
            if (this.isLastSmall()) {
                this.addCoinToLevel('big');
            } else {
                this.addCoinToLevel('small')
            }
        }
    }


    /**
     * Adds bottle to level by pushing it into it's according array.
     * @param {string} property - Either "left" or "right".
     */
    addBottleToLevel(property) {
        let bottle = new CollectableObject(property, this.type);
        this.world.level.collectableObjects.push(bottle);
        this.world.level.collectableObjects.currentBottle = property;
    }


    /**
     * Adds coin to level by pushing it into it's according array.
     * @param {string} property - Either "small" or "big"
     */
    addCoinToLevel(property) {
        let coin = new CollectableObject(property, this.type);
        this.world.level.collectableObjects.push(coin);
        this.world.level.collectableObjects.currentCoin = property;
    }


    /**
     * @returns - Condition when checking if last bottle was leaning towards left.
     */
    isLastLeft() {
        return this.world.level.collectableObjects.currentBottle === 'left'
    }


    /**
     * @returns - Condition when checking if last coin was small.
     */
    isLastSmall() {
        return this.world.level.collectableObjects.currentCoin === 'small'
    }


    /**
     * Collects the bottle on the map by splicing it from it's according array.
     * @param {object} co - Collectable object on the map (bottle).
     */
    collectBottle(co) {
        let index = this.world.level.collectableObjects.indexOf(co);
        this.world.level.collectableObjects.splice(index, 1);
        this.bottleAmount += 10;
        allSounds[5].play();
        this.world.bottleBar.percentage = this.bottleAmount;
        this.world.bottleBar.setPercentage();
    }


    /**
     * Collets coin on the map by splicing it from it's according array.
     * @param {object} co - Collectable object on the map (coin).
     */
    collectCoin(co) {
        let index = this.world.level.collectableObjects.indexOf(co);
        this.world.level.collectableObjects.splice(index, 1);
        this.coinAmount += 10;
        allSounds[6].play();
        this.world.coinBar.percentage = this.coinAmount;
        this.world.coinBar.setPercentage();
    }


    /**
     * Reduces the amount of bottles the character has.
     */
    reduceBottleAmount() {
        this.bottleAmount -= 10;
        if (this.bottleAmount < 0) {
            this.bottleAmount = 0
        }
    }
}