let canvas;
let world;
let keyboard = new Keyboard();
let isPaused = false; // Variable zur Verfolgung des Pausenstatus

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    world.stop();
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

function togglePause() {
    isPaused = !isPaused; // Zustand umkehren
    keyboard.PAUSE = isPaused; // PAUSE-Wert setzen
}