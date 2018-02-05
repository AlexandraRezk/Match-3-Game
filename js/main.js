var Main = function(game){

};

Main.prototype = {

	create: function() {
        var me = this;
        //background color for game
        me.game.stage.backgroundColor = "34495f";
        
        //Declare assets that will be used as tiles
        me.tileTypes = [
            'blue',
            'green',
            'red',
            'yellow'
        ];
        
        //Keep track of the users score
        me.score = 0;
        
        //Keep track of  the tiles the user is trying to swap (if any)
        me.activeTile1 = null;
        me.activeTile2 = null;
        
        //Controls whether the player can make a move or not
        me.canMove = false;
        
        //Grab the weigh and height of the tiles (assumes same size for all tiles)
        me.tileWidth = me.game.cache.getImage('blue').width;
        me.titleHeight = me.game.cache.getImage('blue').height;
        
        //This will hold all of the tile sprites
        me.tiles = me.game.add.group();
        
        //Initialise tile grid, this array will hold the positions of the tiles
        //Create whatever shape you'd like
        me.tileGrid = [
            [null, null, null, null, null, null],
            [null, null, null, null, null, null],
            [null, null, null, null, null, null],
            [null, null, null, null, null, null],
            [null, null, null, null, null, null],
            [null, null, null, null, null, null]
        ];
        
        //Create a random data generator to use later
        var seed = Date.now();
        me.random = new Phaser.RandomDataGenerator([seed]);
        
        //Trigger the initTiles function
        me.initTiles();
	},
    
    initTiles: function(){
        var me = this;
        
        //Loop through each column in the grid
        for(var i = 0; i < me.tileGrid.length; i++){
            
            //Loop through each position in a specific column, starting from the top
            for(var j = 0; j < me.tileGrid.length; j++){
                
                //Add the tile to the game at this grid position
                var tile = me.addTile(i, j);
                
                //Keep a track of the tiles position in our tileGrid
                me.tileGrid[i][j] = tile;
            }
        }
        
        //Once the tiles are ready, check for any matches on the grid
        me.game.time.events.add(600, function(){
            me.checkMatch();
        });
    },
    
    addTile: function(x, y){
        var me = this;
        
        //Choose a random tile to add
        var tileToAdd = me.tileTypes[me.random.integerInRange(0, me.tileTypes.length - 1)];
        
        //Add the tile at the correct x position, but add it to the top of the game (so we can slide it in)
        var tile = me.tiles.create((x * me.tileWidth) + me.tileWidth / 2, 0, tileToAdd);
        
        //Animate the tile into the correct vertical position
        me.game.add.tween(tile).to({y : y * me.titleHeight + (me.titleHeight / 2)}, 500, Phaser.Easing.Linear.In, true);
        
        //Set the tiles anchor point to the center
        tile.anchor.setTo(0.5, 0.5);
        
        //Enable input on the tile
        tile.inputEnabled = true;
        
        //Keep track of the type of tile that was added
        tile.tileType = tileToAdd;
        
        //Trigger the tileDown function whenever the user clicks or taps on this tile
        tile.events.onInputDown.add(me.tileDown, me);
        
        return tile;
    },
    
    tileDown: function(tile, pointer){
        var me = this;
        
        //Keep track of where the user originally clicked
        if(me.canMove){
            me.activeTile1 = tile;
            
            me.startPosX = (tile.x - me.tileWidth / 2) / me.tileWidth;
            me.startPosY = (tile.y - me.titleHeight / 2) / me.titleHeight;
        }
    },
    
	update: function() {

	},

	gameOver: function(){
		this.game.state.start('GameOver');
	}

};