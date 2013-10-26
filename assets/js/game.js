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
colors['sidebar_text'] = '#000';
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
	checkWin(stage);
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

	var text = new createjs.Text("Goal:", "25px Arial", colors['sidebar_text']);
	text.x = 10;
	text.y = 10;
	stage.addChild(text);
	stage.update();

	var level = levels[state['level']];

	for (var i = 0; i < level['goals'].length; i++) {
		var goalMessage = level['goals'][i][1] + " blocks of ";
		if (level['goals'][i][0] == 'r') {
			goalMessage = goalMessage + "red";
		}
		goalMessage = goalMessage + " needed";

		var text = new createjs.Text(goalMessage, "15px Arial", colors['sidebar_text']);
		text.x = 10;
		text.y = 45;
		stage.addChild(text);
		stage.update();
	}
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

function checkWin(stage) {
	var level = levels[state['level']];
	var tiles = { r: 0 };

	for(var i = 0; i < level['layout'].length; i++) {
		for(var j = 0; j < level['layout'][i].length; j++) {
			if (level['layout'][j][i] == 'r') {
				tiles['r']++;
			}
		}
	}

	var won = true;

	for (var i = 0; i < level['goals'].length; i++) {
		if (level['goals'][i][1] > tiles[level['goals'][i][0]]) {
			won = false;
		}
	}

	if (won) {
		var text = new createjs.Text("You win! Yay", "80px Arial", colors['sidebar_text']);
		text.x = 100;
		text.y = 200;
		stage.addChild(text);
		stage.update();
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
			}
		}
	});
}
