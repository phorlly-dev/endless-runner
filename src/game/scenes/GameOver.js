import {
  GAME_OVER,
  GAME_START,
  LOAD_ASSETS,
  PRESS_RESTART,
  toggleControls,
  toggleUI,
} from '../consts';
import {
  error_color,
  primary_color,
  secondary_color,
} from '../consts/colors';
import { setText } from '../utils';

class GameOver extends Phaser.Scene {
    constructor() {
        super(GAME_OVER);
    }

    create(data) {
        toggleControls(data.ui);
        toggleUI(data.controls);

        this.cameras.main.setBackgroundColor(secondary_color);

        const fontSize = 64;
        setText({
            scene: this,
            y: -120,
            text: "GAME OVER!",
            font: "Arial Black",
            size: fontSize,
            stroke: primary_color,
            color: error_color,
        });
        setText({
            scene: this,
            y: -12,
            text: `Final Score: ${data.score}`,
            font: "Arial",
            size: fontSize / 2,
            strokeThickness: 10,
        });
        setText({
            scene: this,
            y: 100,
            text: PRESS_RESTART,
            font: "Lucida Console",
            size: fontSize / 4,
            color: primary_color,
            strokeThickness: 8,
        });

        this.input.once("pointerdown", () => {
            this.sound.play(LOAD_ASSETS.KEY.ON);
            this.scene.start(GAME_START);
        });

        this.input.keyboard.on("keydown-SPACE", () => {
            this.sound.play(LOAD_ASSETS.KEY.ON);
            this.scene.start(GAME_START);
        });
    }
}

export default GameOver;
