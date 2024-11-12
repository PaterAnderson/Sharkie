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
    const upBtn = document.getElementById('up-btn');
    upBtn.addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.UP = true;
    });
    upBtn.addEventListener('touchend', () => {
        keyboard.UP = false;
    });
}

function checkLeftBtn() {
    const leftBtn = document.getElementById('left-btn');
    leftBtn.addEventListener('touchstart', (event) => {
        event.preventDefault(); 
        keyboard.LEFT = true;
    });
    leftBtn.addEventListener('touchend', () => {
        keyboard.LEFT = false;
    });
}

function checkRightBtn() {
    const rightBtn = document.getElementById('right-btn');
    rightBtn.addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.RIGHT = true;
    });
    rightBtn.addEventListener('touchend', () => {
        keyboard.RIGHT = false;
    });
}

function checkDownBtn() {
    const downBtn = document.getElementById('down-btn');
    downBtn.addEventListener('touchstart', (event) => {
        event.preventDefault(); 
        keyboard.DOWN = true;
    });
    downBtn.addEventListener('touchend', () => {
        keyboard.DOWN = false;
    });
}

function checkSlapBtn() {
    const slapBtn = document.getElementById('slap-btn');
    slapBtn.addEventListener('touchstart', (event) => {
        event.preventDefault(); 
        keyboard.ATTACK = true;
    });
    slapBtn.addEventListener('touchend', () => {
        keyboard.ATTACK = false;
    });
}

function checkShootBtn() {
    const shootBtn = document.getElementById('shoot-btn');
    shootBtn.addEventListener('touchstart', (event) => {
        event.preventDefault(); 
        keyboard.SPACE = true;
    });
    shootBtn.addEventListener('touchend', () => {
        keyboard.SPACE = false;
    });
}

function togglePause() {
    isPaused = !isPaused;
    keyboard.PAUSE = isPaused;
}

function removeStartMenu() {
    document.getElementById('startMenu').classList.add('d-none');
    document.getElementById('startButton').classList.add('d-none');
}

function addStartMenu() {
    document.getElementById('startMenu').classList.remove('d-none');
    document.getElementById('startButton').classList.remove('d-none');
}

function addRetryButton() {
    document.getElementById('retryButton').classList.remove('d-none');
}

function removeRetryButton() {
    document.getElementById('retryButton').classList.add('d-none');
}

function addRetryButton2() {
    document.getElementById('retryButton2').classList.remove('d-none');
}

function removeRetryButton2() {
    document.getElementById('retryButton2').classList.add('d-none');
}

function removeControllsMenu() {
    document.getElementById('controllsMenu').classList.add('d-none');
    document.getElementById('unmuteButton').classList.add('d-none');
    document.getElementById('muteButton').classList.add('d-none');
}
