class CollectableObject extends DrawableObject{
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
    collectBottle_sound = new Audio('audio/collect-bottle.mp3');
    collectCoin_sound = new Audio('audio/collect-coin.mp3');
    bottleAmount = 100;
    coinAmount = 0;
    type;
    world;


    constructor(image, type) {
        super();
        this.x = 100 + Math.random() * 3500;
        this.type = type;
        this.setUpCoin();
        this.loadImage(this.pickImage(image));
    }


    pickImage(image) {
        if (this.type === 'bottle') {
            if (image === 'left') {
                return this.IMAGES_BOTTLE_ON_GROUND[0];
            } else {
                return this.IMAGES_BOTTLE_ON_GROUND[1];
            }
        } if (this.type === 'coin') {
            if (image === 'small') {
                return this.IMAGES_COIN[0];
            } else {
                return this.IMAGES_COIN[1];
            }
        }
    }


    setUpCoin() {
        if (this.type === 'coin') {
            this.y = 335 - Math.random() * 250;
            this.width = 150;
            this.height = 150;
        }
        this.collectCoin_sound.volume = 0.25;
    }


    checkCollectables() {
        this.world.level.collectableObjects.forEach((co) => {
            if (this.world.character.isColliding(co) && co.type === 'bottle' && this.bottleAmount < 100) {
                this.collectBottle(co);
            } else if (this.world.character.isColliding(co) && co.type === 'coin' && this.coinAmount < 100) {
                this.collectCoin(co);
            }
        })
    }


    spawnBottle() {
        setInterval(() => {
            if (this.bottleAmount < 100) {
                this.type = 'bottle'
                if (this.world.level.collectableObjects.currentBottle === 'left') {
                    let bottle = new CollectableObject('right', 'bottle');
                    this.world.level.collectableObjects.push(bottle);
                    this.world.level.collectableObjects.currentBottle = 'right';
                } else {
                    let bottle = new CollectableObject('left', 'bottle');
                    this.world.level.collectableObjects.push(bottle);
                    this.world.level.collectableObjects.currentBottle = 'left';
                }
            }
        }, 4000);
    }


    collectBottle(co) {
        let index = this.world.level.collectableObjects.indexOf(co);
        this.world.level.collectableObjects.splice(index, 1);
        this.bottleAmount += 10;
        this.collectBottle_sound.play();
        this.world.bottleBar.percentage = this.bottleAmount;
        this.world.bottleBar.setPercentage();
    }


    spanwCoin() {
        setInterval(() => {
            if (this.coinAmount < 100) {
                this.type = 'coin'
                if (this.world.level.collectableObjects.currentCoin === 'small') {
                    let coin = new CollectableObject('big', 'coin');
                    this.world.level.collectableObjects.push(coin);
                    this.world.level.collectableObjects.currentCoin = 'big';
                } else {
                    let coin = new CollectableObject('small', 'coin');
                    this.world.level.collectableObjects.push(coin);
                    this.world.level.collectableObjects.currentCoin = 'small';
                }
            }
        }, 5000);
    }


    collectCoin(co) {
        let index = this.world.level.collectableObjects.indexOf(co);
        this.world.level.collectableObjects.splice(index, 1);
        this.coinAmount += 10;
        this.collectCoin_sound.play();
        this.world.coinBar.percentage = this.coinAmount;
        this.world.coinBar.setPercentage();
    }


    reduceBottleAmount() {
        this.bottleAmount -= 10;
        if (this.bottleAmount < 0) {
            this.bottleAmount = 0
        }
    }
}