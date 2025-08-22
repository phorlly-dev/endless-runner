import {
  GAME_HEIGHT,
  GAME_OVER,
  GAME_START,
  GAME_WIDTH,
  PRESS_RESTART,
  toggleControls,
  toggleUI,
} from '../const';
import {
  black_color,
  error_color,
  primary_color,
  secondary_color,
  white_color,
} from '../const/colors';

class GameOver extends Phaser.Scene {
    constructor() {
        super(GAME_OVER);
    }

    create(data) {
        toggleControls(data.ui);
        toggleUI(data.controls);
        const fontSize = 64;
        this.cameras.main.setBackgroundColor(secondary_color);

        this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 4, 'GAME OVER!', {
            fontFamily: 'Arial Black', fontSize: fontSize, color: primary_color,
            stroke: error_color, strokeThickness: 12,
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
                stroke: primary_color,
                strokeThickness: 8,
                align: "center",
            })
            .setOrigin(0.5);

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