// global variables

var blockSize = 50;
var sidebarWidth = 205;

var colors = {
	' ': '#fff',
	r: '#ff0000',
	o: '#ff7f00',
	y: '#ffff00',
	g: '#00ff00',
	b: '#0000ff',
	i: '#4b0082',
	v: '#8f00ff',
	background: '#181818',
	sidebar_bg: '#D63D22',
	sidebar_text: '#000',
	game_bg: '#303030',
	circle: '#000'
};

var colorNames = {
	r: 'red',
	o: 'orange',
	y: 'yellow',
	g: 'green',
	b: 'blue',
	i: 'indigo',
	v: 'violet'
};

var state = {
	section: 'menu',
	level: {},
	position: [],
	color: ''
};
