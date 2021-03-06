/**
Author: Paul Scarrone
Date: 11-17-2012
**/

var globals = require('./globals');
var gamejs = require('gamejs');
var view = require('./view');
var tile = require('./tile');
var player = require('./player');

// gamejs.preload([]);

gamejs.preload(globals.imgArray());

gamejs.ready(function() {

    var display = gamejs.display.setMode(globals.screenDim);
    //display.blit(new gamejs.image.load('assets/tiles/tiletest.png'));
    //var tile = new tile.Tile([64, 64]);
    var mainSurface = gamejs.display.getSurface();
    var tileGroupControl = tile.Setup([]);;
    var myPlayer = new player.Player([500,370], tileGroupControl);
    globals.Player = myPlayer;
    display.blit(new gamejs.image.load('assets/town.png'));
    //myPlayer.draw(mainSurface);
    var HUD = new view.HUD;
    myPlayer.tileControl.move([(globals.screenDim[0]/2)/2,0]);
    var tick = function(msDuration) {
        gamejs.event.get().forEach(function(event) {
            myPlayer.handle(event);
            myPlayer.upgrades.forEach(function(item){
                item.handle(event);
            });

        });
        display.clear();
        tileGroupControl.tileGroup.draw(mainSurface);
        //myPlayer.addInventory("Coal");
        //myPlayer.addInventory("Red Gem");
        //myPlayer.addInventory("Blue Gem");
        //myPlayer.addInventory("Green Gem");
        //myPlayer.addInventory("Diamond");
        myPlayer.update(msDuration);
        myPlayer.draw(mainSurface);
        HUD.draw(mainSurface);
        HUD.update(myPlayer, display);
    }
    gamejs.time.fpsCallback(tick, this, 60);
    var powerUpdate = function(msDuration){
        myPlayer.removeCoal();
        console.log(globals.gameDeath);
    }
    gamejs.time.fpsCallback(powerUpdate, this, globals.gameDeath);
    /**
    function tick(msDuration) {
        // game loop
        return;
    };
    gamejs.time.fpsCallback(tick, this, 60);
    **/
});
