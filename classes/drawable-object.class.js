class DrawableObject {
    img;
    imageCache = {};
    currentIamge = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;


    /**
     * Creates an image object.
     * @param {string} path - Image path to be loaded.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    /**
     * Sets up images for draw method.
     * @param {array} array - Array containing image paths.
     */
    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    /**
     * Draws image on canvas
     * @param {CanvasRenderingContext2D} ctx
     */
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch(e) {
            console.log(this.img)
        }
    }
}