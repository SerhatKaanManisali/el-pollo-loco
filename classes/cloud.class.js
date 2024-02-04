class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 250;
    

    constructor() {
    super().loadImage('img/5_background/layers/4_clouds/1.png');
    this.x = Math.random() * 3000 - 1;
    this.animate();
    }
    

    animate() {
        setStoppableInterval(() => {
            if (gameRunning) {
                this.moveLeft();
            }
        }, 1000 / 60);
    }
}