class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
        this.p1Score = 45
        
    }

    

    create() {
        
        //place tile sprite Water
        this.farBG = this.add.tileSprite(0, 0, this.scale.width, this.textures.get('farBG').getSourceImage().height, 'farBG').setOrigin(0, 0).setScale(3.9, 3.9);
       
        this.sand = this.add.tileSprite(0, this.game.config.height-this.textures.get('sand').getSourceImage().height*1.5, this.scale.width, this.textures.get('sand').getSourceImage().height, 'sand').setOrigin(0, 0).setScale(1.5, 1.5);

        this.foreground = this.add.tileSprite(0, this.game.config.height-this.textures.get('foreground').getSourceImage().height*1.5, this.scale.width, this.textures.get('foreground').getSourceImage().height, 'foreground').setOrigin(0, 0).setScale(1.5, 1.5);
        
        //define keys

        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        //initialize score
        
        this.p1Score = 0   

         

        // add whale

        this.whale = new Whale(this, this.game.config.width + this.textures.get('whale').getSourceImage().width, Phaser.Math.Between(0+  this.textures.get('whale').getSourceImage().height, this.game.config.height - this.textures.get('whale').getSourceImage().height), 'whale', 0)
        this.whale.flipX=true
        this.whale.setOrigin(.5,.5)

        // Add Shark

        this.shark = new Shark(this, this.game.width ,400 , 'shark', 0)

        // Group
        this.whales = this.add.group([this.whale])
        this.sharks = this.add.group([this.shark])
    
    


        // add diver
        this.player = new Diver(this, this.game.config.width / 10, this.game.config.height/2, 'diver', 0)
        

        // game over flag
       this.gameOver = false
       this.gameDone = false
       

        

        //display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#086569',
            color: '#FFFFFF',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            }, 
        }
        this.scoreLeft = this.add.text(0,0, `${this.p1Score} M`, scoreConfig)

        this.time.addEvent({
            delay: 100, // 1000ms = 1 second
            callback: () => {if (!this.gameOver)
                this.p1Score = parseFloat((this.p1Score + 0.2).toFixed(1)) ; // Increase score
                this.scoreLeft.setText(`${(this.p1Score.toFixed(1))} M`);
              
                
            },  
            callbackScope: this,
            loop: true // Runs continuously
        });

        this.physics.add.overlap(this.player, this.whales, (player, whale) => {
            console.log('whale and player ')
            this.player.setVelocity(0,0) 
            this.player.setVelocity(0,-10)
            this.player.update 

            if(!this.gameOver){this.sound.play('chomp',)}
            this.gameOver = true

            if(this.whale2){
            this.whale2.destroy}
            if(this.shark2){
            this.shark2.destroy}
            if(this.whale3){
            this.whale3.destroy}

            this.player.play('death', true).once('animationcomplete', () => {
                this.add.text(game.config.width/2, game.config.height/2 + 3, 'GAME OVER', scoreConfig).setOrigin(0.5)
                this.add.text(game.config.width/2, game.config.height/2 + 64, `YOU SWAM ${this.p1Score} M`, scoreConfig).setOrigin(0.5)
                this.add.text(game.config.width/2, game.config.height/2 + 96, 'Art and Music made by Nate SFX from Splice', scoreConfig).setOrigin(0.5)

                this.add.text(game.config.width/2, game.config.height/2 + 128, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5) 
                this.gameDone = true
            

            })
        })

        this.physics.add.overlap(this.player, this.sharks, (player, shark) => {
            console.log('shark and player ')
            this.player.setVelocity(0,0)  
            this.player.setVelocity(0,-10)  
            
            this.player.update

            if(!this.gameOver){this.sound.play('chomp',)}
            this.gameOver = true
            if(this.whale2){
            this.whale2.destroy}
            if(this.shark2){
            this.shark2.destroy}
            if(this.whale3){
            this.whale3.destroy}
            
            this.player.play('death', true).once('animationcomplete', () => {
                this.add.text(game.config.width/2, game.config.height/2 + 32, 'GAME OVER', scoreConfig).setOrigin(0.5)
                this.add.text(game.config.width/2, game.config.height/2 + 64, `YOU SWAM ${this.p1Score} M`, scoreConfig).setOrigin(0.5)
                this.add.text(game.config.width/2, game.config.height/2 + 96, 'Art and Music made by Nate SFX from Splice', scoreConfig).setOrigin(0.5)

                this.add.text(game.config.width/2, game.config.height/2 + 128, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5)
                this.gameDone = true
                
            
    
            })
        })

        this.sound.play('music', {
            volume: .1 , 
            loop: true,
            delay: 0,
        }) 
    }

    update() {
        //Check for restart
        if(this.gameDone && Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.sound.stopAll
            if (this.sound.get('music')) {
                this.sound.stopByKey('music');
            }


            this.sound.play('select')
            if (this.whale2) {
                this.whale2.destroy();  
                this.whale2 = null;  // Prevents stale references
            }
            if (this.whale3) {
                this.whale3.destroy();
                this.whale3 = null;
            }
            if (this.shark2) {
                this.shark2.destroy();
                this.shark2 = null;
            }
            this.scene.restart()
            
        }
        if(this.gameDone && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.sound.stopAll
            this.sound.play('select')
            if (this.sound.get('music')) {
                this.sound.stopByKey('music');
            }

            if (this.whale2) {
                this.whale2.destroy();  
                this.whale2 = null;  // Prevents stale references
            }
            if (this.whale3) {
                this.whale3.destroy();
                this.whale3 = null;
            }
            if (this.shark2) {
                this.shark2.destroy();
                this.shark2 = null;
            }
            this.scene.start('menuScene')
        }

        if (!this.gameOver) {
            // Update 
            this.player.update();
            this.whale.update();
            this.shark.update();

            if (this.whale2) {  // Only update if whale2 exists
                this.whale2.update();
                this.whale2.play('anim', true)
            }

            if (this.whale3) {  // Only update if whale2 exists
                this.whale3.update();
                this.whale3.play('anim', true)
            }

            if (this.shark2) {  // Only update if shark2 exists
                this.shark2.update();
                this.shark2.play('swim', true)
            }

            this.player.play('idle', true);
            this.whale.play('anim', true);
            this.shark.play('swim', true);

            // Increase Whale Speed
            if (this.whale.moveSpeed < 3){
                this.whale.moveSpeed +=  .005 }

            if (this.whale2){
                if (this.whale2.moveSpeed < 3){
                this.whale2.moveSpeed +=  .005 }
            }

            if (this.whale3){
                if (this.whale3.moveSpeed < 3){
                this.whale3.moveSpeed +=  .005 }
            }

            //Increase Shark Speed 

            if (this.shark.moveSpeed < 6 ){ 
                this.shark.moveSpeed +=  .007
            }

            if (this.shark2){
                if (this.shark2.moveSpeed < 6 ){ 
                    this.shark2.moveSpeed +=  .007
                }
            }
    
            // Move Tile Parallax

            this.farBG.tilePositionX += 0.2;
            this.sand.tilePositionX += 0.7;
            this.foreground.tilePositionX += 1;
        
            

            // add whale at 50 & 150 pts

            if (this.p1Score == 50 &&  !this.whale2) {
                console.log('added whale')
                this.whale2 = new Whale(this, this.game.config.width + this.textures.get('whale').getSourceImage().width, Phaser.Math.Between(0 + this.textures.get('whale').getSourceImage().height, this.game.config.height - this.textures.get('whale').getSourceImage().height), 'whale', 0)
                this.whales.add(this.whale2)

                this.whale2.flipX=true
                this.whale2.setOrigin(.5,.5)

            } 

             // add whale at 50 pts
             if (this.p1Score == 150) {
                console.log('added whale')
                this.whale3 = new Whale(this, this.game.config.width + this.textures.get('whale').getSourceImage().width, Phaser.Math.Between(0 + this.textures.get('whale').getSourceImage().height, this.game.config.height - this.textures.get('whale').getSourceImage().height), 'whale', 0)
                this.whales.add(this.whale3)

                this.whale3.flipX=true
                this.whale3.setOrigin(.5,.5)

            } 

            // add shark at 100 pts
            if (this.p1Score == 100) {
                console.log('added shark')
                this.shark2 = new Shark(this, this.game.config.width + this.textures.get('shark').getSourceImage().width, Phaser.Math.Between(0, this.game.config.height - this.textures.get('shark').getSourceImage().height), 'shark', 0)
                this.sharks.add(this.shark2)
            }
    
        
        }
        
    }
    
}