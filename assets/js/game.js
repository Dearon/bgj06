levels = {};
levels[1] = {};
levels[1]['layout'] = [[' ', ' ', ' '],
		       [' ', 'r', ' '],
		       [' ', ' ', ' ']];
levels[1]['start'] = ['1', '1'];

var blockSize = 50;

var colors = {};
colors[' '] = '#fff';
colors['r'] = '#ff0000';

var state = {};
state['level'] = '1';
state['position'] = [];

function init() {
	var canvas = document.getElementById("game");
	var stage = new createjs.Stage(canvas);

	drawLevel(stage);
	runGame(stage);
}

function drawLevel(stage) {
	var level = levels[state['level']];
	var width = level['layout'][0].length * 50;
	var height = level['layout'].length * 50;
	var xStart = (stage.canvas.width - width) / 2;
	var yStart = (stage.canvas.height - height) / 2;

	console.log(xStart + " " + yStart);

	var block = new createjs.Shape();

	for(var i = 0; i < level['layout'].length; i++) {
		for(var j = 0; j < level['layout'][i].length; j++) {
			var x = xStart + (50 * j);
			var y = yStart + (50 * i);

			block.graphics.beginFill(colors[level['layout'][i][j]]).drawRect(x, y, blockSize, blockSize);
			stage.addChild(block);

			stage.update();
		}
	}
}

function runGame(stage) {
	Mousetrap.bind('up', function() {
		console.log('up');
	});
	Mousetrap.bind('down', function() {
		console.log('down');
	});
	Mousetrap.bind('left', function() {
		console.log('left');
	});
	Mousetrap.bind('right', function() {
		console.log('right');
	});
}
