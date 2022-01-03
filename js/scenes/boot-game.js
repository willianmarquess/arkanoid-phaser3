export default class Boot extends Phaser.Scene{
    constructor(){
        super('bootgame');
    }

    preload(){
        console.log('preload boot');
        this.load.spritesheet('ball', 'assets/ball/ball.png', { frameWidth: 24, frameHeight: 18 });
        this.load.image('player', 'assets/player/player.png');
        this.load.image('arkanoid', 'assets/scenes/arkanoid-logo.png');
        this.load.image('phaser', 'assets/scenes/phaserlogo.png');
    }

    create(){
        console.log('create boot');

        this.anims.create({
            key: 'ball_idle',
            frames: this.anims.generateFrameNumbers('ball', {start: 0, end: 3}),
            frameRate: 12,
            repeat: -1
        });

        this.scene.start('menugame');

    }
}