class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        // load images/tile sprites
        this.load.image('farBG', './assets/SeaBG.png ');
        this.load.image('foreground', './assets/foreground.png');
        this.load.image('sand', './assets/sand.png');
      
        // load spritesheet
        this.load.spritesheet('diver', './assets/diver.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('whale','./assets/whale.png', {frameWidth: 64, frameHeight: 32 })
        this.load.spritesheet('shark','./assets/Shark.png', {frameWidth: 32})
       

        //load audio
        this.load.audio('music', './assets/EndlessRunnerMusic.mp3')
        this.load.audio('chomp','./assets/BiteCrunch_ZA01.38.wav')
        this.load.audio('select','./assets/MO_FN_foley_ui_select_sfx.wav')
       
    }

    create() {

        //Create Menu

        this.farBG = this.add.tileSprite(0, 0, this.scale.width, this.textures.get('farBG').getSourceImage().height, 'farBG').setOrigin(0, 0).setScale(3.9, 3.9)

        // Main Menu Text!

        let menuConfig = {
            fontFamily: 'Papyrus',
            fontSize: '28px',
            backgroundColor: 'DarkBlue',
            color: 'white',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }        
        
        // show menu text

        this.add.text(game.config.width/2, game.config.height/3 - borderUISize - borderPadding, 'Deep Sea Divers', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/3, 'Welcome to the depths of the Sea!', menuConfig).setOrigin(0.5)
        menuConfig.backgroundColor = 'blue'
        menuConfig.color = 'White'
        this.add.text(game.config.width/2, game.config.height/3 + borderUISize + borderPadding, 'Press Left and Right arrow to move, and Space to start swimming', menuConfig).setOrigin(0.5)

    
        // Add Animations
        this.anims.create({
            key: 'idle',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('diver', {
                start: 0, 
                end: 3})
        })

        this.anims.create({
        key: 'anim',
        frameRate: 5 ,
        repeat: -1,
        frames: this.anims.generateFrameNumbers('whale',{
            start: 0,
            end: 1,
        } )

        })

        this.anims.create({
            key: 'swim',
            frameRate: 10,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('shark',{
                start: 0,
                end: 2 
            })
        })

        this.anims.create({
            key: 'death',
            frameRate: 3,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('diver',{
                start: 4,
                end: 7
            })

            
        }) 
        


        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)


    }
    update() {
        
    //Play on Spacebar Press 

    if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
        this.scene.start('playScene')
        this.sound.play('select')
        }
    }
}