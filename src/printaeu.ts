import { Socket } from "node:dgram";

import * as readline from "readline";
import * as fs from "fs";

interface Printers {
	log			(data: any, ...args: any[]): void
	black		(data: any, ...args: any[]): void
	red			(data: any, ...args: any[]): void
	green		(data: any, ...args: any[]): void
	yellow	(data: any, ...args: any[]): void
	blue		(data: any, ...args: any[]): void
	magenta	(data: any, ...args: any[]): void
	cyan		(data: any, ...args: any[]): void
	white		(data: any, ...args: any[]): void
	gray		(data: any, ...args: any[]): void
	grey		(data: any, ...args: any[]): void
	pink		(data: any, ...args: any[]): void
	orange	(data: any, ...args: any[]): void
};

interface Inline_Printers extends Printers {
	bright			: Printers
	bold				: Printers
	italic			: Printers
	dim					: Printers
	underscore	: Printers
	reverse			: Printers
};

interface Printaeu extends Printers {
	bright				: Printers
	bold					: Printers
	italic				: Printers
	dim						: Printers
	underscore		:	Printers
	reverse				: Printers
	inline				: Inline_Printers
	
	socket				(_socket: Socket): void
	toLog					(data: string|string[], file:string): void
	goBacknLines	(lines: number): void
	clearLine			(lines: number): void
	clear					(): void
	showMs				(show_ms: boolean): void
	showDate			(show_date: boolean): void
	track					(error: Error): void
};

const color: any = {
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
	dim_black: "\u001b[38;5;8m",	// Same as gray
	dim_red: "\x1b[31m",
	dim_green: "\x1b[32m",
	dim_yellow: "\x1b[33m",
	dim_blue: "\x1b[34m",
	dim_magenta: "\x1b[35m",
	dim_cyan: "\x1b[36m",
	dim_white: "\x1b[37m",
	dim_gray: "\u001b[38;5;244m",
	dim_pink: "\u001b[38;5;207m",
	dim_orange: "\u001b[38;5;208m",
	

	//Background colors
	black_BG: "\x1b[40m",
	red_BG: "\x1b[41m",
	green_BG: "\x1b[42m",
	yellow_BG: "\x1b[43m",
	blue_BG: "\x1b[44m",
	magenta_BG: "\x1b[45m",
	cyan_BG: "\x1b[46m",
	white_BG: "\x1b[47m",

	cls: '\x1bc'
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

const MS_ON = -1,
			MS_OFF = -5,
			DATE_ON = 0,
			DATE_OFF = 11;

let msOnOff = MS_OFF;
let dateOnOff = DATE_OFF;

function getFunctionName(call: string): string {
	return call.slice(call.indexOf('at ') + 3, call.indexOf(' ('));
}

function getFileName(call: string): string {
	let split: string[];
	if (call.includes('\\')) {
		split = call.split('\\');
	} else {
		split = call.split('/');
	}

	return split[split.length - 1].replace(')', '');
}

class Colors {

	modifier	: string;
	dim				: string;

	constructor(modifier: string, dim: boolean) {
		this.modifier = modifier;
		this.dim = dim ? "dim_" : "";
	}

	log(data: any, ...args: any[]): void {
		console.log(`${this.modifier}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	black(data: any, ...args: any[]): void {
		console.log(`${this.modifier}${color[this.dim + 'black']}${bg.black}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	red(data: any, ...args: any[]): void {
		console.log(`${this.modifier}${color[this.dim + 'red']}${bg.red}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	green(data: any, ...args: any[]): void {
		console.log(`${this.modifier}${color[this.dim + 'green']}${bg.green}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	yellow(data: any, ...args: any[]): void {
		console.log(`${this.modifier}${color[this.dim + 'yellow']}${bg.yellow}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	blue(data: any, ...args: any[]): void {
		console.log(`${this.modifier}${color[this.dim + 'blue']}${bg.blue}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	magenta(data: any, ...args: any[]): void {
		console.log(`${this.modifier}${color[this.dim + 'magenta']}${bg.magenta}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	cyan(data: any, ...args: any[]): void {
		console.log(`${this.modifier}${color[this.dim + 'cyan']}${bg.cyan}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	white(data: any, ...args: any[]): void {
		console.log(`${this.modifier}${color[this.dim + 'white']}${bg.white}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	gray(data: any, ...args: any[]): void {
		console.log(`${this.modifier}${color[this.dim + 'gray']}${bg.gray}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	grey(data: any, ...args: any[]): void {
		console.log(`${this.modifier}${color[this.dim + 'gray']}${bg.gray}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	pink(data: any, ...args: any[]): void {
		console.log(`${this.modifier}${color[this.dim + 'pink']}${bg.pink}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	orange(data: any, ...args: any[]): void {
		console.log(`${this.modifier}${color[this.dim + 'orange']}${bg.orange}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

};

class InlineColors {

	modifier : string;
	dim : string;

	constructor(modifier: string, dim: boolean) {
		this.modifier = modifier;
		this.dim = dim ? "dim_" : "";
	}

	log(data: any, ...args: any[]): void {
		readline.cursorTo(process.stdout, 0);
		readline.moveCursor(process.stdout, 0, -1);
		readline.clearLine(process.stdout, 0);
		console.log(`${this.modifier}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	black(data: any, ...args: any[]): void {
		readline.cursorTo(process.stdout, 0);
		readline.moveCursor(process.stdout, 0, -1);
		readline.clearLine(process.stdout, 0);
		console.log(`${this.modifier}${color[this.dim +'black']}${bg.black}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	red(data: any, ...args: any[]): void {
		readline.cursorTo(process.stdout, 0);
		readline.moveCursor(process.stdout, 0, -1);
		readline.clearLine(process.stdout, 0);
		console.log(`${this.modifier}${color[this.dim +'red']}${bg.red}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	green(data: any, ...args: any[]): void {
		readline.cursorTo(process.stdout, 0);
		readline.moveCursor(process.stdout, 0, -1);
		readline.clearLine(process.stdout, 0);
		console.log(`${this.modifier}${color[this.dim +'green']}${bg.green}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	yellow(data: any, ...args: any[]): void {
		readline.cursorTo(process.stdout, 0);
		readline.moveCursor(process.stdout, 0, -1);
		readline.clearLine(process.stdout, 0);
		console.log(`${this.modifier}${color[this.dim +'yellow']}${bg.yellow}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	blue(data: any, ...args: any[]): void {
		readline.cursorTo(process.stdout, 0);
		readline.moveCursor(process.stdout, 0, -1);
		readline.clearLine(process.stdout, 0);
		console.log(`${this.modifier}${color[this.dim +'blue']}${bg.blue}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	magenta(data: any, ...args: any[]): void {
		readline.cursorTo(process.stdout, 0);
		readline.moveCursor(process.stdout, 0, -1);
		readline.clearLine(process.stdout, 0);
		console.log(`${this.modifier}${color[this.dim +'magenta']}${bg.magenta}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	cyan(data: any, ...args: any[]): void {
		readline.cursorTo(process.stdout, 0);
		readline.moveCursor(process.stdout, 0, -1);
		readline.clearLine(process.stdout, 0);
		console.log(`${this.modifier}${color[this.dim +'cyan']}${bg.cyan}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	white(data: any, ...args: any[]): void {
		readline.cursorTo(process.stdout, 0);
		readline.moveCursor(process.stdout, 0, -1);
		readline.clearLine(process.stdout, 0);
		console.log(`${this.modifier}${color[this.dim +'white']}${bg.white}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};
	
	gray(data: any, ...args: any[]): void {
		readline.cursorTo(process.stdout, 0);
		readline.moveCursor(process.stdout, 0, -1);
		readline.clearLine(process.stdout, 0);
		console.log(`${this.modifier}${color[this.dim +'gray']}${bg.gray}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	grey(data: any, ...args: any[]): void {
		readline.cursorTo(process.stdout, 0);
		readline.moveCursor(process.stdout, 0, -1);
		readline.clearLine(process.stdout, 0);
		console.log(`${this.modifier}${color[this.dim +'gray']}${bg.gray}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	pink(data: any, ...args: any[]): void {
		readline.cursorTo(process.stdout, 0);
		readline.moveCursor(process.stdout, 0, -1);
		readline.clearLine(process.stdout, 0);
		console.log(`${this.modifier}${color[this.dim +'pink']}${bg.pink}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	orange(data: any, ...args: any[]): void {
		readline.cursorTo(process.stdout, 0);
		readline.moveCursor(process.stdout, 0, -1);
		readline.clearLine(process.stdout, 0);
		console.log(`${this.modifier}${color[this.dim +'orange']}${bg.orange}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};
};

let filePath	: string	= '';
let logging		: boolean = false;
let dataToLog	: any		 	= [];

let _socket		: Socket;

export const print = new class Print implements Printaeu {
	
	bright		: Printers;
	bold			: Printers;
	italic		: Printers;
	dim				: Printers;
	underscore:	Printers;
	reverse		: Printers;
	inline		: Inline_Printers;

	constructor() {
		this.bright = new Colors(color.bright, false);
		this.bold = new Colors(color.bright, false);
		this.italic = new Colors(color.italic, false);
		this.underscore = new Colors(color.underscore, false);
		this.reverse = new Colors(color.reverse, false);

		this.dim = new Colors(color.dim, true);

		this.inline = {
			bright: new InlineColors(color.bright, false),
			bold: new InlineColors(color.bright, false),
			italic: new InlineColors(color.italic, false),
			underscore: new InlineColors(color.underscore, false),
			reverse: new InlineColors(color.reverse, false),

			dim: new InlineColors(color.dim, false),
			
			log: (data: any, ...args: any[]): void => {
				readline.cursorTo(process.stdout, 0);
				readline.moveCursor(process.stdout, 0, -1);
				readline.clearLine(process.stdout, 0);
				console.log(timeStamp() + data, args.reduce((t, e) => t + e + ' ', ''));
				if (_socket) _socket.emit('console', timeStamp() + data);
			},

			black: (data: any, ...args: any[]): void => {
				readline.cursorTo(process.stdout, 0);
				readline.moveCursor(process.stdout, 0, -1);
				readline.clearLine(process.stdout, 0);
				console.log(`${color.black}${bg.black}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
				process.stdout.write(color.reset);
			},

			red: (data: any, ...args: any[]): void => {
				readline.cursorTo(process.stdout, 0);
				readline.moveCursor(process.stdout, 0, -1);
				readline.clearLine(process.stdout, 0);
				console.log(`${color.red}${bg.red}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
				process.stdout.write(color.reset);
			},

			green: (data: any, ...args: any[]): void => {
				readline.cursorTo(process.stdout, 0);
				readline.moveCursor(process.stdout, 0, -1);
				readline.clearLine(process.stdout, 0);
				console.log(`${color.green}${bg.green}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
				process.stdout.write(color.reset);
			},

			yellow: (data: any, ...args: any[]): void => {
				readline.cursorTo(process.stdout, 0);
				readline.moveCursor(process.stdout, 0, -1);
				readline.clearLine(process.stdout, 0);
				console.log(`${color.yellow}${bg.yellow}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
				process.stdout.write(color.reset);
			},

			blue: (data: any, ...args: any[]): void => {
				readline.cursorTo(process.stdout, 0);
				readline.moveCursor(process.stdout, 0, -1);
				readline.clearLine(process.stdout, 0);
				console.log(`${color.blue}${bg.blue}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
				process.stdout.write(color.reset);
			},

			magenta: (data: any, ...args: any[]): void => {
				readline.cursorTo(process.stdout, 0);
				readline.moveCursor(process.stdout, 0, -1);
				readline.clearLine(process.stdout, 0);
				console.log(`${color.magenta}${bg.magenta}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
				process.stdout.write(color.reset);
			},

			cyan: (data: any, ...args: any[]): void => {
				readline.cursorTo(process.stdout, 0);
				readline.moveCursor(process.stdout, 0, -1);
				readline.clearLine(process.stdout, 0);
				console.log(`${color.cyan}${bg.cyan}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
				process.stdout.write(color.reset);
			},

			white: (data: any, ...args: any[]): void => {
				readline.cursorTo(process.stdout, 0);
				readline.moveCursor(process.stdout, 0, -1);
				readline.clearLine(process.stdout, 0);
				console.log(`${color.white}${bg.white}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
				process.stdout.write(color.reset);
			},

			gray: (data: any, ...args: any[]): void => {
				readline.cursorTo(process.stdout, 0);
				readline.moveCursor(process.stdout, 0, -1);
				readline.clearLine(process.stdout, 0);
				console.log(`${color.gray}${bg.gray}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
				process.stdout.write(color.reset);
			},

			grey: (data: any, ...args: any[]): void => {
				readline.cursorTo(process.stdout, 0);
				readline.moveCursor(process.stdout, 0, -1);
				readline.clearLine(process.stdout, 0);
				console.log(`${color.gray}${bg.gray}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
				process.stdout.write(color.reset);
			},

			pink: (data: any, ...args: any[]): void => {
				readline.cursorTo(process.stdout, 0);
				readline.moveCursor(process.stdout, 0, -1);
				readline.clearLine(process.stdout, 0);
				console.log(`${color.pink}${bg.pink}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
				process.stdout.write(color.reset);
			},

			orange: (data: any, ...args: any[]): void => {
				readline.cursorTo(process.stdout, 0);
				readline.moveCursor(process.stdout, 0, -1);
				readline.clearLine(process.stdout, 0);
				console.log(`${color.orange}${bg.orange}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
				process.stdout.write(color.reset);
			}

		}
	}

	socket(_socket: Socket) {
		_socket = _socket;
	};

	toLog (data:string|string[], file:string): void {
		if (file) {
			filePath = file;
		}

		if (!Array.isArray(data)) {
			data = [data];
		}

		if (!logging) {

			logging = true;
			dataToLog = [];
			
			let text = '';
			data.forEach(el => {
				if (typeof el === 'object') {
					text += timeStamp() + JSON.stringify(el) + '\n';
				} else {
					text += timeStamp() + el + '\n';
				}
			});

			fs.appendFile(filePath, text, (err) => {
				if (err) throw err;
				logging = false;
				console.log(dataToLog);
				if (dataToLog.length) {
					this.toLog(dataToLog, filePath);
				}
			});
		} else {
			dataToLog = dataToLog.concat(data);
		}

	};

	goBacknLines(lines: number): void {
		readline.cursorTo(process.stdout, 0);
		readline.moveCursor(process.stdout, 0, -lines);
		readline.clearLine(process.stdout, 0);
	};

	clearLine(lines: number = 0): void {
		readline.cursorTo(process.stdout, 0);
		readline.moveCursor(process.stdout, 0, -lines);
		readline.clearLine(process.stdout, 0);
	};

	clear(): void {
		process.stdout.write(color.cls);
	};

	showMs(show_ms: boolean = true): void {
		if (show_ms) {
			msOnOff = MS_ON;
		} else {
			msOnOff = MS_OFF;
		}
	};

	showDate(show_date: boolean = true): void {
		if (show_date) {
			dateOnOff = DATE_ON;
		} else {
			dateOnOff = DATE_OFF;
		}
	};

	log (data: any, ...args: any[]): void {
		console.log(timeStamp() + data, args.reduce((t, e) => t + e + ' ', ''));
		if (_socket) _socket.emit('console', timeStamp() + data);
	};

	black(data: any, ...args: any[]): void {
		console.log(`${color.black}${bg.black}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	red(data: any, ...args: any[]): void {
		console.log(`${color.red}${bg.red}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	green(data: any, ...args: any[]): void {
		console.log(`${color.green}${bg.green}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	yellow(data: any, ...args: any[]): void {
		console.log(`${color.yellow}${bg.yellow}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	blue(data: any, ...args: any[]): void {
		console.log(`${color.blue}${bg.blue}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	magenta(data: any, ...args: any[]): void {
		console.log(`${color.magenta}${bg.magenta}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	cyan(data: any, ...args: any[]): void {
		console.log(`${color.cyan}${bg.cyan}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	white(data: any, ...args: any[]): void {
		console.log(`${color.white}${bg.white}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	gray(data: any, ...args: any[]): void {
		console.log(`${color.gray}${bg.gray}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	grey(data: any, ...args: any[]): void {
		console.log(`${color.gray}${bg.gray}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	pink(data: any, ...args: any[]): void {
		console.log(`${color.pink}${bg.pink}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	orange(data: any, ...args: any[]): void {
		console.log(`${color.orange}${bg.orange}${timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
		process.stdout.write(color.reset);
	};

	track(error: Error): void  {

		this.bright.red('Error trace: ');

		if (typeof error.stack !== 'undefined') {
			let calls = error.stack.toString().split("\n");
			let index = 0;
	
			for (let i = calls.length - 1; i > 0; i--) {
				const call = calls[i];
	
				let functionName = getFunctionName(call);
				let fileName = getFileName(call);
	
				if (!index) {
					process.stdout.write(`${color.bright}${color.white}[call] ${color.reset}${functionName}(${fileName})\n`);
					index++;
				} else if (index !== (calls.length - 1)) {
					process.stdout.write(`[${index}] ${functionName}(${fileName})\n`);
				} else {
					process.stdout.write(`${color.bright}${color.white}[throw] ${color.reset}${functionName}(${fileName})\n`);
				}
	
				index++;
			}
		} else {
			this.bright.orange('No error trace!');
		}
	};

	setBg = {
		black: (newBG: string): void => {
			bg.black = color[newBG + '_BG'];
		},
		red: (newBG: string): void => {
			bg.red = color[newBG + '_BG'];
		},
		green: (newBG: string): void => {
			bg.green = color[newBG + '_BG'];
		},
		yellow: (newBG: string): void => {
			bg.yellow = color[newBG + '_BG'];
		},
		blue: (newBG: string): void => {
			bg.blue = color[newBG + '_BG'];
		},
		magenta: (newBG: string): void => {
			bg.magenta = color[newBG + '_BG'];
		},
		cyan: (newBG: string): void => {
			bg.cyan = color[newBG + '_BG'];
		},
		white: (newBG: string): void => {
			bg.white = color[newBG + '_BG'];
		},
		gray: (newBG: string): void => {
			bg.gray = color[newBG + '_BG'];
		},
		grey: (newBG: string): void => {
			bg.gray = color[newBG + '_BG'];
		},
		pink: (newBG: string): void => {
			bg.pink = color[newBG + '_BG'];
		},
		orange: (newBG: string): void => {
			bg.orange = color[newBG + '_BG'];
		}
	};

	clear_Bg = {
		black: (): void => {
			bg.black = '';
		},
		red: (): void => {
			bg.red = '';
		},
		green: (): void => {
			bg.green = '';
		},
		yellow: (): void => {
			bg.yellow = '';
		},
		blue: (): void => {
			bg.blue = '';
		},
		magenta: (): void => {
			bg.magenta = '';
		},
		cyan: (): void => {
			bg.cyan = '';
		},
		white: (): void => {
			bg.white = '';
		},
		gray: (): void => {
			bg.gray = '';
		},
		grey: (): void => {
			bg.gray = '';
		},
		pink: (): void => {
			bg.pink = '';
		},
		orange: (): void => {
			bg.orange = '';
		}
	};

};

function timeStamp(): string {
	let time : string = new Date().toISOString();
	return '[' + time.slice(dateOnOff, msOnOff) + '] ';
}