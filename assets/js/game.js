levels = {};
levels[1] = {};
levels[1]['layout'] = [[' ', ' ', ' '],
		       [' ', 'r', ' '],
		       [' ', ' ', ' ']];
levels[1]['start'] = ['1', '1'];

var blockSize = 50;
var sidebarWidth = 205;

var colors = {};
colors[' '] = '#fff';
colors['r'] = '#ff0000';
colors['o'] = '#ff7f00';
colors['y'] = '#ffff00';
colors['g'] = '#00ff00';
colors['b'] = '#0000ff';
colors['i'] = '#4b0082';
colors['v'] = '#8f00ff';
colors['background'] = '#181818';
colors['sidebar_bg'] = '#D63D22';
colors['game_bg'] = '#303030';

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

	draw(stage);
	runGame(stage);
}

function draw(stage) {
	stage.clear();
	drawSidebar(stage);
	drawLevel(stage);
}

function drawSidebar(stage) {
	var bg = new createjs.Shape();
	bg.graphics.beginFill(colors['sidebar_bg']).drawRect(0, 0, sidebarWidth, stage.canvas.height);
	stage.addChild(bg);
	stage.update();

	var border = new createjs.Shape();
	border.graphics.beginFill(colors['background']).drawRect(sidebarWidth - 5, 0, 5, stage.canvas.height);
	stage.addChild(border);
	stage.update();

}

function drawLevel(stage) {
	var level = levels[state['level']];
	var width = level['layout'][0].length * 50;
	var height = level['layout'].length * 50;
	var xStart = ((stage.canvas.width + sidebarWidth) - width) / 2;
	var yStart = (stage.canvas.height - height) / 2;

	var bg = new createjs.Shape();
	bg.graphics.beginFill(colors['game_bg']).drawRect(sidebarWidth, 0, stage.canvas.width - sidebarWidth, stage.canvas.height);
	stage.addChild(bg);
	stage.update();

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

				draw(stage);

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

				draw(stage);

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

				draw(stage);

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

				draw(stage);

				console.log('Right: ' + state['position']);
			}
		}
	});
}
