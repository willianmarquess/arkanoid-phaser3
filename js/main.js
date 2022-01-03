import Boot from './scenes/boot-game.js';
import GameOver from './scenes/game-over.js';
import Menu from './scenes/menu-game.js';
import PlayGame from './scenes/play-game.js'
import WinGame from './scenes/win-game.js';


window.addEventListener('load', () => {
    new Phaser.Game({
        width: 640,
        height: 1133,
        type: Phaser.AUTO,
        backgroundColor: '#242424',
        physics: {
            default: 'arcade',
            arcade: {
                debug: false
            }
        },
        scene: [ Boot, Menu, PlayGame, GameOver, WinGame ],
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH
        }
    });
});