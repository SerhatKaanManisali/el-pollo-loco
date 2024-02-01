class DrawableObject {
    img;
    imageCache = {};
    currentIamge = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch(e) {
            console.log(this.img)
        }
    }


    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof ThrowableObject || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
}