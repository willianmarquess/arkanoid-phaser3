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
    textPoints = null;
    textLife = null;

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

        for (let i = 1; i < 6; i++) {
            for (let j = 1; j < 6; j++) {
                const brickConfig = bricksconfig[Phaser.Math.Between(0, 4)];
                const brick = this.add.rectangle((10 + 100) * i, (25 + 25) * j, 100, 25, brickConfig.value);
                brick.lifes = brickConfig.lifes;
                brick.points = brickConfig.points;
                this.bricks.add(brick);
            }
        }

        this.textPoints = this.add.text(20, this.height - 35, `Points: ${this.player.playerPoints}`, {
            fontSize: 30
        });

        this.textLife = this.add.text(this.width - 170, this.height - 35, `Lifes: ${this.player.playerLifes}`, {
            fontSize: 30
        });

        this.physics.add.collider(this.ball, this.player, (ball, player) => {
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
            if (brick.lifes <= 1) {
                this.bricks.remove(brick, true);
            } else {
                brick.lifes--;
            }
            this.player.playerPoints += brick.points;
            this.textPoints.text = `Points: ${this.player.playerPoints}`;

            if (this.bricks.countActive(true) === 0) {
                this.scene.start('wingame', { points: this.player.playerPoints });
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
                    this.scene.start('gameover');
                }

                this.player.playerLifes--;
                this.textLife.text = `Lifes: ${this.player.playerLifes}`;
            }
        }
    }
}