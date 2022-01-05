export default class Player extends Phaser.Physics.Arcade.Sprite{

    playerScale = 3;
    playeVelocity = 300;
    playerPoints = 0;
    playerLifes = 3;
    winStreak = 0;

    constructor(scene, x, y){
        super(scene, x, y, 'player');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.collideWorldBounds = true;

        this.setScale(this.playerScale);
        this.width = this.width * this.playerScale;
        this.body.immovable = true;
    }

    update(time, deltaTime){

        if(this.scene.input.activePointer.isDown){
            if(this.scene.input.activePointer.position.x > this.scene.width / 2){
                this.setVelocityX(this.playeVelocity);
                return;
            }else if (this.scene.input.activePointer.position.x < this.scene.width / 2){
                this.setVelocityX(-this.playeVelocity);
                return;
            }
        }

        if (this.scene.cursors.right.isDown) {
            this.setVelocityX(this.playeVelocity);
            return;
        }

        if (this.scene.cursors.left.isDown) {
            this.setVelocityX(-this.playeVelocity);
            return;
        }

        this.setVelocityX(0);
    }

    getMiddlePositionX(){
        return this.getCenter().x;
    }
}