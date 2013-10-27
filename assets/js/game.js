function init() {
	var canvas = document.getElementById("game");
	var stage = new createjs.Stage(canvas);

	update(stage);

	Mousetrap.bind('up', function() {
		if (state['section'] == 'level') {
			var newPos = [state['position'][0], parseInt(state['position'][1]) - 1];
			handleInput(stage, newPos);
		}
	});
	Mousetrap.bind('down', function() {
		if (state['section'] == 'level') {
			var newPos = [state['position'][0], parseInt(state['position'][1]) + 1];
			handleInput(stage, newPos);
		}
	});
	Mousetrap.bind('left', function() {
		if (state['section'] == 'level') {
			var newPos = [parseInt(state['position'][0]) - 1, state['position'][1]];
			handleInput(stage, newPos);
		}
	});
	Mousetrap.bind('right', function() {
		if (state['section'] == 'level') {
			var newPos = [parseInt(state['position'][0]) + 1, state['position'][1]];
			handleInput(stage, newPos);
		}
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
	if (state['section'] == 'level') {
		if (level['goalsLeft']['total'] > 0) {
			var text = new createjs.Text("Goal:", "25px Arial", colors['sidebar_text']);
			text.x = 10;
			text.y = 10;
			stage.addChild(text);

			var text = new createjs.Text("", "15px Arial", colors['sidebar_text']);

			$.each(level['goalsLeft'], function(index, item) {
				if (index != 'total' && item > 0) {
					text.text += item + " blocks of " + colorNames[index] + " left.\n\n";
				}
			});

			text.x = 10;
			text.y = 45;
			stage.addChild(text);
		}

		// Reset level button
		var container = new createjs.Container();
		container.x = 10;
		container.y = 545;

		var bg = new createjs.Shape();
		bg.graphics.beginFill(colors['sidebar_bg']).drawRect(0, 0, 120, 20);
		container.addChild(bg);

		var text = new createjs.Text("Reset this level", "15px Arial", "#000");
		container.addChild(text);

		stage.addChild(container);

		container.addEventListener("click", function(evt) {
			state['level'] = $.extend(true, {}, levels[state['levelNumber']]);
			state['position'] = state['level']['start'];
			state['color'] = state['level']['layout'][state['position'][1]][state['position'][0]];

			check(stage);
			update(stage);
		});

		// Back to menu button
		var container = new createjs.Container();
		container.x = 10;
		container.y = 570;

		var bg = new createjs.Shape();
		bg.graphics.beginFill(colors['sidebar_bg']).drawRect(0, 0, 120, 20);
		container.addChild(bg);

		var text = new createjs.Text("Back to the menu", "15px Arial", "#000");
		container.addChild(text);

		stage.addChild(container);

		container.addEventListener("click", function(evt) {
			state['section'] = 'menu';
			update(stage);
		});
	}

	// Create the menu or puzzle
	if (state['section'] == 'menu') {
		var text = new createjs.Text("Choose a level:", "25px Arial", "#fff");
		text.x = sidebarWidth + 15;
		text.y = 15;
		stage.addChild(text);

		var x = sidebarWidth + 15;
		var y = 50;

		$.each(levels, function(index, item) {
			var container = new createjs.Container();
			container.x = x;
			container.y = y;

			var bg = new createjs.Shape();
			bg.graphics.beginFill(colors['game_bg']).drawRect(0, 0, 200, 16);
			container.addChild(bg);

			var text = new createjs.Text("Level " + index, "15px Arial", "#fff");
			container.addChild(text);

			stage.addChild(container);

			y += 18;

			container.addEventListener("click", function(evt) {
				state['section'] = 'level';
				state['level'] = $.extend(true, {}, levels[index]);
				state['levelNumber'] = index;
				state['position'] = state['level']['start'];
				state['color'] = state['level']['layout'][state['position'][1]][state['position'][0]];

				check(stage);
				update(stage);
			});
		});
	} else if (state['section'] == 'level') {
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

		if (level['goalsLeft']['total'] == 0) {
			var text = new createjs.Text("You've completed the level!", "30px Arial", "#fff");
			text.x = sidebarWidth + 25;
			text.y = 80;
			stage.addChild(text);
		}

		if (level['text'] != '') {
			var text = new createjs.Text(level['text'], "15px Arial", "#fff");
			text.lineHeight = 18;
			text.x = sidebarWidth + 15;
			text.y = 15;
			stage.addChild(text);
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

	level['goalsLeft'] = $.extend(true, {}, levels[state['levelNumber']]['goalsLeft']);
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
}
