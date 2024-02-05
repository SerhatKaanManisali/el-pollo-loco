let canvas;
let world;
let keyboard = new Keyboard();
let gameRunning = false;
let startscreen = true;
let fullscreen = false;
let sound = true;
let allIntervals = [];



function init() {
    canvas = document.getElementById('canvas');
}



function toggleGame() {
    if (!gameRunning && startscreen) {
        startGame();
        changeSrc('play-icon', 'img/ui/pause-icon.png');
        changeTitle('play-icon', 'Pause');
    } else if (gameRunning && world.character.healthPoints >= 0 || gameRunning && world.endboss.healthPoints >= 0) {
        gameRunning = false;
        changeSrc('play-icon', 'img/ui/play-icon.png');
        changeTitle('play-icon', 'Play');
        toggleClass('pause-screen', 'hide');
    } else if (!gameRunning && world.character.healthPoints >= 0 || !gameRunning && world.endboss.healthPoints >= 0) { 
        gameRunning = true;
        changeSrc('play-icon', 'img/ui/pause-icon.png');
        changeTitle('play-icon', 'Pause');
        toggleClass('pause-screen', 'hide');
    } else {
        stopGame();
    }
}



function startGame() {
    initLevel();
    world = new World(canvas, keyboard);
    gameRunning = true;
    startscreen = false;
    let startSrc = document.getElementById('start-screen');
    let endScr = document.getElementById('end-screen');
    if (!startSrc.classList.contains('hide')) {
        toggleClass('start-screen', 'hide');
    }
    if (!endScr.classList.contains('hide')) {
        toggleClass('end-screen', 'hide');
    }
}



function stopGame() {
    if (world.character.healthPoints === 0 || world.endboss.healthPoints === 0) {
        changeSrc('play-icon', 'img/ui/replay-icon.png');
        changeTitle('play-icon', 'Play again');
    } else {
        changeSrc('play-icon', 'img/ui/play-icon.png');
        changeTitle('play-icon', 'Play');
    }
    toggleClass('end-screen', 'hide');
    gameRunning = false;
    startscreen = true;
    allIntervals.forEach(clearInterval);
}



function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    allIntervals.push(id);
}



function toggleClass(id, className) {
    let element = document.getElementById(id);
    element.classList.toggle(className);
}



function toggleSound() {
    if (sound === true) {
        changeSrc('sound-icon', 'img/ui/sound-off.png');
        changeTitle('sound-icon', 'Sound off');
        sound = false;
    } else {
        changeSrc('sound-icon', 'img/ui/sound-on.png');
        changeTitle('sound-icon', 'Sound on');
    }
}



function toggleFullscreen() {
    if (fullscreen === false) {
        openFullscreen();
        changeSrc('fullscreen-icon', 'img/ui/fullscreen-exit.png');
        changeTitle('fullscreen-icon', 'Exit fullscreen');
    } else {
        closeFullscreen();
        changeSrc('fullscreen-icon', 'img/ui/fullscreen-enter.png');
        changeTitle('fullscreen-icon', 'Enter fullscreen');
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
}



function changeSrc(id, path) {
    let img = document.getElementById(id);
    img.src = path;
}



function changeTitle(id, name) {
    let element = document.getElementById(id);
    element.title = name;
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