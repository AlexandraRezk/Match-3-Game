var Preload = function(game){};

Preload.prototype = {

	preload: function(){ 
        this.game.load.image('blue', 'assests/gemBlue.png');
        this.game.load.image('green', 'assests/gemGreen.png');
        this.game.load.image('red', 'assests/gemRed.png');
        this.game.load.image('yellow', 'assests/gemYellow.png');
	},

	create: function(){
		this.game.state.start("Main");
	}
}