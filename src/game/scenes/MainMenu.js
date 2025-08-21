import { Scene } from 'phaser';

import {
  GAME_HEIGHT,
  GAME_MENU,
  GAME_START,
  GAME_WIDTH,
  hideShowUI,
  LOAD_ASSETS,
  PRESS_START,
} from '../const';
import {
  black_color,
  white_color,
} from '../const/colors';

export class MainMenu extends Scene {
    constructor() {
        super(GAME_MENU);
    }

    create() {
        hideShowUI(false);
        this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, LOAD_ASSETS.KEY.BACKGROUND);
        this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 100, LOAD_ASSETS.KEY.LOGO);

        this.add
            .text(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 100, PRESS_START, {
                fontFamily: "Arial Black",
                fontSize: 24,
                color: white_color,
                stroke: black_color,
                strokeThickness: 8,
                align: "center",
            })
            .setOrigin(0.5);

        this.input.once("pointerdown", () => {
            this.scene.start(GAME_START);
        });

        this.input.keyboard.on("keydown-SPACE", () => {
            this.scene.start(GAME_OVER);
        });
    }
}
