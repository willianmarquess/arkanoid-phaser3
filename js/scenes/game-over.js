export default class GameOver extends Phaser.Scene{

    playerScore;

    constructor(){
        super('gameover');
    }

    init(data){
        this.playerScore = data.score ?? 0;
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

        const scoreText = this.add.text(this.scale.width / 2, this.scale.height / 2 + 60, `Score: ${this.playerScore}`, {
            fontSize: 50,
            color: 'white',
            fontStyle: 'bold',
            stroke: 'black'
        });

        scoreText.setX(this.scale.width / 2 - scoreText.width / 2);

        const textToStart = this.add.text(this.scale.width / 2, this.scale.height / 2 + 120, 'Click or Touch to Restart', {
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