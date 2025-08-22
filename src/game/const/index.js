const GAME_WIDTH = 850;
const GAME_HEIGHT = 600;
const GAME_MENU = 'game-menu';
const GAME_OVER = 'game-over';
const GAME_BOOT = 'game-boot';
const GAME_START = 'game-start';
const GAME_PRELOAD = 'game-preload';
const PRESS_START = "Click or Press SPACE to Start";
const PRESS_RESTART = "Click or Press SPACE to Restart";

const LOAD_ASSETS = {
    KEY: {
        BACKGROUND: 'background',
        LOGO: 'logo',
        PLAYER: 'player',
        HP: 'hp',
        LD: 'ld',
        HL: 'hl',
        END: 'end',
        CL: 'cl',
        ON: 'on',
    },
    PATH: {
        BACKGROUND: 'assets/bg.png',
        LOGO: 'assets/logo.png',
        PLAYER: 'assets/person.png',
        HP: 'assets/hp.mp3',
        LD: 'assets/ld.mp3',
        HL: 'assets/hl.wav',
        END: 'assets/end.wav',
        CL: 'assets/cl.ogg',
        ON: 'assets/on.ogg',
    }
};

const toggleControls = (isVisible) => {
    const controls = document.getElementById('controls');
    if (isVisible) {
        return controls.style.display = 'block';
    } else {
        return controls.style.display = 'none';
    }
};

const toggleUI = (isVisible) => {
    const ui = document.getElementById('ui');
    if (isVisible) {
        return ui.style.display = 'block';
    } else {
        return ui.style.display = 'none';
    }
};

const setPower = (power) =>
    document.getElementById('power').textContent = power;


const setScore = (score) =>
    document.getElementById('score').textContent = score;

export {
  GAME_BOOT,
  GAME_HEIGHT,
  GAME_MENU,
  GAME_OVER,
  GAME_PRELOAD,
  GAME_START,
  GAME_WIDTH,
  LOAD_ASSETS,
  PRESS_RESTART,
  PRESS_START,
  setPower,
  setScore,
  toggleControls,
  toggleUI,
};
