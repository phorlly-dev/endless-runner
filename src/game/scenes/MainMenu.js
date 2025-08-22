import {
  GAME_HEIGHT,
  GAME_MENU,
  GAME_START,
  GAME_WIDTH,
  LOAD_ASSETS,
  PRESS_START,
  toggleControls,
  toggleUI,
} from '../const';
import {
  black_color,
  white_color,
} from '../const/colors';

class MainMenu extends Phaser.Scene {
    constructor() {
        super(GAME_MENU);
    }

    create() {
        toggleUI(false);
        toggleControls(true);
        this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, LOAD_ASSETS.KEY.BACKGROUND);
        this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 100, LOAD_ASSETS.KEY.LOGO);

        this.add
            .text(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 100, PRESS_START, {
                fontFamily: "Arial Black",
                fontSize: 24,
                color: white_color,
                stroke: black_color,
                strokeThickness: 16,
                align: "center",
            })
            .setOrigin(0.5);

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
