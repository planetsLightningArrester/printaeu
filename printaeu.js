const process = require('process');

const color = {
	//Modifiers
	reset: '\x1b[0m', //Reset to default
	bright: "\x1b[1m", //Brighter
	dim: "\x1b[2m", //Dim
	italic: "\x1b[3m", //Italic
	underscore: "\x1b[4m", //Put a underscore beneath everything
	reverse: "\x1b[7m", //Reverses the fore and background colors

	//Font colors
	black: "\x1b[30m",
	red: "\u001b[38;5;9m",
	green: "\u001b[38;5;10m",
	yellow: "\u001b[38;5;11m",
	blue: "\u001b[38;5;12m",
	magenta: "\u001b[38;5;13m",
	cyan: "\u001b[38;5;14m",
	white: "\u001b[38;5;15m",
	gray: "\u001b[38;5;248m",
	pink: "\u001b[38;5;213m",
	orange: "\u001b[38;5;214m",

	// Dim
	dimBlack: "\u001b[38;5;8m",	// Same as gray
	dimRed: "\x1b[31m",
	dimGreen: "\x1b[32m",
	dimYellow: "\x1b[33m",
	dimBlue: "\x1b[34m",
	dimMagenta: "\x1b[35m",
	dimCyan: "\x1b[36m",
	dimWhite: "\x1b[37m",
	dimGray: "\u001b[38;5;244m",
	dimPink: "\u001b[38;5;207m",
	dimOrange: "\u001b[38;5;208m",
	

	//Background colors
	blackBg: "\x1b[40m",
	redBg: "\x1b[41m",
	greenBg: "\x1b[42m",
	yellowBg: "\x1b[43m",
	blueBg: "\x1b[44m",
	magentaBg: "\x1b[45m",
	cyanBg: "\x1b[46m",
	whiteBg: "\x1b[47m",

	cls: '\033c'
};

let bg = {
	black: '',
	red: '',
	green: '',
	yellow: '',
	blue: '',
	magenta: '',
	cyan: '',
	white: '',
	gray: '',
	pink: '',
	orange: ''
};

let msOnOff = -5;

function getFunctionName(call = '') {
	return call.slice(call.indexOf('at ') + 3, call.indexOf(' ('));
}

function getFileName(call = '') {
	let splitted;
	if (call.includes('\\')) {
		splitted = call.split('\\');
	} else {
		splitted = call.split('/');
	}

	return splitted[splitted.length - 1].replace(')', '');
}

class Colors {

	constructor(modifier) {
		this.modifier = modifier;
	}

	log = (data, ...args) => {
		console.log(`${this.modifier}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	black = (data, ...args) => {
		console.log(`${this.modifier}${color.black}${bg.black}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	red = (data, ...args) => {
		console.log(`${this.modifier}${color.red}${bg.red}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	green = (data, ...args) => {
		console.log(`${this.modifier}${color.green}${bg.green}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	yellow = (data, ...args) => {
		console.log(`${this.modifier}${color.yellow}${bg.yellow}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	blue = (data, ...args) => {
		console.log(`${this.modifier}${color.blue}${bg.blue}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	magenta = (data, ...args) => {
		console.log(`${this.modifier}${color.magenta}${bg.magenta}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	cyan = (data, ...args) => {
		console.log(`${this.modifier}${color.cyan}${bg.cyan}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	white = (data, ...args) => {
		console.log(`${this.modifier}${color.white}${bg.white}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	gray = (data, ...args) => {
		console.log(`${this.modifier}${color.gray}${bg.gray}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	pink = (data, ...args) => {
		console.log(`${this.modifier}${color.pink}${bg.pink}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	orange = (data, ...args) => {
		console.log(`${this.modifier}${color.orange}${bg.orange}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

};

class DimColors {

	constructor(modifier) {
		this.modifier = modifier;
	}

	log = (data, ...args) => {
		console.log(`${this.modifier}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	black = (data, ...args) => {
		console.log(`${this.modifier}${color.dimBlack}${bg.black}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	red = (data, ...args) => {
		console.log(`${this.modifier}${color.dimRed}${bg.red}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	green = (data, ...args) => {
		console.log(`${this.modifier}${color.dimGreen}${bg.green}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	yellow = (data, ...args) => {
		console.log(`${this.modifier}${color.dimYellow}${bg.yellow}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	blue = (data, ...args) => {
		console.log(`${this.modifier}${color.dimBlue}${bg.blue}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	magenta = (data, ...args) => {
		console.log(`${this.modifier}${color.dimMagenta}${bg.magenta}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	cyan = (data, ...args) => {
		console.log(`${this.modifier}${color.dimCyan}${bg.cyan}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	white = (data, ...args) => {
		console.log(`${this.modifier}${color.dimWhite}${bg.white}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	gray = (data, ...args) => {
		console.log(`${this.modifier}${color.dimGray}${bg.gray}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	pink = (data, ...args) => {
		console.log(`${this.modifier}${color.dimPink}${bg.pink}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	orange = (data, ...args) => {
		console.log(`${this.modifier}${color.dimOrange}${bg.orange}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};
};

class InlineColors {

	constructor(modifier) {
		this.modifier = modifier;
	}

	log = (data, ...args) => {
		process.stdout.cursorTo(0);
		process.stdout.moveCursor(0, -1);
		process.stdout.clearLine();
		console.log(`${this.modifier}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	black = (data, ...args) => {
		process.stdout.cursorTo(0);
		process.stdout.moveCursor(0, -1);
		process.stdout.clearLine();
		console.log(`${this.modifier}${color.black}${bg.black}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	red = (data, ...args) => {
		process.stdout.cursorTo(0);
		process.stdout.moveCursor(0, -1);
		process.stdout.clearLine();
		console.log(`${this.modifier}${color.red}${bg.red}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	green = (data, ...args) => {
		process.stdout.cursorTo(0);
		process.stdout.moveCursor(0, -1);
		process.stdout.clearLine();
		console.log(`${this.modifier}${color.green}${bg.green}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	yellow = (data, ...args) => {
		process.stdout.cursorTo(0);
		process.stdout.moveCursor(0, -1);
		process.stdout.clearLine();
		console.log(`${this.modifier}${color.yellow}${bg.yellow}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	blue = (data, ...args) => {
		process.stdout.cursorTo(0);
		process.stdout.moveCursor(0, -1);
		process.stdout.clearLine();
		console.log(`${this.modifier}${color.blue}${bg.blue}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	magenta = (data, ...args) => {
		process.stdout.cursorTo(0);
		process.stdout.moveCursor(0, -1);
		process.stdout.clearLine();
		console.log(`${this.modifier}${color.magenta}${bg.magenta}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	cyan = (data, ...args) => {
		process.stdout.cursorTo(0);
		process.stdout.moveCursor(0, -1);
		process.stdout.clearLine();
		console.log(`${this.modifier}${color.cyan}${bg.cyan}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	white = (data, ...args) => {
		process.stdout.cursorTo(0);
		process.stdout.moveCursor(0, -1);
		process.stdout.clearLine();
		console.log(`${this.modifier}${color.white}${bg.white}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};
	
	gray = (data, ...args) => {
		process.stdout.cursorTo(0);
		process.stdout.moveCursor(0, -1);
		process.stdout.clearLine();
		console.log(`${this.modifier}${color.gray}${bg.gray}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	pink = (data, ...args) => {
		process.stdout.cursorTo(0);
		process.stdout.moveCursor(0, -1);
		process.stdout.clearLine();
		console.log(`${this.modifier}${color.pink}${bg.pink}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	orange = (data, ...args) => {
		process.stdout.cursorTo(0);
		process.stdout.moveCursor(0, -1);
		process.stdout.clearLine();
		console.log(`${this.modifier}${color.orange}${bg.orange}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};
};

class InlineDimColors {

	constructor(modifier) {
		this.modifier = modifier;
	}

	log = (data, ...args) => {
		process.stdout.cursorTo(0);
		process.stdout.moveCursor(0, -1);
		process.stdout.clearLine();
		console.log(`${this.modifier}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	black = (data, ...args) => {
		process.stdout.cursorTo(0);
		process.stdout.moveCursor(0, -1);
		process.stdout.clearLine();
		console.log(`${this.modifier}${color.dimBlack}${bg.black}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	red = (data, ...args) => {
		process.stdout.cursorTo(0);
		process.stdout.moveCursor(0, -1);
		process.stdout.clearLine();
		console.log(`${this.modifier}${color.dimRed}${bg.red}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	green = (data, ...args) => {
		process.stdout.cursorTo(0);
		process.stdout.moveCursor(0, -1);
		process.stdout.clearLine();
		console.log(`${this.modifier}${color.dimGreen}${bg.green}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	yellow = (data, ...args) => {
		process.stdout.cursorTo(0);
		process.stdout.moveCursor(0, -1);
		process.stdout.clearLine();
		console.log(`${this.modifier}${color.dimYellow}${bg.yellow}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	blue = (data, ...args) => {
		process.stdout.cursorTo(0);
		process.stdout.moveCursor(0, -1);
		process.stdout.clearLine();
		console.log(`${this.modifier}${color.dimBlue}${bg.blue}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	magenta = (data, ...args) => {
		process.stdout.cursorTo(0);
		process.stdout.moveCursor(0, -1);
		process.stdout.clearLine();
		console.log(`${this.modifier}${color.dimMagenta}${bg.magenta}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	cyan = (data, ...args) => {
		process.stdout.cursorTo(0);
		process.stdout.moveCursor(0, -1);
		process.stdout.clearLine();
		console.log(`${this.modifier}${color.dimCyan}${bg.cyan}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	white = (data, ...args) => {
		process.stdout.cursorTo(0);
		process.stdout.moveCursor(0, -1);
		process.stdout.clearLine();
		console.log(`${this.modifier}${color.dimWhite}${bg.white}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};
	
	gray = (data, ...args) => {
		process.stdout.cursorTo(0);
		process.stdout.moveCursor(0, -1);
		process.stdout.clearLine();
		console.log(`${this.modifier}${color.dimGray}${bg.gray}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	pink = (data, ...args) => {
		process.stdout.cursorTo(0);
		process.stdout.moveCursor(0, -1);
		process.stdout.clearLine();
		console.log(`${this.modifier}${color.dimPink}${bg.pink}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	orange = (data, ...args) => {
		process.stdout.cursorTo(0);
		process.stdout.moveCursor(0, -1);
		process.stdout.clearLine();
		console.log(`${this.modifier}${color.dimOrange}${bg.orange}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};
};

module.exports = new class Print {

	constructor() {
		this._socket = null;
		this.msOnOff = -5;
		this.bright = new Colors(color.bright);
		this.bold = new Colors(color.bright);
		this.italic = new Colors(color.italic);
		this.dim = new DimColors(color.dim);
		this.underscore = new Colors(color.underscore);
		this.reverse = new Colors(color.reverse);
		this.inline = {
			bright: new InlineColors(color.bright),
			bold: new InlineColors(color.bright),
			italic: new InlineColors(color.italic),
			dim: new InlineDimColors(color.dim),
			underscore: new InlineColors(color.underscore),
			reverse: new InlineColors(color.reverse),
			log: (data, ...args) => {
				process.stdout.cursorTo(0);
				process.stdout.moveCursor(0, -1);
				process.stdout.clearLine();
				console.log(timeStamp() + data, args.reduce((t, e) => t + e + ' ', ''));
				if (this._socket) this._socket.emit('console', timeStamp() + data);
			},

			black: (data, ...args) => {
				process.stdout.cursorTo(0);
				process.stdout.moveCursor(0, -1);
				process.stdout.clearLine();
				console.log(`${color.black}${bg.black}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
				process.stdout.write(color.reset);
			},

			red: (data, ...args) => {
				process.stdout.cursorTo(0);
				process.stdout.moveCursor(0, -1);
				process.stdout.clearLine();
				console.log(`${color.red}${bg.red}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
				process.stdout.write(color.reset);
			},

			green: (data, ...args) => {
				process.stdout.cursorTo(0);
				process.stdout.moveCursor(0, -1);
				process.stdout.clearLine();
				console.log(`${color.green}${bg.green}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
				process.stdout.write(color.reset);
			},

			yellow: (data, ...args) => {
				process.stdout.cursorTo(0);
				process.stdout.moveCursor(0, -1);
				process.stdout.clearLine();
				console.log(`${color.yellow}${bg.yellow}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
				process.stdout.write(color.reset);
			},

			blue: (data, ...args) => {
				process.stdout.cursorTo(0);
				process.stdout.moveCursor(0, -1);
				process.stdout.clearLine();
				console.log(`${color.blue}${bg.blue}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
				process.stdout.write(color.reset);
			},

			magenta: (data, ...args) => {
				process.stdout.cursorTo(0);
				process.stdout.moveCursor(0, -1);
				process.stdout.clearLine();
				console.log(`${color.magenta}${bg.magenta}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
				process.stdout.write(color.reset);
			},

			cyan: (data, ...args) => {
				process.stdout.cursorTo(0);
				process.stdout.moveCursor(0, -1);
				process.stdout.clearLine();
				console.log(`${color.cyan}${bg.cyan}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
				process.stdout.write(color.reset);
			},

			white: (data, ...args) => {
				process.stdout.cursorTo(0);
				process.stdout.moveCursor(0, -1);
				process.stdout.clearLine();
				console.log(`${color.white}${bg.white}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
				process.stdout.write(color.reset);
			},

			gray: (data, ...args) => {
				process.stdout.cursorTo(0);
				process.stdout.moveCursor(0, -1);
				process.stdout.clearLine();
				console.log(`${color.gray}${bg.gray}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
				process.stdout.write(color.reset);
			},

			pink: (data, ...args) => {
				process.stdout.cursorTo(0);
				process.stdout.moveCursor(0, -1);
				process.stdout.clearLine();
				console.log(`${color.pink}${bg.pink}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
				process.stdout.write(color.reset);
			},

			orange: (data, ...args) => {
				process.stdout.cursorTo(0);
				process.stdout.moveCursor(0, -1);
				process.stdout.clearLine();
				console.log(`${color.orange}${bg.orange}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
				process.stdout.write(color.reset);
			}

		}
	}

	socket = (_socket) => {
		this._socket = _socket;
	};

	log = (data, ...args) => {
		console.log(timeStamp() + data, args.reduce((t, e) => t + e + ' ', ''));
		if (this._socket) this._socket.emit('console', timeStamp() + data);
	};

	goBacknLines = function (lines) {
		process.stdout.cursorTo(0);
		process.stdout.moveCursor(0, -lines);
		process.stdout.clearLine();
	};

	clearLine = function (lines = 0) {
		process.stdout.cursorTo(0);
		process.stdout.moveCursor(0, -lines);
		process.stdout.clearLine();
	};

	clear = function () {
		process.stdout.write(color.cls);
	};

	showMs = (showMs = true) => {
		if (showMs) {
			msOnOff = -1;
		} else {
			msOnOff = -5;
		}
	};

	black = (data, ...args) => {
		console.log(`${color.black}${bg.black}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	red = (data, ...args) => {
		console.log(`${color.red}${bg.red}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	green = (data, ...args) => {
		console.log(`${color.green}${bg.green}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	yellow = (data, ...args) => {
		console.log(`${color.yellow}${bg.yellow}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	blue = (data, ...args) => {
		console.log(`${color.blue}${bg.blue}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	magenta = (data, ...args) => {
		console.log(`${color.magenta}${bg.magenta}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	cyan = (data, ...args) => {
		console.log(`${color.cyan}${bg.cyan}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	white = (data, ...args) => {
		console.log(`${color.white}${bg.white}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	gray = (data, ...args) => {
		console.log(`${color.gray}${bg.gray}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	pink = (data, ...args) => {
		console.log(`${color.pink}${bg.pink}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	orange = (data, ...args) => {
		console.log(`${color.orange}${bg.orange}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	track = (errObj) => {

		this.bright.red('Error trace: ');

		let calls = errObj.stack.toString().split("\n");
		let index = 0;

		for (let i = calls.length - 1; i > 0; i--) {
			const call = calls[i];

			let functionName = getFunctionName(call);
			let fileName = getFileName(call);

			if (!index) {
				process.stdout.write(`${color.bright}${color.white}[call] ${color.reset}${functionName}(${fileName})\n`);
				index++;	// To start from 2
			} else if (index !== (calls.length - 1)) {
				process.stdout.write(`[${index}] ${functionName}(${fileName})\n`);
			} else {
				process.stdout.write(`${color.bright}${color.white}[throw] ${color.reset}${functionName}(${fileName})\n`);
			}

			index++;
		}
	};

	setBg = {
		black: (newBG) => {
			bg.black = color[newBG + 'Bg'];
		},
		red: (newBG) => {
			bg.red = color[newBG + 'Bg'];
		},
		green: (newBG) => {
			bg.green = color[newBG + 'Bg'];
		},
		yellow: (newBG) => {
			bg.yellow = color[newBG + 'Bg'];
		},
		blue: (newBG) => {
			bg.blue = color[newBG + 'Bg'];
		},
		magenta: (newBG) => {
			bg.magenta = color[newBG + 'Bg'];
		},
		cyan: (newBG) => {
			bg.cyan = color[newBG + 'Bg'];
		},
		white: (newBG) => {
			bg.white = color[newBG + 'Bg'];
		},
		gray: (newBG) => {
			bg.gray = color[newBG + 'Bg'];
		},
		pink: (newBG) => {
			bg.pink = color[newBG + 'Bg'];
		},
		orange: (newBG) => {
			bg.orange = color[newBG + 'Bg'];
		}
	};

	clearBg = {
		black: () => {
			bg.black = '';
		},
		red: () => {
			bg.red = '';
		},
		green: () => {
			bg.green = '';
		},
		yellow: () => {
			bg.yellow = '';
		},
		blue: () => {
			bg.blue = '';
		},
		magenta: () => {
			bg.magenta = '';
		},
		cyan: () => {
			bg.cyan = '';
		},
		white: () => {
			bg.white = '';
		},
		gray: () => {
			bg.gray = '';
		},
		pink: () => {
			bg.pink = '';
		},
		orange: () => {
			bg.orange = '';
		}
	};

};

function timeStamp() {
	let time = new Date();
	time = (time.getHours() >= 10 ? time.getHours() : ('0' + time.getHours())) + ':' + (time.getMinutes() >= 10 ? time.getMinutes() : ('0' + time.getMinutes())) + ':' + (time.getSeconds() >= 10 ? time.getSeconds() : ('0' + time.getSeconds())) + '.' + (time.getMilliseconds() >= 10 ? (time.getMilliseconds() >= 100 ? time.getMilliseconds() : '0' + time.getMilliseconds()) : ('00' + time.getMilliseconds())) + ' ';
	return '[' + time.slice(0, msOnOff) + '] ';
}