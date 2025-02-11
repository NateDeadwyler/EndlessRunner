// Code: Endless Runner: 
// Name: Nathan Deadwyler
// Date: 1/31/2025
// Description: This is a simple endless swimmer game where the player must avoid obstacles and go as far as they can
//The creative tilt is the unique 2 button control scheme that tilts the player up and down to avoid obstacles. The control scheme is meant to feel relativerly slow, because in the ocean, whales and sharks are huge! I also make music so this was a fun opportunity to make something that felt oceany.
// It took maybe 18 hours total

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