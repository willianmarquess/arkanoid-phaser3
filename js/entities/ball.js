export default class Ball extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.collideWorldBounds = true;
        this.setBounce(1, 1);
        this.anims.play('ball_idle', true);
        this.width = 24;
        this.body.width = 24;
        this.body.height = 18;
        this.init();
    }

    update(time, deltaTime){
    }

    getMiddlePositionX(){
        return this.getCenter().x;
    }

    init(){
        this.setX(Phaser.Math.Between((this.scene.game.config.width / 2) - 200, (this.scene.game.config.width / 2) + 10));
        this.setY(Phaser.Math.Between((this.scene.game.config.height / 2) - 200, (this.scene.game.config.height / 2) + 10));
        this.setVelocity(Phaser.Math.Between(-150, 150), 300);
    }
}