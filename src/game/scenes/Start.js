import * as Phaser from 'phaser';

import {
  GAME_HEIGHT,
  GAME_WIDTH,
} from '../consts';
import Boot from './Boot';
import Game from './Game';
import GameOver from './GameOver';
import MainMenu from './MainMenu';
import Preloader from './Preloader';

// Find out more information about the Game Config at:
// https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config = {
    type: Phaser.AUTO,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    backgroundColor: '#34495e',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 },
            debug: false,
        },
    },
    scene: [Boot, Preloader, MainMenu, Game, GameOver],
};

const StartGame = (parent) => new Phaser.Game({ ...config, parent });

export default StartGame;
