import { Scene } from 'phaser';

import {
  GAME_HEIGHT,
  GAME_OVER,
  GAME_START,
  GAME_WIDTH,
  hideShowControls,
  hideShowUI,
  PRESS_RESTART,
} from '../const';
import {
  black_color,
  blue_color,
  primary_color,
  secondary_color,
  success_color,
  white_color,
} from '../const/colors';

export class GameOver extends Scene {
    constructor() {
        super(GAME_OVER);
    }

    create(data) {
        hideShowUI(data.ui);
        hideShowControls(data.controls);
        const fontSize = 64;
        this.cameras.main.setBackgroundColor(success_color);

        this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 4, 'GAME OVER!', {
            fontFamily: 'Arial Black', fontSize: fontSize, color: primary_color,
            stroke: secondary_color, strokeThickness: 12,
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 40, `Final Score: ${data.score}`, {
            fontFamily: 'Arial', fontSize: fontSize / 2, color: white_color,
            stroke: black_color, strokeThickness: 10,
            align: 'center'
        }).setOrigin(0.5);

        this.add
            .text(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 100, PRESS_RESTART, {
                fontFamily: "Lucida Console",
                fontSize: fontSize / 4,
                color: secondary_color,
                stroke: blue_color,
                strokeThickness: 8,
                align: "center",
            })
            .setOrigin(0.5);

        this.input.once("pointerdown", () => {
            this.scene.start(GAME_START);
        });

        this.input.keyboard.on("keydown-SPACE", () => {
            this.scene.start(GAME_START);
        });
    }
}
