export default class GameOver extends Phaser.Scene{
    constructor(){
        super('gameover');
    }

    create(){
        const arkanoidlogo = this.add.image(this.scale.width / 2, 200, 'arkanoid');
        arkanoidlogo.setScale(0.4);
        const phaserlogo = this.add.image(this.scale.width / 2, 350, 'phaser');
        phaserlogo.setScale(0.1);

        const gameOvertext = this.add.text(this.scale.width / 2, this.scale.height / 2, 'GAME OVER', {
            fontSize: 50,
            color: 'red',
            fontStyle: 'bold',
            stroke: 'black'
        })
        gameOvertext.setX(this.scale.width / 2 - gameOvertext.width / 2);

        const textToStart = this.add.text(this.scale.width / 2, this.scale.height / 2 + 100, 'Click or Touch to Restart', {
            fontSize: 40,
            color: 'white',
            fontStyle: 'bold'
        })
        textToStart.setX(this.scale.width / 2 - textToStart.width / 2);
    }

    update(){
        if(this.input.activePointer.isDown){
            this.scene.start('playgame');
        }
    }
}