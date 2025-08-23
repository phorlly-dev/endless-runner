import { LOAD_ASSETS } from '../consts';

const createPlayerAnimations = (scene) => {
    scene.anims.create({
        key: "left",
        frames: scene.anims.generateFrameNumbers(LOAD_ASSETS.KEY.PLAYER, { start: 0, end: 3 }),
        frameRate: 16,
        repeat: -1,
    });

    scene.anims.create({
        key: "turn",
        frames: [{ key: LOAD_ASSETS.KEY.PLAYER, frame: 4 }],
        frameRate: 20,
    });

    scene.anims.create({
        key: "right",
        frames: scene.anims.generateFrameNumbers(LOAD_ASSETS.KEY.PLAYER, { start: 5, end: 8 }),
        frameRate: 16,
        repeat: -1,
    });
}

export default createPlayerAnimations;