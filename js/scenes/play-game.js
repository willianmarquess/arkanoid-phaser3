import { bricksconfig } from "../configs/bricks-config.js";
import Ball from "../entities/ball.js";
import Player from "../entities/player.js";

export default class PlayGame extends Phaser.Scene {
    cursors = null;
    player = null;
    width = 0;
    height = 0;
    ball = null;
    bricks = null;
    textScore = null;
    textLife = null;
    onBrickOrPlatformSound = null;
    onDestroyBrickSound = null;
    decreaseLifeSound = null;
    textTimer = null;
    timer = 0;

    constructor() {
        super('playgame');
    }

    init() {
        console.log('init play game');
        this.cursors = this.input.keyboard.addKeys({
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
        });

        this.width = this.scale.width;
        this.height = this.scale.height;

    }

    create() {
        this.player = new Player(this, this.game.config.width / 2, 1000);
        this.ball = new Ball(this);
        this.bricks = this.physics.add.staticGroup();

        this.onBrickOrPlatformSound = this.sound.add('onbrickorplatform', { loop: false });
        this.onDestroyBrickSound = this.sound.add('ondestroybrick', { loop: false });
        this.decreaseLifeSound = this.sound.add('life', { loop: false });

        this.time.addEvent({ delay: 1000, callback: this.updateTimer, callbackScope: this, loop: true });

        for (let i = 1; i < 6; i++) {
            for (let j = 1; j < 6; j++) {
                const brickConfig = bricksconfig[Phaser.Math.Between(0, 4)];
                const brick = this.add.rectangle((10 + 100) * i, (25 + 25) * j, 100, 25, brickConfig.value);
                brick.lifes = brickConfig.lifes;
                brick.points = brickConfig.points;
                this.bricks.add(brick);
            }
        }

        this.textScore = this.add.text(20, this.height - 35, `Score: ${this.player.playerScore}`, {
            fontSize: 30
        });

        this.textLife = this.add.text(this.width - 170, this.height - 35, `Lifes: ${this.player.playerLifes}`, {
            fontSize: 30
        });

        this.textTimer = this.add.text(20, 5, `Time: ${this.timer}`, {
            fontSize: 30
        });

        this.physics.add.collider(this.ball, this.player, (ball, player) => {
            this.onBrickOrPlatformSound.play();
            let diff = 0;
            if (ball.getMiddlePositionX() < player.getMiddlePositionX()) {
                diff = player.getMiddlePositionX() - ball.getMiddlePositionX();
                ball.setVelocityX(-10 * diff);
            } else if (ball.getMiddlePositionX() > player.getMiddlePositionX()) {
                diff = ball.getMiddlePositionX() - player.getMiddlePositionX();
                ball.setVelocityX(10 * diff);
            } else {
                ball.setVelocityX(10);
            }
        });

        this.physics.add.collider(this.ball, this.bricks, (ball, brick) => {
            this.onBrickOrPlatformSound.play();
            if (brick.lifes <= 1) {
                this.bricks.remove(brick, true);
                this.onDestroyBrickSound.play();
            } else {
                brick.lifes--;
            }
            this.player.winStreak++;
            this.player.playerScore += brick.points + (this.player.winStreak / 2);
            this.textScore.text = `Score: ${this.player.playerScore}`;

            if (this.bricks.countActive(true) === 0) {
                this.scene.start('wingame', { score: this.player.playerScore });
            }
        });
        this.physics.world.setBounds(0, 0, 640, 1133);
    }

    update(time, deltaTime) {
        if (this.player) this.player.update(time, deltaTime);
        if (this.ball) {
            this.ball.update(time, deltaTime);
            if (this.ball.body.y >= this.height - this.ball.height) {
                this.ball.init();

                if (this.player.playerLifes <= 1) {
                    this.timer = 0;
                    this.scene.start('gameover', { score: this.player.playerScore });
                }

                this.player.winStreak = 0;
                this.player.playerLifes--;
                this.textLife.text = `Lifes: ${this.player.playerLifes}`;

                this.decreaseLifeSound.play();
            }
        }
    }

    updateTimer(){
        this.timer++;
        this.textTimer.text = `Time: ${this.timer}`;
        this.ball.body.velocity.y += this.ball.body.velocity.y > 0 ? 10 : -10;
    }
}