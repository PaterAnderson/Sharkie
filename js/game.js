let canvas;
let world;
let keyboard = new Keyboard();
let isPaused = false; // Variable zur Verfolgung des Pausenstatus

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    world.stop();
    setupTouchControls();
}

window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case 'w': // W
            keyboard.UP = true;
            break;
        case 'a': // A
            keyboard.LEFT = true;
            break;
        case 'd': // D
            keyboard.RIGHT = true;
            break;
        case 's': // S
            keyboard.DOWN = true;
            break;
        case 'e': // E
            keyboard.ATTACK = true;
            break;
        case ' ': // Space
            keyboard.SPACE = true;
            break;
        case 'Escape': // ESC
            togglePause();
            break;
    }
});

window.addEventListener("keyup", (event) => {
    switch (event.key) {
        case 'w': // W
            keyboard.UP = false;
            break;
        case 'a': // A
            keyboard.LEFT = false;
            break;
        case 'd': // D
            keyboard.RIGHT = false;
            break;
        case 's': // S
            keyboard.DOWN = false;
            break;
        case 'e': // E
            keyboard.ATTACK = false;
            break;
        case ' ': // Space
            keyboard.SPACE = false;
            break;
    }
});


function setupTouchControls() {
    document.getElementById('up-btn').addEventListener('touchstart', () => {
        keyboard.UP = true;
    });
    document.getElementById('up-btn').addEventListener('touchend', () => {
        keyboard.UP = false;
    });

    document.getElementById('left-btn').addEventListener('touchstart', () => {
        keyboard.LEFT = true;
    });
    document.getElementById('left-btn').addEventListener('touchend', () => {
        keyboard.LEFT = false;
    });

    document.getElementById('right-btn').addEventListener('touchstart', () => {
        keyboard.RIGHT = true;
    });
    document.getElementById('right-btn').addEventListener('touchend', () => {
        keyboard.RIGHT = false;
    });

    document.getElementById('down-btn').addEventListener('touchstart', () => {
        keyboard.DOWN = true;
    });
    document.getElementById('down-btn').addEventListener('touchend', () => {
        keyboard.DOWN = false;
    });

    document.getElementById('slap-btn').addEventListener('touchstart', () => {
        keyboard.ATTACK = true;
    });
    document.getElementById('slap-btn').addEventListener('touchend', () => {
        keyboard.ATTACK = false;
    });

    document.getElementById('shoot-btn').addEventListener('touchstart', () => {
        keyboard.SPACE = true;
    });
    document.getElementById('shoot-btn').addEventListener('touchend', () => {
        keyboard.SPACE = false;
    });
}


function togglePause() {
    isPaused = !isPaused; // Zustand umkehren
    keyboard.PAUSE = isPaused; // PAUSE-Wert setzen
}