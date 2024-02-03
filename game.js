let canvas;
let world;
let keyboard = new Keyboard();
let gameRunning = false;
let fullscreen = false;



function init() {
    canvas = document.getElementById('canvas');
}



function startGame() {
    initLevel();
    world = new World(canvas, keyboard);
    toggleClass('start-screen', 'hide');
    gameRunning = true;
}



function toggleClass(id, className) {
    let element = document.getElementById(id);
    element.classList.toggle(className);
}



function toggleSound() {
    let soundIcon = document.getElementById('sound-icon');
    if (soundIcon.src === `${getProtocol()}//${getHost()}/img/ui/sound-on.png`) {
        changeSrc('sound-icon', 'img/ui/sound-off.png');
    } else {
        changeSrc('sound-icon', 'img/ui/sound-on.png');
    }
}



function toggleFullscreen() {
    if (fullscreen === false) {
        openFullscreen();
    } else {
        closeFullscreen();
    }
}



function openFullscreen() {
    let gameBox = document.getElementById('game-box');
    if (gameBox.requestFullscreen) {
        gameBox.requestFullscreen();
    } else if (gameBox.webkitRequestFullscreen) { /* Safari */
        gameBox.webkitRequestFullscreen();
    } else if (gameBox.msRequestFullscreen) { /* IE11 */
        gameBox.msRequestFullscreen();
    }
    fullscreen = true;
    changeSrc('fullscreen-icon', 'img/ui/fullscreen-exit.png');
    adjustCanvas();
}



function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
    fullscreen = false;
    changeSrc('fullscreen-icon', 'img/ui/fullscreen-enter.png');
}



function adjustCanvas() {
    canvas.style.width = '100%'
    canvas.style.height = '100%'
}



function changeSrc(id, path) {
    let img = document.getElementById(id);
    img.src = path;
}



/**
 * Identifies the protocol method of the current site.
 * @returns The protocol method as a string.
 */
function getProtocol() {
    let protocol = window.location.protocol;
    return protocol;
}


/**
 * Identifies the host of the current site.
 * @returns The host as a string.
 */
function getHost() {
    let host = window.location.host;
    return host;
}



window.addEventListener('keydown', (event) => {
    if (event.keyCode == 37 || event.keyCode == 65) {
        keyboard.LEFT = true;
    }

    if (event.keyCode == 38 || event.keyCode == 87) {
        keyboard.UP = true;
    }

    if (event.keyCode == 39 || event.keyCode == 68) {
        keyboard.RIGHT = true;
    }

    if (event.keyCode == 40 || event.keyCode == 83) {
        keyboard.DOWN = true;
    }

    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (event.keyCode == 16) {
        keyboard.SHIFT = true;
    }
});


window.addEventListener('keyup', (event) => {
    if (event.keyCode == 37 || event.keyCode == 65) {
        keyboard.LEFT = false;
    }

    if (event.keyCode == 38 || event.keyCode == 87) {
        keyboard.UP = false;
    }

    if (event.keyCode == 39 || event.keyCode == 68) {
        keyboard.RIGHT = false;
    }

    if (event.keyCode == 40 || event.keyCode == 83) {
        keyboard.DOWN = false;
    }

    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (event.keyCode == 16) {
        keyboard.SHIFT = false;
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