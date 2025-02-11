//Diver Prefab
class Diver extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, direction) {
        super(scene, x, y, texture, frame) // call Sprite parent class
        scene.add.existing(this)         // add Hero to existing scene
        scene.physics.add.existing(this)   // add physics body to scene

        
        this.body.setSize(25,8  )
        this.setScale(2)
        this.body.setOffset(0,14  )
 
     
 
        
        this.body.setCollideWorldBounds(true)
    }

    update() {
        
        this.body.setVelocity(0)
        this.setRotation(0)

        // left/right movement

        if(keyLEFT.isDown) {
            this.body.setVelocityY(-80)
            this.setRotation(-0.2)
            
        } else if(keyRIGHT.isDown){
            this.body.setVelocityY(80)
            this.setRotation(.2)
            //
        }
        

    }

    reset() {
        this.isFiring = false
        this.y = game.config.height - borderUISize - borderPadding
    }
}