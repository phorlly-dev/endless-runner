const GAME_WIDTH = 850;
const GAME_HEIGHT = 600;
const GAME_MENU = "game-menu";
const GAME_OVER = "game-over";
const GAME_BOOT = "game-boot";
const GAME_START = "game-start";
const GAME_PRELOAD = "game-preload";
const PRESS_START = "Click or Press SPACE to Start";
const PRESS_RESTART = "Click or Press SPACE to Restart";

const LOAD_ASSETS = {
    KEY: {
        BACKGROUND: "background",
        LOGO: "logo",
        PLAYER: "player",
        HP: "hp",
        LD: "ld",
        HL: "hl",
        END: "end",
        CL: "cl",
        ON: "on",
        WALK: "walk",
    },
    PATH: {
        BACKGROUND: "assets/bg.png",
        LOGO: "assets/logo.png",
        PLAYER: "assets/player.png",
        HP: "assets/hp.mp3",
        LD: "assets/ld.mp3",
        HL: "assets/hl.wav",
        END: "assets/end.wav",
        CL: "assets/cl.ogg",
        ON: "assets/on.ogg",
        ON: "assets/on.ogg",
        WALK: "assets/walk.ogg",
    },
};

const toggleControls = (isVisible) => getById("controls").style.display = isVisible ? "block" : "none";

const toggleUI = (isVisible) => getById("ui").style.display = isVisible ? "block" : "none";

const setPower = (power) => getById("power").textContent = power;

const setScore = (score) => getById("score").textContent = score;

const powersOf2 = (val) => Math.pow(2, val);

const exponentFromValue = (val) => {
    const exp = Math.log2(val);
    return Number.isInteger(exp) ? exp : val;
}

const getById = (id) => document.getElementById(id);

export {
  exponentFromValue,
  GAME_BOOT,
  GAME_HEIGHT,
  GAME_MENU,
  GAME_OVER,
  GAME_PRELOAD,
  GAME_START,
  GAME_WIDTH,
  getById,
  LOAD_ASSETS,
  powersOf2,
  PRESS_RESTART,
  PRESS_START,
  setPower,
  setScore,
  toggleControls,
  toggleUI,
};
