function init() {
	var canvas = document.getElementById("game");
	var stage = new createjs.Stage(canvas);

	state['level'] = $.extend({}, levels[1]);
	state['levelNumber'] = 1;
	state['position'] = state['level']['start'];
	state['color'] = state['level']['layout'][state['position'][0]][state['position'][1]];

	check(stage);
	update(stage);

	Mousetrap.bind('up', function() {
		var newPos = [state['position'][0], parseInt(state['position'][1]) - 1];
		handleInput(stage, newPos);
	});
	Mousetrap.bind('down', function() {
		var newPos = [state['position'][0], parseInt(state['position'][1]) + 1];
		handleInput(stage, newPos);
	});
	Mousetrap.bind('left', function() {
		var newPos = [parseInt(state['position'][0]) - 1, state['position'][1]];
		handleInput(stage, newPos);
	});
	Mousetrap.bind('right', function() {
		var newPos = [parseInt(state['position'][0]) + 1, state['position'][1]];
		handleInput(stage, newPos);
	});
}

function update(stage) {
	stage.clear();
	var level = state['level'];

	// Create the background
	var bg = new createjs.Shape();
	bg.graphics.beginFill(colors['sidebar_bg']).drawRect(0, 0, sidebarWidth, stage.canvas.height);
	stage.addChild(bg);

	var border = new createjs.Shape();
	border.graphics.beginFill(colors['background']).drawRect(sidebarWidth - 5, 0, 5, stage.canvas.height);
	stage.addChild(border);

	var bg = new createjs.Shape();
	bg.graphics.beginFill(colors['game_bg']).drawRect(sidebarWidth, 0, stage.canvas.width - sidebarWidth, stage.canvas.height);
	stage.addChild(bg);

	// Create the sidebar
	var text = new createjs.Text("Goal:", "25px Arial", colors['sidebar_text']);
	text.x = 10;
	text.y = 10;
	stage.addChild(text);

	var text = new createjs.Text("", "15px Arial", colors['sidebar_text']);

	$.each(level['goalsLeft'], function(index, item) {
		if (index != 'total') {
			text.text += item + " blocks of " + colorNames[index] + " left.\n\n";
		}
	});

	text.x = 10;
	text.y = 45;
	stage.addChild(text);

	// Create the puzzle
	var width = level['layout'][0].length * 50;
	var height = level['layout'].length * 50;
	var xStart = ((stage.canvas.width + sidebarWidth) - width) / 2;
	var yStart = (stage.canvas.height - height) / 2;


	for(var i = 0; i < level['layout'].length; i++) {
		for(var j = 0; j < level['layout'][i].length; j++) {
			var tile = level['layout'][i][j].toLowerCase();
			var x = xStart + (50 * j);
			var y = yStart + (50 * i);

			var block = new createjs.Shape();
			block.graphics.beginFill(colors[tile]).drawRect(x, y, blockSize, blockSize);
			stage.addChild(block);

			if (state['position'][0] == j && state['position'][1] == i) {
				var circle = new createjs.Shape();
				circle.graphics.setStrokeStyle(4).beginStroke(colors['circle']);
				circle.graphics.drawCircle(x + 25, y + 25, 10);
				stage.addChild(circle);
			}

		}
	}

	// Show the whole thing
	stage.update();
}

function handleInput(stage, newPos) {
	var level = state['level'];
	var width = level['layout'][0].length - 1;
	var height = level['layout'].length - 1;

	var newPosX = newPos[0];
	var newPosY = newPos[1];

	if (typeof level['layout'][newPosY] != 'undefined' && typeof level['layout'][newPosY][newPosX] != 'undefined') {
		var move = false;
		if (level['layout'][newPosY][newPosX] == ' ') {
			move = true;
		} else if (level['layout'][newPosY][newPosX] == level['layout'][newPosY][newPosX].toUpperCase()) {
			state['color'] = level['layout'][newPosY][newPosX].toLowerCase();
			move = true;
		}

		if (move) {
			state['position'][0] = newPosX;
			state['position'][1] = newPosY;
			level['layout'][newPosY][newPosX] = state['color'];

			check(stage, level);
			update(stage, level);
		}
	}
}

function check(stage) {
	var level = state['level'];

	level['goalsLeft'] = $.extend({}, levels[state['levelNumber']]['goalsLeft']);
	for(var i = 0; i < level['layout'].length; i++) {
		for(var j = 0; j < level['layout'][i].length; j++) {
			var tile = level['layout'][i][j].toLowerCase();

			if (tile != ' ') {
				if (level['goalsLeft'][tile] > 0) {
					level['goalsLeft'][tile]--;
					level['goalsLeft']['total']--;
				}
			}
		}
	}

	console.log(level['goalsLeft']['total']);

	if (level['goalsLeft']['total'] == 0) {
		nextLevel();
	}
}

function nextLevel() {
	var next = state['levelNumber'] + 1;

	console.log(next);

	if (next <= 3) {
		state['level'] = $.extend({}, levels[next]);
		state['levelNumber'] = next;
		state['position'] = state['level']['start'];
		state['color'] = state['level']['layout'][state['position'][0]][state['position'][1]];
	}
}
