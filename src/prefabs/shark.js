class Shark extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame)
        scene.add.existing(this).setScale(3)
        scene.physics.add.existing(this)
        this.body.setSize(25,13 ) 
        
        this.moveSpeed = 3 
        

    }

    update() {
        //move Shark left
        
        this.x -= this.moveSpeed

        //wrap around from left edge to right edge
        if(this.x <= 0 - this.width*10) {
            this.x = game.config.width + this.width*10
            this.y =Phaser.Math.Between(this.height, game.config.height-this.height)
        }
    }
// reset Shark to right edge
    reset() {
        this.x = game.config.width
    }
}