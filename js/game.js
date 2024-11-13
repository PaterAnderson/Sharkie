let canvas;
let world;
let keyboard = new Keyboard();
let isPaused = false;

function showAlert() {
    alert("Hey. Da ich jetzt nicht unbedingt ein Ticket aufmachen wollte. Teile ich dir/euch einfach hier schnell etwas mit. Das Optionsmenü funktioniert schon die ganze Zeit. Wie man im Startbildschirm erkennen kann, muss man einfach ESC drücken um es zu öffnen. Dort kann man die Regeln lesen, sowie den Sound muten. Das Spiel wird dabei auch pausiert. Habt ihr warscheinlich einfach nur übersehen haha ;)");
}

/**
 * Initializes the game by setting up the canvas and world, and stops the world.
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    world.stop();
    setupTouchControls();
    showAlert();
}

/**
 * Handles keyboard keydown events to update the state of the keyboard object.
 * @param {KeyboardEvent} event - The keyboard event.
 */
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

/**
 * Handles keyboard keyup events to update the state of the keyboard object.
 * @param {KeyboardEvent} event - The keyboard event.
 */
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

/**
 * Sets up touch controls by initializing the appropriate button listeners.
 */
function setupTouchControls() {
    checkUpBtn(),
        checkLeftBtn(),
        checkRightBtn(),
        checkDownBtn(),
        checkSlapBtn(),
        checkShootBtn()
}

/**
 * Initializes touch event listeners for the up button.
 */
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

/**
 * Initializes touch event listeners for the left button.
 */
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

/**
 * Initializes touch event listeners for the right button.
 */
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

/**
 * Initializes touch event listeners for the down button.
 */
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

/**
 * Initializes touch event listeners for the slap button.
 */
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

/**
 * Initializes touch event listeners for the shoot button.
 */
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

/**
 * Toggles the game's paused state and updates the keyboard's pause property.
 */
function togglePause() {
    isPaused = !isPaused;
    keyboard.PAUSE = isPaused;
}

/**
 * Hides the start menu and start button by adding a hidden class.
 */
function removeStartMenu() {
    document.getElementById('startMenu').classList.add('d-none');
    document.getElementById('startButton').classList.add('d-none');
}

/**
 * Shows the start menu and start button by removing the hidden class.
 */
function addStartMenu() {
    document.getElementById('startMenu').classList.remove('d-none');
    document.getElementById('startButton').classList.remove('d-none');
}

/**
 * Shows the retry button by removing the hidden class.
 */
function addRetryButton() {
    document.getElementById('retryButton').classList.remove('d-none');
}

/**
 * Hides the retry button by adding a hidden class.
 */
function removeRetryButton() {
    document.getElementById('retryButton').classList.add('d-none');
}

/**
 * Shows the second retry button by removing the hidden class.
 */
function addRetryButton2() {
    document.getElementById('retryButton2').classList.remove('d-none');
}

/**
 * Hides the second retry button by adding a hidden class.
 */
function removeRetryButton2() {
    document.getElementById('retryButton2').classList.add('d-none');
}

/**
 * Hides the controls menu and mute/unmute buttons by adding a hidden class.
 */
function removeControllsMenu() {
    document.getElementById('controllsMenu').classList.add('d-none');
    document.getElementById('unmuteButton').classList.add('d-none');
    document.getElementById('muteButton').classList.add('d-none');
}
