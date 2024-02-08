class StatusBar extends DrawableObject {
    array;
    percentage;
    name;
    IMAGES_BOTTLE = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ];
    IMAGES_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];
    IMAGES_COIN = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];
    IMAGES_ENDBOSS = [
        'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange100.png'
    ]


    constructor(name, percentage, y) {
        super();
        this.name = name;
        this.chooseArray(name);
        this.setUpStatusBar(percentage, y);
    }


    /**
     * Chooses the array of images depending on which status bar is going to be drawn.
     */
    chooseArray() {
        if (this.isHealth()) {
            this.array = this.IMAGES_HEALTH;
        } else if (this.isBottle()) {
            this.array = this.IMAGES_BOTTLE;
        } else if (this.isCoin()) {
            this.array = this.IMAGES_COIN;
        } else if (this.isEndboss()) {
            this.array = this.IMAGES_ENDBOSS;
        }
    }


    /**
     * @returns - Condition when checking statusbar's type.
     */
    isHealth() {
        return this.name === 'HEALTH';
    }


    /**
     * @returns - Condition when checking status bar's type.
     */
    isBottle() {
        return this.name === 'BOTTLE';
    }


    /**
     * @returns - Condition when checking status bar's type.
     */
    isCoin() {
        return this.name === 'COIN';
    }


    /**
     * @returns - Condition when checking status bar's type.
     */
    isEndboss() {
        return this.name === 'ENDBOSS'
    }


    /**
     * Sets up the status bar's properties.
     * @param {string} name - Status bar's type.
     * @param {number} percentage - Indicates what percentage of the status bar is filled.
     * @param {number} y - Status bar's y coordinate
     */
    setUpStatusBar(percentage, y) {
        this.loadImages(this.array);
        this.x = 10;
        this.y = y;
        this.width = 200;
        this.height = 60;
        this.percentage = percentage;
        this.setPercentage();
    }


    /**
     * Updates the Status bar's percentage.
     */
    setPercentage() {
        let path = this.array[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    /**
     * Decides which image in the array to draw.
     * @returns Index for the array containing images for the status bar.
     */
    resolveImageIndex() {
        if (this.percentage === 100) {
            return 5
        } else if (this.percentage >= 80) {
            return 4
        } else if (this.percentage >= 60) {
            return 3
        } else if (this.percentage >= 40) {
            return 2
        } else if (this.percentage >= 20) {
            return 1
        } else {
            return 0
        }
    }
}