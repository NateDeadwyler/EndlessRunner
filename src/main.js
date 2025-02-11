// Code: Endless Runner: 
// Name: Nathan Deadwyler
// Date: 1/31/2025
// Description: This is a simple endless runner game where the player must avoid obstacles and collect ...... to increase their score.
//The creative tilt is the unique 2 button control scheme that tilts the player up and down to avoid obstacles.



// Pixel Art Diver by Daniel Kole Productions
//32x32 Animated Shark Sprite by Sergeant_Slash
"use strict"

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 640,
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false ,
            gravity: {y: 0 },
            syncBounds: true,
            spriteBounds: true
        }
    },
    scene: [Menu, Play]
}

let game = new Phaser.Game(config)

let cursors
let { height, width } = game.config

//Border Size
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3


// reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT, keySPACE