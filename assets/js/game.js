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
state['color'] = '';

function init() {
	var canvas = document.getElementById("game");
	var stage = new createjs.Stage(canvas);

	var level = levels[state['level']];
	state['position'] = levels[state['level']]['start'];
	state['color'] = level['layout'][state['position'][0]][state['position'][1]];

	drawLevel(stage);
	runGame(stage);
}

function drawLevel(stage) {
	stage.clear();

	var level = levels[state['level']];
	var width = level['layout'][0].length * 50;
	var height = level['layout'].length * 50;
	var xStart = (stage.canvas.width - width) / 2;
	var yStart = (stage.canvas.height - height) / 2;

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
	var level = levels[state['level']];
	var width = level['layout'][0].length - 1;
	var height = level['layout'].length - 1;

	Mousetrap.bind('up', function() {
		if (0 < state['position'][1]) {
			newPos = parseInt(state['position'][1]) - 1;

			if (level['layout'][newPos][state['position'][0]] == ' ') {
				state['position'][1] = newPos;
				level['layout'][state['position'][1]][state['position'][0]] = state['color'];

				drawLevel(stage);

				console.log('Up: ' + state['position']);
			}
		}
	});
	Mousetrap.bind('down', function() {
		if (height > state['position'][1]) {
			newPos = parseInt(state['position'][1]) + 1;

			if (level['layout'][newPos][state['position'][0]] == ' ') {
				state['position'][1] = newPos;
				level['layout'][state['position'][1]][state['position'][0]] = state['color'];

				drawLevel(stage);

				console.log('Down: ' + state['position']);
			}
		}
	});
	Mousetrap.bind('left', function() {
		if (0 < state['position'][0]) {
			newPos = parseInt(state['position'][0]) - 1;

			if (level['layout'][state['position'][1]][newPos] == ' ') {
				state['position'][0] = newPos;
				level['layout'][state['position'][1]][state['position'][0]] = state['color'];

				drawLevel(stage);

				console.log('Left: ' + state['position']);
			}
		}
	});
	Mousetrap.bind('right', function() {
		if (width > state['position'][0]) {
			newPos = parseInt(state['position'][0]) + 1;

			if (level['layout'][state['position'][1]][newPos] == ' ') {
				state['position'][0] = newPos;
				level['layout'][state['position'][1]][state['position'][0]] = state['color'];

				drawLevel(stage);

				console.log('Right: ' + state['position']);
			}
		}
	});
}
