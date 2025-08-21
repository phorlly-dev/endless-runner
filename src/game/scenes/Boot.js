import { Scene } from 'phaser';

import {
  GAME_BOOT,
  GAME_PRELOAD,
  LOAD_ASSETS,
} from '../const';

export class Boot extends Scene {
    constructor() {
        super(GAME_BOOT);
    }

    preload() {
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

        this.load.image(LOAD_ASSETS.KEY.BACKGROUND, LOAD_ASSETS.PATH.BACKGROUND);
        this.load.image(LOAD_ASSETS.KEY.PLAYER, LOAD_ASSETS.PATH.PLAYER);
    }

    create() {
        this.scene.start(GAME_PRELOAD);
    }
}
