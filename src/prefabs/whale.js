class Whale extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame)
        scene.add.existing(this).setScale(12) 
        scene.physics.add.existing(this)
        this.body.setSize(55,15    )
        this.body.setOffset(5     ,7  )
 
        
        this.moveSpeed = 1 

    }
  
    update() { 
        //move whale left
        
        this.x -= this.moveSpeed

        //wrap around from left edge to right edge
        if(this.x <= 0 - this.width*10) {
            this.x = game.config.width + this.width*10
            this.y =Phaser.Math.Between(this.height, game.config.height-this.height)
        }
    }
// reset whale to right edge
    reset() {
        this.x = game.config.width
    }
}