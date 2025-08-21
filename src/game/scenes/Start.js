import {
  AUTO,
  Game,
  Scale,
} from 'phaser';

import {
  GAME_HEIGHT,
  GAME_WIDTH,
} from '../const';
import { secondary_color } from '../const/colors';
import { Boot } from './Boot';
import { Game as MainGame } from './Game';
import { GameOver } from './GameOver';
import { MainMenu } from './MainMenu';
import { Preloader } from './Preloader';

// Find out more information about the Game Config at:
// https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config = {
    type: AUTO,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    backgroundColor: secondary_color,
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH,
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 },
            debug: false,
        },
    },
    scene: [Boot, Preloader, MainMenu, MainGame, GameOver],
};

const StartGame = (parent) => {
    return new Game({ ...config, parent });
};

export default StartGame;
