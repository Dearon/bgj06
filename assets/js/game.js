level01 = [[' ', ' ', ' '],
	   [' ', 'S', ' '],
	   [' ', ' ', ' ']];

var blockSize = 50;

var colors = {};
colors[' '] = '#fff';
colors['S'] = '#ff0000';

function init() {
	var canvas = document.getElementById("game");
	var stage = new createjs.Stage(canvas);

	drawLevel(stage);
	runGame(stage);
}

function drawLevel(stage) {
	console.log(level01);

	var width = level01[0].length * 50;
	var height = level01.length * 50;
	var xStart = (stage.canvas.width - width) / 2;
	var yStart = (stage.canvas.height - height) / 2;

	console.log(xStart + " " + yStart);

	var block = new createjs.Shape();

	for(var i = 0; i < level01.length; i++) {
		for(var j = 0; j < level01[i].length; j++) {
			var x = xStart + (50 * j);
			var y = yStart + (50 * i);

			block.graphics.beginFill(colors[level01[i][j]]).drawRect(x, y, blockSize, blockSize);
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
