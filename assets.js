let allSounds = [
    new Audio('audio/walking.mp3'),
    new Audio('audio/jump.mp3'),
    new Audio('audio/hurt.mp3'),
    new Audio('audio/snoring.mp3'),
    new Audio('audio/chicken-hurt.mp3'),
    new Audio('audio/collect-bottle.mp3'),
    new Audio('audio/collect-coin.mp3'),
    new Audio('audio/endboss-hit.mp3'),
    new Audio('audio/endboss-attack.mp3'),
    new Audio('audio/endboss-dead.mp3'),
    new Audio('audio/throw-bottle.mp3'),
    new Audio('audio/break-bottle.mp3'),
    new Audio('audio/background-music.mp3')
];



function mobileControlsTemplate() {
    return /*html*/`
        <div class="controls-content">
            <div class="controls-row">
                <div class="controls-keys">
                    <img src="img/ui/mobile-left.png">
                </div>
                <p>Left</p>
            </div>
            <div class="controls-row">
                <div class="controls-keys">
                    <img src="img/ui/mobile-right.png">
                </div>
                <p>Right</p>
            </div>
            <div class="controls-row">
                <div class="controls-keys">
                    <img src="img/ui/mobile-jump.png">
                </div>
                <p>Jump</p>
            </div>
            <div class="controls-row">
                <div class="controls-keys">
                    <img id="mobile-throw" src="img/ui/mobile-throw.png">
                </div>
                <p>Throw</p>
            </div>
        </div>
    `
}



function desktopControlsTemplate() {
    return /*html*/`
        <div class="controls-content">
            <div class="controls-row">
                <div class="controls-keys">
                    <div>
                        <img src="img/ui/a.png">
                        <img src="img/ui/d.png">
                    </div>
                    <p>or</p>
                    <div>
                        <img src="img/ui/arrow-left.png" alt="">
                        <img src="img/ui/arrow-right.png" alt="">
                    </div>
                </div>
                <p>Left/Right</p>
            </div>
            <div class="controls-row">
                <div class="controls-keys">
                    <img class="big-key" src="img/ui/space.png">
                </div>
                <p>Jump</p>
            </div>
            <div class="controls-row">
                <div class="controls-keys">
                    <img class="big-key" src="img/ui/shift.png">
                </div>
                <p>Throw</p>
            </div>
            <div class="controls-row">
                <div class="controls-keys">
                    <img src="img/ui/p.png">
                </div>
                <p>Play/Pause</p>
            </div>
            <div class="controls-row">
                <div class="controls-keys">
                    <img src="img/ui/c.png">
                </div>
                <p>Controls</p>
            </div>
            <div class="controls-row">
                <div class="controls-keys">
                    <img src="img/ui/m.png">
                </div>
                <p>Mute/Unmute</p>
            </div>
            <div class="controls-row">
                <div class="controls-keys">
                    <img src="img/ui/f.png">
                </div>
                <p>Fullscreen</p>
            </div>
        </div>
    `
}
