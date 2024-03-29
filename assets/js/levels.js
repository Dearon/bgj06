levels = {
	1: {
		layout: [['r', ' ', ' ']],
		start: [0, 0],
		goalsLeft: {
			r: 3,
			o: 0,
			y: 0,
			g: 0,
			b: 0,
			i: 0,
			v: 0,
			total: 3
		},
		text: "You can move with the arrow keys, but only on tiles you\nhaven't visited yet."
	},
	2: {
		layout: [['r', ' ', 'O', ' ']],
		start: [0, 0],
		goalsLeft: {
			r: 2,
			o: 2,
			y: 0,
			g: 0,
			b: 0,
			i: 0,
			v: 0,
			total: 4
		},
		text: "Move over a existing color to use that color."
	},
	3: {
		layout: [['r', ' ', 'O'],
			 [' ', 'B', ' ']],
		start: [0, 0],
		goalsLeft: {
			r: 2,
			o: 2,
			y: 0,
			g: 0,
			b: 2,
			i: 0,
			v: 0,
			total: 6
		},
		text: "Look at the sidebar to see how many tiles of each color you still need."
	},
	4: {
		layout: [['r', ' ', ' ', ' ', ' ', ' ', ' '],
			 [' ', ' ', ' ', ' ', ' ', ' ', 'O'],
			 ['Y', ' ', ' ', ' ', ' ', ' ', ' '],
			 [' ', ' ', ' ', ' ', ' ', ' ', 'G'],
			 ['B', ' ', ' ', ' ', ' ', ' ', ' '],
			 [' ', ' ', ' ', ' ', ' ', ' ', 'I'],
			 ['V', ' ', ' ', ' ', ' ', ' ', ' ']],
		start: [0, 0],
		goalsLeft: {
			r: 7,
			o: 7,
			y: 7,
			g: 7,
			b: 7,
			i: 7,
			v: 7,
			total: 49
		},
		text: "Have fun!"
	},
	5: {
		layout: [['r', ' ', ' '],
			 ['O', 'I', ' '],
			 [' ', ' ', ' ']],
		start: [0, 0],
		goalsLeft: {
			r: 4,
			o: 4,
			y: 0,
			g: 0,
			b: 0,
			i: 1,
			v: 0,
			total: 9
		},
		text: ""
	},
	6: {
		layout: [[' ', 'G', ' ', 'B', ' '],
			 ['V', 'V', ' ', 'v', 'V'],
			 [' ', 'B', ' ', 'G', ' ']],
		start: [3, 1],
		goalsLeft: {
			r: 0,
			o: 0,
			y: 0,
			g: 4,
			b: 5,
			i: 0,
			v: 6,
			total: 15
		},
		text: ""
	}
};
