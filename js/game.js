let canvas;
let world;
let keyboard = new Keyboard();
let isPaused = false; 

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    world.stop();
    setupTouchControls();
}

window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case 'w': 
            keyboard.UP = true;
            break;
        case 'a': 
            keyboard.LEFT = true;
            break;
        case 'd': 
            keyboard.RIGHT = true;
            break;
        case 's': 
            keyboard.DOWN = true;
            break;
        case 'e': 
            keyboard.ATTACK = true;
            break;
        case ' ': 
            keyboard.SPACE = true;
            break;
        case 'Escape': 
            togglePause();
            break;
    }
});

window.addEventListener("keyup", (event) => {
    switch (event.key) {
        case 'w': 
            keyboard.UP = false;
            break;
        case 'a': 
            keyboard.LEFT = false;
            break;
        case 'd': 
            keyboard.RIGHT = false;
            break;
        case 's': 
            keyboard.DOWN = false;
            break;
        case 'e': 
            keyboard.ATTACK = false;
            break;
        case ' ': 
            keyboard.SPACE = false;
            break;
    }
});


function setupTouchControls() {
    checkUpBtn(),
    checkLeftBtn(),
    checkRightBtn(),
    checkDownBtn(),
    checkSlapBtn(),
    checkShootBtn()
}

function checkUpBtn() {
    document.getElementById('up-btn').addEventListener('touchstart', () => {
        keyboard.UP = true;
    });
    document.getElementById('up-btn').addEventListener('touchend', () => {
        keyboard.UP = false;
    });
}

function checkLeftBtn() {
    document.getElementById('left-btn').addEventListener('touchstart', () => {
        keyboard.LEFT = true;
    });
    document.getElementById('left-btn').addEventListener('touchend', () => {
        keyboard.LEFT = false;
    });
}

function checkRightBtn() {
    document.getElementById('right-btn').addEventListener('touchstart', () => {
        keyboard.RIGHT = true;
    });
    document.getElementById('right-btn').addEventListener('touchend', () => {
        keyboard.RIGHT = false;
    });
}

function checkDownBtn() {
    document.getElementById('down-btn').addEventListener('touchstart', () => {
        keyboard.DOWN = true;
    });
    document.getElementById('down-btn').addEventListener('touchend', () => {
        keyboard.DOWN = false;
    });
}

function checkSlapBtn() {
    document.getElementById('slap-btn').addEventListener('touchstart', () => {
        keyboard.ATTACK = true;
    });
    document.getElementById('slap-btn').addEventListener('touchend', () => {
        keyboard.ATTACK = false;
    });
}

function checkShootBtn() {
    document.getElementById('shoot-btn').addEventListener('touchstart', () => {
        keyboard.SPACE = true;
    });
    document.getElementById('shoot-btn').addEventListener('touchend', () => {
        keyboard.SPACE = false;
    });
}

function togglePause() {
    isPaused = !isPaused; 
    keyboard.PAUSE = isPaused;
}