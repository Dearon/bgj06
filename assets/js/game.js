function init() {
	var canvas = document.getElementById("game");
	var stage = new createjs.Stage(canvas);

	var level = levels[state['level']];
	state['position'] = levels[state['level']]['start'];
	state['color'] = level['layout'][state['position'][0]][state['position'][1]];

	update(stage, level);

	Mousetrap.bind('up', function() {
		var newPos = [state['position'][0], parseInt(state['position'][1]) - 1];
		handleInput(stage, level, newPos);
	});
	Mousetrap.bind('down', function() {
		var newPos = [state['position'][0], parseInt(state['position'][1]) + 1];
		handleInput(stage, level, newPos);
	});
	Mousetrap.bind('left', function() {
		var newPos = [parseInt(state['position'][0]) - 1, state['position'][1]];
		handleInput(stage, level, newPos);
	});
	Mousetrap.bind('right', function() {
		var newPos = [parseInt(state['position'][0]) + 1, state['position'][1]];
		handleInput(stage, level, newPos);
	});
}

function update(stage, level) {
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

	for (var i = 0; i < level['goals'].length; i++) {
		var goal = level['goals'][i];

		var blocksNeeded = goal[1];
		var colorName = colorNames[goal[0]];

		var text = new createjs.Text(blocksNeeded + " blocks of " + colorName + " needed.", "15px Arial", colors['sidebar_text']);
		text.x = 10;
		text.y = 45 * (i + 1);
		stage.addChild(text);
	}

	// Render what we've set up so far
	stage.update();

	// Create the puzzle
	var width = level['layout'][0].length * 50;
	var height = level['layout'].length * 50;
	var xStart = ((stage.canvas.width + sidebarWidth) - width) / 2;
	var yStart = (stage.canvas.height - height) / 2;


	for(var i = 0; i < level['layout'].length; i++) {
		for(var j = 0; j < level['layout'][i].length; j++) {
			var tile = level['layout'][i][j];
			var x = xStart + (50 * j);
			var y = yStart + (50 * i);

			var block = new createjs.Shape();
			block.graphics.beginFill(colors[tile]).drawRect(x, y, blockSize, blockSize);
			stage.addChild(block);

			stage.update();
		}
	}
}

function handleInput(stage, level, newPos) {
	var width = level['layout'][0].length - 1;
	var height = level['layout'].length - 1;

	var newPosX = newPos[0];
	var newPosY = newPos[1];

	if (typeof level['layout'][newPosY] != 'undefined' && typeof level['layout'][newPosY][newPosX] != 'undefined' && level['layout'][newPosY][newPosX] == ' ') {
		state['position'][0] = newPosX;
		state['position'][1] = newPosY;
		level['layout'][newPosY][newPosX] = state['color'];

		update(stage, level);
	}
}
