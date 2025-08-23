import {
  GAME_HEIGHT,
  GAME_MENU,
  GAME_START,
  GAME_WIDTH,
  LOAD_ASSETS,
  PRESS_START,
  toggleControls,
  toggleUI,
} from '../consts';
import { setText } from '../utils';

class MainMenu extends Phaser.Scene {
    constructor() {
        super(GAME_MENU);
    }

    create() {
        toggleUI(false);
        toggleControls(true);
        this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, LOAD_ASSETS.KEY.BACKGROUND);
        this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 100, LOAD_ASSETS.KEY.LOGO);

        setText({ scene: this, y: 100, text: PRESS_START, strokeThickness: 16 });

        this.input.once("pointerdown", () => {
            this.sound.play(LOAD_ASSETS.KEY.ON);
            this.scene.start(GAME_START);
        });

        this.input.keyboard.once("keydown-SPACE", () => {
            this.sound.play(LOAD_ASSETS.KEY.ON);
            this.scene.start(GAME_START);
        });
    }
}

export default MainMenu;
