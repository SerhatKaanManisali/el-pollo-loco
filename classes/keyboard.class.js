class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    SHIFT = false;


    constructor() {
        this.bindKeyPressEvents();
    }


    /**
     * Detects which key has been pressed on the keyboard.
     */
    bindKeyPressEvents() {
        window.addEventListener('keydown', (event) => {
            if (event.keyCode == 37 || event.keyCode == 65) {
                this.LEFT = true;
            }
        
            if (event.keyCode == 38 || event.keyCode == 87) {
                this.UP = true;
            }
        
            if (event.keyCode == 39 || event.keyCode == 68) {
                this.RIGHT = true;
            }
        
            if (event.keyCode == 40 || event.keyCode == 83) {
                this.DOWN = true;
            }
        
            if (event.keyCode == 32) {
                this.SPACE = true;
            }
        
            if (event.keyCode == 16) {
                this.SHIFT = true;
            }
        });
        
        
        window.addEventListener('keyup', (event) => {
            if (event.keyCode == 37 || event.keyCode == 65) {
                this.LEFT = false;
            }
        
            if (event.keyCode == 38 || event.keyCode == 87) {
                this.UP = false;
            }
        
            if (event.keyCode == 39 || event.keyCode == 68) {
                this.RIGHT = false;
            }
        
            if (event.keyCode == 40 || event.keyCode == 83) {
                this.DOWN = false;
            }
        
            if (event.keyCode == 32) {
                this.SPACE = false;
            }
        
            if (event.keyCode == 16) {
                this.SHIFT = false;
            }
        
            if (event.keyCode == 70) {
                toggleFullscreen();
            }
        
            if (event.keyCode == 77) {
                toggleSound();
            }
        
            if (event.keyCode == 67) {
                toggleControls();
            }
        });
    }


    /**
     * Detects which button has been pressed on the mobile device.
     */
    bindButtonPressEvents() {
        document.getElementById('move-left-button').addEventListener('touchstart', (event) => {
            event.preventDefault();
            this.LEFT = true;
        });
        document.getElementById('move-left-button').addEventListener('touchend', (event) => {
            event.preventDefault();
            this.LEFT = false;
        });
    
        document.getElementById('move-right-button').addEventListener('touchstart', (event) => {
            event.preventDefault();
            this.RIGHT = true;
        });
        document.getElementById('move-right-button').addEventListener('touchend', (event) => {
            event.preventDefault();
            this.RIGHT = false;
        });
        document.getElementById('jump-button').addEventListener('touchstart', (event) => {
            event.preventDefault();
            this.SPACE = true;
        });
        document.getElementById('jump-button').addEventListener('touchend', (event) => {
            event.preventDefault();
            this.SPACE = false;
        });
        document.getElementById('throw-button').addEventListener('touchstart', (event) => {
            event.preventDefault();
            this.SHIFT = true;
        });
        document.getElementById('throw-button').addEventListener('touchend', (event) => {
            event.preventDefault();
            this.SHIFT = false;
        });
    }
}