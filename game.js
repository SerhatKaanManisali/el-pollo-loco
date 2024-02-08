let canvas;
let world;
let keyboard = new Keyboard();
let gameRunning = false;
let startscreen = true;
let fullscreen = false;
let sound = true;
let allIntervals = [];


/**
 * Initializes certain function when HTML body has loaded.
 */
function init() {
    canvas = document.getElementById('canvas');
    checkScreenOrientation();
    keyboard.bindButtonPressEvents();
}


/**
 * Once HTML body has loaded, checks if mobile device is being held in portrait or landscape mode.
 */
function checkScreenOrientation() {
    if (window.innerWidth <= 720 && screen.orientation.type === 'portrait-primary') {
        toggleClass('rotate-smartphone', 'hide');
    }
}


/**
 * Either starts, pauses, resumes or fully stops game depending on game state. 
 */
function toggleGame() {
    if (!gameRunning && startscreen) {
        startGame();
    } else if (gameRunning && world.character.healthPoints >= 0 || gameRunning && world.endboss.healthPoints >= 0) {
        pauseGame();
    } else if (!gameRunning && world.character.healthPoints >= 0 || !gameRunning && world.endboss.healthPoints >= 0) {
        resumeGame();
    } else {
        stopGame();
    }
}


/**
 * Sets up world and starts game.
 */
function startGame() {
    initLevel();
    world = new World(canvas, keyboard);
    gameRunning = true;
    startscreen = false;
    displayGameScreen();
    displayMobileButtons();
    changeTitle('play-icon', 'P = Pause');
    changeSrc('play-icon', 'img/ui/pause-icon.png');
    setUpBackgroundMusic();
}


/**
 * Pauses game.
 */
function pauseGame() {
    gameRunning = false;
    changeSrc('play-icon', 'img/ui/play-icon.png');
    changeTitle('play-icon', 'P = Play');
    toggleClass('pause-screen', 'hide');
    muteSound();
}


/**
 * Resumes game.
 */
function resumeGame() {
    gameRunning = true;
    changeSrc('play-icon', 'img/ui/pause-icon.png');
    changeTitle('play-icon', 'P = Pause');
    toggleClass('pause-screen', 'hide');
    unmuteSound();
}


/**
 * Fully stops game by clearing all intervals.
 */
function stopGame() {
    displayReplayIcon();
    toggleClass('end-screen', 'hide');
    gameRunning = false;
    startscreen = true;
    allIntervals.forEach(clearInterval);
}


/**
 * Either displays start or endscreen depending on game state.
 */
function displayGameScreen() {
    let startSrc = document.getElementById('start-screen');
    let endScr = document.getElementById('end-screen');
    if (!startSrc.classList.contains('hide')) {
        toggleClass('start-screen', 'hide');
    }
    if (!endScr.classList.contains('hide')) {
        toggleClass('end-screen', 'hide');
    }
}


/**
 * Replaces play button with replay button once game has fully stopped.
 */
function displayReplayIcon() {
    if (world.character.healthPoints === 0 || world.endboss.healthPoints === 0) {
        changeSrc('play-icon', 'img/ui/replay-icon.png');
        changeTitle('play-icon', 'P = Play again');
    } else {
        changeSrc('play-icon', 'img/ui/play-icon.png');
        changeTitle('play-icon', 'P = Play');
    }
}


/**
 * Displays controls for mobile devices once game has started.
 */
function displayMobileButtons() {
    let mobileButtons = document.getElementById('mobile-buttons');
    if (mobileButtons.classList.contains('hide')) {
        toggleClass('mobile-buttons', 'hide');
    }
}


/**
 * Starts and adjusts background music when game is running.
 */
function setUpBackgroundMusic() {
    allSounds[12].volume = 0.025;
    allSounds[12].play();
    allSounds[12].loop = true;
}


/**
 * Pushes functions in array so they can be stopped easier later on.
 * @param {function} fn - Interval's function.
 * @param {number} frequency - Interval's frequency in milliseconds.
 */
function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    allIntervals.push(id);
}


/**
 * Toggles an element's class.
 * @param {string} id - Id of the element whose class is to be toggled
 * @param {*} className - Name of the class to be toggled.
 */
function toggleClass(id, className) {
    let element = document.getElementById(id);
    element.classList.toggle(className);
}


/**
 * Toggles sound volume (Either on or off).
 */
function toggleSound() {
    if (sound === true) {
        muteSound();
    } else {
        unmuteSound();
    }
}


/**
 * Mutes and pauses all sounds.
 */
function muteSound() {
    allSounds.forEach((sound) => {
        sound.muted = true;
        sound.pause();
    });
    changeSrc('sound-icon', 'img/ui/sound-off.png');
    changeTitle('sound-icon', 'M = Unmute');
    sound = false;
}


/**
 * Unmutes and resumes all sounds.
 */
function unmuteSound() {
    allSounds.forEach((sound) => {
        sound.muted = false;
        allSounds[12].play();
    });
    changeSrc('sound-icon', 'img/ui/sound-on.png');
    changeTitle('sound-icon', 'M = Mute');
    sound = true
}


/**
 * Toggles fullscreen mode.
 */
function toggleFullscreen() {
    if (fullscreen === false) {
        openFullscreen();
        changeSrc('fullscreen-icon', 'img/ui/fullscreen-exit.png');
        changeTitle('fullscreen-icon', 'F = Fullscreen');
    } else {
        closeFullscreen();
        changeSrc('fullscreen-icon', 'img/ui/fullscreen-enter.png');
        changeTitle('fullscreen-icon', 'F = Fullscreen');
    }
}


/**
 * Enters fullscreen mode.
 */
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


/**
 * Exits fullscreen mode.
 */
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


/**
 * Toggles control instructions.
 */
function toggleControls() {
    renderControls();
    toggleClass('controls-pop-up', 'hide');
}


/**
 * Renders control instructions depending on type of device.
 */
function renderControls() {
    if (window.innerWidth <= 720) {
        renderControlsMobile();
    } else {
        renderControlsDesktop();
    }
}


/**
 * Renders control instructions when playing on PC.
 */
function renderControlsDesktop() {
    let controlsPopUp = document.getElementById('controls-pop-up');
    controlsPopUp.innerHTML = desktopControlsTemplate();
}


/**
 * Renders control instructions when playing on mobile device.
 */
function renderControlsMobile() {
    let controlsPopUp = document.getElementById('controls-pop-up');
    controlsPopUp.innerHTML = mobileControlsTemplate();
}


/**
 * Changes source of an HTML image element.
 * @param {string} id - Images id whose source to be changed.
 * @param {*} path - New image path is to be used. 
 */
function changeSrc(id, path) {
    let img = document.getElementById(id);
    img.src = path;
}


/**
 * Changes an HTML element's title.
 * @param {string} id - Element's id whose title to be changed.
 * @param {*} name - Element's new title.
 */
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


/**
 * 
 */
screen.orientation.addEventListener('change', () => {
    if (screen.orientation.type === 'landscape-primary') {
        toggleClass('rotate-smartphone', 'hide');
    } else {
        toggleClass('rotate-smartphone', 'hide');
    }
});