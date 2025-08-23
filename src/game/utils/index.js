import {
  GAME_HEIGHT,
  GAME_WIDTH,
  LOAD_ASSETS,
} from '../consts';
import {
  black_color,
  white_color,
} from '../consts/colors';

const togglePause = (scene) => {
    scene.isPaused = !scene.isPaused;

    if (scene.isPaused) {
        // Pause the game
        scene.physics.pause();
        scene.spawnTimer.paused = true;
        scene.pauseText.setVisible(true);
        scene.pauseInstructions.setVisible(true);
        scene.sound.play(LOAD_ASSETS.KEY.CL);
    } else {
        // Resume the game
        scene.physics.resume();
        scene.spawnTimer.paused = false;
        scene.pauseText.setVisible(false);
        scene.pauseInstructions.setVisible(false);
        scene.sound.play(LOAD_ASSETS.KEY.ON);
    }
}

const actions = (scene) => {
    if (scene.cursors.left.isDown || scene.as.A.isDown) {
        scene.player.setVelocityX(-160);
        scene.player.anims.play("left", true);

        if (!scene.walkSound.isPlaying) {
            scene.walkSound.play();  // start looping only once
        }
    } else if (scene.cursors.right.isDown || scene.as.S.isDown) {
        scene.player.setVelocityX(160);
        scene.player.anims.play("right", true);

        if (!scene.walkSound.isPlaying) {
            scene.walkSound.play();
        }
    } else {
        scene.player.setVelocityX(0);
        scene.player.anims.play("turn");

        if (scene.walkSound.isPlaying) {
            scene.walkSound.stop();  // stop when idle
        }
    }

    if (scene.cursors.space.isDown) {
        scene.player.setVelocityY(-330);
    } else {
        // gravity fallback
        scene.player.setVelocityY(GAME_HEIGHT);
    }
};

const boxTextPositions = (scene) => {
    scene.powerBoxes.children.entries.forEach((box) => {
        if (box.textObj) {
            box.textObj.x = box.x;
            box.textObj.y = box.y;
        }
        if (box.y > GAME_HEIGHT + 50) {
            if (box.textObj) box.textObj.destroy();
            box.destroy();
        }
    });

    scene.scoreBoxes.children.entries.forEach((box) => {
        if (box.textObj) {
            box.textObj.x = box.x;
            box.textObj.y = box.y;
        }
        if (box.y > GAME_HEIGHT + 50) {
            if (box.textObj) box.textObj.destroy();
            box.destroy();
        }
    });
}

const setText = ({ scene, y = 0, text, font = "Arial", size = 24, color = white_color, stroke = black_color, strokeThickness = 12 }) =>
    scene.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 + (y), text, {
        fontFamily: font,
        fontSize: size,
        fill: color,
        stroke: stroke,
        strokeThickness: strokeThickness,
        align: "center",
    }).setOrigin(0.5);

export { actions, boxTextPositions, setText, togglePause };