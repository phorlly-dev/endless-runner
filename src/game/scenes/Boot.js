import {
  GAME_BOOT,
  GAME_PRELOAD,
  LOAD_ASSETS,
} from '../consts';

class Boot extends Phaser.Scene {
    constructor() {
        super(GAME_BOOT);
    }

    preload() {
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

        this.load.image(LOAD_ASSETS.KEY.BACKGROUND, LOAD_ASSETS.PATH.BACKGROUND);
        // this.load.image(LOAD_ASSETS.KEY.PLAYER, LOAD_ASSETS.PATH.PLAYER);
        this.load.audio(LOAD_ASSETS.KEY.HP, LOAD_ASSETS.PATH.HP);
        this.load.audio(LOAD_ASSETS.KEY.LD, LOAD_ASSETS.PATH.LD);
        this.load.audio(LOAD_ASSETS.KEY.HL, LOAD_ASSETS.PATH.HL);
        this.load.audio(LOAD_ASSETS.KEY.END, LOAD_ASSETS.PATH.END);
        this.load.audio(LOAD_ASSETS.KEY.CL, LOAD_ASSETS.PATH.CL);
        this.load.audio(LOAD_ASSETS.KEY.ON, LOAD_ASSETS.PATH.ON);
        this.load.audio(LOAD_ASSETS.KEY.WALK, LOAD_ASSETS.PATH.WALK);

        this.load.spritesheet(LOAD_ASSETS.KEY.PLAYER, LOAD_ASSETS.PATH.PLAYER, { frameWidth: 32, frameHeight: 48 });
    }

    create() {
        this.scene.start(GAME_PRELOAD);
    }
}

export default Boot;


