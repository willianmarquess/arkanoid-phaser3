export default class Menu extends Phaser.Scene{
    constructor(){
        super('menugame');
    }

    create(){
        const arkanoidlogo = this.add.image(this.scale.width / 2, 200, 'arkanoid');
        arkanoidlogo.setScale(0.4);
        const phaserlogo = this.add.image(this.scale.width / 2, 350, 'phaser');
        phaserlogo.setScale(0.1);

        const textToStart = this.add.text(this.scale.width / 2, this.scale.height / 2, 'Click or Touch', {
            fontSize: 50,
            color: 'white',
            fontStyle: 'bold'
        })
        textToStart.setX(this.scale.width / 2 - textToStart.width / 2)
    }

    update(){
        if(this.input.activePointer.isDown){
            this.scene.start('playgame');
        }
    }
}