import { Socket } from "node:dgram";

import * as readline from "readline";
import * as fs from "fs";

/**
 * Possible background colors
 */
export type BackgroundsColors = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';

interface Backgrounds {
	name: BackgroundsColors;
	value: string;
};

class TextModifiers {
	/**
	 * Turn on the modifier to be included inside the `print` call
	 * @example 
	 * import { print, bold as b, italic as i, dim as d, underline as u, reverse as r } from 'printaeu'
	 * print.log(`No way I'm gonna do ${bold.on()}this${bold.off()}`);
	 * print.log(`${italic.on()}Believe me, you'll!${italic.off()} - he said`);
	 * print.log(`${dim.on()}How?${dim.off()} - I thought`);
	 * print.log(`Check ${underline.on()}this${underline.off()} out`);
	 * print.log(`Shot ${r.on}reverse${r.off} shot`);
	 */
	readonly on: string = '';
	/**
	 * Turn off the modifier to be included inside the `print` call
	 * @example 
	 * import { print, bold as b, italic as i, dim as d, underline as u, reverse as r } from 'printaeu'
	 * print.log(`No way I'm gonna do ${bold.on()}this${bold.off()}`);
	 * print.log(`${italic.on()}Believe me, you'll!${italic.off()} - he said`);
	 * print.log(`${dim.on()}How?${dim.off()} - I thought`);
	 * print.log(`Check ${underline.on()}this${underline.off()} out`);
	 * print.log(`Shot ${r.on}reverse${r.off} shot`);
	 */
	readonly off: string = '';
}

/**
 * The bold modifier
 */
export const bold = new class Bold extends TextModifiers {
	readonly on = "\x1b[1m";
	readonly off = process.platform === 'win32'?"\x1b[22m":"\x1b[21m";
};

/**
 * The dim modifier (work on some terminals)
 */
export const dim = new class Dim extends TextModifiers {
	readonly on = "\x1b[2m";
	readonly off = "\x1b[22m";
};

/**
 * The italic modifier
 */
export const italic = new class Italic extends TextModifiers {
	readonly on = "\x1b[3m";
	readonly off = "\x1b[23m";
};

/**
 * The underline modifier
 */
export const underline = new class Underline extends TextModifiers {
	readonly on = "\x1b[4m";
	readonly off = "\x1b[24m";
};

/**
 * The reverse modifier
 */
export const reverse = new class Reverse extends TextModifiers {
	readonly on = "\x1b[7m";
	readonly off = "\x1b[27m";
};

class ColorModifiers {
	//Modifiers
	reset: string = '\x1b[0m'; //Reset to default
	bright: string = "\x1b[1m"; //Brighter
	dim: string = "\x1b[2m"; //Dim
	italic: string = "\x1b[3m"; //Italic
	underline: string = "\x1b[4m"; //Put a underline beneath everything
	reverse: string = "\x1b[7m"; //Reverses the fore and background colors

	black: string = "\x1b[30m";
	red: string = "\u001b[38;5;9m";
	green: string = "\u001b[38;5;10m";
	yellow: string = "\u001b[38;5;11m";
	blue: string = "\u001b[38;5;12m";
	magenta: string = "\u001b[38;5;13m";
	cyan: string = "\u001b[38;5;14m";
	white: string = "\u001b[38;5;15m";
	gray: string = "\u001b[38;5;248m";
	pink: string = "\u001b[38;5;213m";
	orange: string = "\u001b[38;5;214m";

	dimBlack: string = "\u001b[38;5;8m";	// Same as gray
	dimRed: string = "\x1b[31m";
	dimGreen: string = "\x1b[32m";
	dimYellow: string = "\x1b[33m";
	dimBlue: string = "\x1b[34m";
	dimMagenta: string = "\x1b[35m";
	dimCyan: string = "\x1b[36m";
	dimWhite: string = "\x1b[37m";
	dimGray: string = "\u001b[38;5;244m";
	dimPink: string = "\u001b[38;5;207m";
	dimOrange: string = "\u001b[38;5;208m";

	backgrounds: Backgrounds[] = [
		{ name: 'black', value: "\x1b[40m"},
		{ name: 'red', value: "\x1b[41m"},
		{ name: 'green', value: "\x1b[42m"},
		{ name: 'yellow', value: "\x1b[43m"},
		{ name: 'blue', value: "\x1b[44m"},
		{ name: 'magenta', value: "\x1b[45m"},
		{ name: 'cyan', value: "\x1b[46m"},
		{ name: 'white', value: "\x1b[47m"}
	]

	cls: string = '\x1bc';
}

const color: ColorModifiers = new ColorModifiers();

/**
 * String offsets to show or hide the milliseconds from the time stamp
 */
enum MS {
	ON = -1,
	OFF = -5
}

/**
 * String offsets to show or hide the date from the time stamp
 */
enum DATE {
	ON = 0,
	OFF = 11
}

/**
 * Printers options
 */
interface ColorOptions {
	modifier?: string;
	dim?: boolean;
	inline?: boolean;
}

class Printers {

	private _socket: Socket | undefined;
	private config: PrintConfig;
	private isInline : boolean;
	private modifier : string;
	private isDim : boolean;
	private verbosity: Verbosity;

	constructor(verbosity: Verbosity, config: PrintConfig, options: ColorOptions) {
		this.modifier = options.modifier?options.modifier:'';
		this.isDim = options.dim ? true : false;
		this.isInline = options.inline?options.inline:false;
		this.verbosity = verbosity;
		this.config = config;
	}

	/**
	 * Create a stamp for the current time
	 * @returns the formatted time stamp
	 */
	private timeStamp(): string {
		let time : string = new Date((new Date()).getTime() - (new Date()).getTimezoneOffset()*60*1000).toISOString();
		return '[' + time.slice(this.config.dateOnOff, this.config.msOnOff) + '] ';
	}

	/**
	 * Pretty much the same as `console.log()` + time stamp
	 * @param data same as `console.log()`
	 * @param args same as `console.log()`
	 */
	log(data: any, ...args: any[]): void {
		if (this.config.verbosity >= this.verbosity) {
			if (this.isInline) {
				readline.cursorTo(process.stdout, 0);
				readline.moveCursor(process.stdout, 0, -1);
				readline.clearLine(process.stdout, 0);
			}
			let modifiers: string = this.modifier;
			if (!this.config.cleanTimeStamp) {
				modifiers = `${modifiers}${this.timeStamp()}`;
			} else {
				modifiers = `${this.timeStamp()}${modifiers}`;
			}

			console.log(`${this.modifier}${this.timeStamp()}${data}`, args.reduce((t, e) => t + e + ' ', ''));
			if (this.modifier) process.stdout.write(color.reset);
			if (this._socket) this._socket.emit('console', this.timeStamp() + data);
		}
	};

	/**
	 * Print data in black + time stamp
	 * @param data same as `console.log()`
	 * @param args same as `console.log()`
	 */
	black(data: any, ...args: any[]): void {
		if (this.config.verbosity >= this.verbosity) {
			if (this.isInline) {
				readline.cursorTo(process.stdout, 0);
				readline.moveCursor(process.stdout, 0, -1);
				readline.clearLine(process.stdout, 0);
			}
			let modifiers: string = `${this.modifier}${this.isDim?color.dimBlack:color.black}${this.config.backgroundColors.black}`;
			if (!this.config.cleanTimeStamp) {
				modifiers = `${modifiers}${this.timeStamp()}`;
			} else {
				modifiers = `${this.timeStamp()}${modifiers}`;
			}
			console.log(`${modifiers}${data}`, args.reduce((t, e) => t + e + ' ', ''));
			process.stdout.write(color.reset);
		}
	};

	/**
	 * Print data in red + time stamp
	 * @param data same as `console.log()`
	 * @param args same as `console.log()`
	 */
	red(data: any, ...args: any[]): void {
		if (this.config.verbosity >= this.verbosity) {
			if (this.isInline) {
				readline.cursorTo(process.stdout, 0);
				readline.moveCursor(process.stdout, 0, -1);
				readline.clearLine(process.stdout, 0);
			}
			let modifiers: string = `${this.modifier}${this.isDim?color.dimRed:color.red}${this.config.backgroundColors.red}`;
			if (!this.config.cleanTimeStamp) {
				modifiers = `${modifiers}${this.timeStamp()}`;
			} else {
				modifiers = `${this.timeStamp()}${modifiers}`;
			}
			console.log(`${modifiers}${data}`, args.reduce((t, e) => t + e + ' ', ''));
			process.stdout.write(color.reset);
		}
	};

	/**
	 * Print data in green + time stamp
	 * @param data same as `console.log()`
	 * @param args same as `console.log()`
	 */
	green(data: any, ...args: any[]): void {
		if (this.config.verbosity >= this.verbosity) {
			if (this.isInline) {
				readline.cursorTo(process.stdout, 0);
				readline.moveCursor(process.stdout, 0, -1);
				readline.clearLine(process.stdout, 0);
			}
			let modifiers: string = `${this.modifier}${this.isDim?color.dimGreen:color.green}${this.config.backgroundColors.green}`;
			if (!this.config.cleanTimeStamp) {
				modifiers = `${modifiers}${this.timeStamp()}`;
			} else {
				modifiers = `${this.timeStamp()}${modifiers}`;
			}
			console.log(`${modifiers}${data}`, args.reduce((t, e) => t + e + ' ', ''));
			process.stdout.write(color.reset);
		}
	};

	/**
	 * Print data in yellow + time stamp
	 * @param data same as `console.log()`
	 * @param args same as `console.log()`
	 */
	yellow(data: any, ...args: any[]): void {
		if (this.config.verbosity >= this.verbosity) {
			if (this.isInline) {
				readline.cursorTo(process.stdout, 0);
				readline.moveCursor(process.stdout, 0, -1);
				readline.clearLine(process.stdout, 0);
			}
			let modifiers: string = `${this.modifier}${this.isDim?color.dimYellow:color.yellow}${this.config.backgroundColors.yellow}`;
			if (!this.config.cleanTimeStamp) {
				modifiers = `${modifiers}${this.timeStamp()}`;
			} else {
				modifiers = `${this.timeStamp()}${modifiers}`;
			}
			console.log(`${modifiers}${data}`, args.reduce((t, e) => t + e + ' ', ''));
			process.stdout.write(color.reset);
		}
	};

	/**
	 * Print data in blue + time stamp
	 * @param data same as `console.log()`
	 * @param args same as `console.log()`
	 */
	blue(data: any, ...args: any[]): void {
		if (this.config.verbosity >= this.verbosity) {
			if (this.isInline) {
				readline.cursorTo(process.stdout, 0);
				readline.moveCursor(process.stdout, 0, -1);
				readline.clearLine(process.stdout, 0);
			}
			let modifiers: string = `${this.modifier}${this.isDim?color.dimBlue:color.blue}${this.config.backgroundColors.blue}`;
			if (!this.config.cleanTimeStamp) {
				modifiers = `${modifiers}${this.timeStamp()}`;
			} else {
				modifiers = `${this.timeStamp()}${modifiers}`;
			}
			console.log(`${modifiers}${data}`, args.reduce((t, e) => t + e + ' ', ''));
			process.stdout.write(color.reset);
		}
	};

	/**
	 * Print data in magenta + time stamp
	 * @param data same as `console.log()`
	 * @param args same as `console.log()`
	 */
	magenta(data: any, ...args: any[]): void {
		if (this.config.verbosity >= this.verbosity) {
			if (this.isInline) {
				readline.cursorTo(process.stdout, 0);
				readline.moveCursor(process.stdout, 0, -1);
				readline.clearLine(process.stdout, 0);
			}
			let modifiers: string = `${this.modifier}${this.isDim?color.dimMagenta:color.magenta}${this.config.backgroundColors.magenta}`;
			if (!this.config.cleanTimeStamp) {
				modifiers = `${modifiers}${this.timeStamp()}`;
			} else {
				modifiers = `${this.timeStamp()}${modifiers}`;
			}
			console.log(`${modifiers}${data}`, args.reduce((t, e) => t + e + ' ', ''));
			process.stdout.write(color.reset);
		}
	};

	/**
	 * Print data in cyan + time stamp
	 * @param data same as `console.log()`
	 * @param args same as `console.log()`
	 */
	cyan(data: any, ...args: any[]): void {
		if (this.config.verbosity >= this.verbosity) {
			if (this.isInline) {
				readline.cursorTo(process.stdout, 0);
				readline.moveCursor(process.stdout, 0, -1);
				readline.clearLine(process.stdout, 0);
			}
			let modifiers: string = `${this.modifier}${this.isDim?color.dimCyan:color.cyan}${this.config.backgroundColors.cyan}`;
			if (!this.config.cleanTimeStamp) {
				modifiers = `${modifiers}${this.timeStamp()}`;
			} else {
				modifiers = `${this.timeStamp()}${modifiers}`;
			}
			console.log(`${modifiers}${data}`, args.reduce((t, e) => t + e + ' ', ''));
			process.stdout.write(color.reset);
		}
	};

	/**
	 * Print data in white + time stamp
	 * @param data same as `console.log()`
	 * @param args same as `console.log()`
	 */
	white(data: any, ...args: any[]): void {
		if (this.config.verbosity >= this.verbosity) {
			if (this.isInline) {
				readline.cursorTo(process.stdout, 0);
				readline.moveCursor(process.stdout, 0, -1);
				readline.clearLine(process.stdout, 0);
			}
			let modifiers: string = `${this.modifier}${this.isDim?color.dimWhite:color.white}${this.config.backgroundColors.white}`;
			if (!this.config.cleanTimeStamp) {
				modifiers = `${modifiers}${this.timeStamp()}`;
			} else {
				modifiers = `${this.timeStamp()}${modifiers}`;
			}
			console.log(`${modifiers}${data}`, args.reduce((t, e) => t + e + ' ', ''));
			process.stdout.write(color.reset);
		}
	};

	/**
	 * Print data in gray + time stamp
	 * @param data same as `console.log()`
	 * @param args same as `console.log()`
	 */
	gray(data: any, ...args: any[]): void {
		if (this.config.verbosity >= this.verbosity) {
			if (this.isInline) {
				readline.cursorTo(process.stdout, 0);
				readline.moveCursor(process.stdout, 0, -1);
				readline.clearLine(process.stdout, 0);
			}
			let modifiers: string = `${this.modifier}${this.isDim?color.dimGray:color.gray}${this.config.backgroundColors.gray}`;
			if (!this.config.cleanTimeStamp) {
				modifiers = `${modifiers}${this.timeStamp()}`;
			} else {
				modifiers = `${this.timeStamp()}${modifiers}`;
			}
			console.log(`${modifiers}${data}`, args.reduce((t, e) => t + e + ' ', ''));
			process.stdout.write(color.reset);
		}
	};

	/**
	 * Print data in grey + time stamp
	 * @param data same as `console.log()`
	 * @param args same as `console.log()`
	 */
	grey(data: any, ...args: any[]): void {
		this.gray(data, args);
	};

	/**
	 * Print data in pink + time stamp
	 * @param data same as `console.log()`
	 * @param args same as `console.log()`
	 */
	pink(data: any, ...args: any[]): void {
		if (this.config.verbosity >= this.verbosity) {
			if (this.isInline) {
				readline.cursorTo(process.stdout, 0);
				readline.moveCursor(process.stdout, 0, -1);
				readline.clearLine(process.stdout, 0);
			}
			let modifiers: string = `${this.modifier}${this.isDim?color.dimPink:color.pink}${this.config.backgroundColors.pink}`;
			if (!this.config.cleanTimeStamp) {
				modifiers = `${modifiers}${this.timeStamp()}`;
			} else {
				modifiers = `${this.timeStamp()}${modifiers}`;
			}
			console.log(`${modifiers}${data}`, args.reduce((t, e) => t + e + ' ', ''));
			process.stdout.write(color.reset);
		}
	};

	/**
	 * Print data in orange + time stamp
	 * @param data same as `console.log()`
	 * @param args same as `console.log()`
	 */
	orange(data: any, ...args: any[]): void {
		if (this.config.verbosity >= this.verbosity) {
			if (this.isInline) {
				readline.cursorTo(process.stdout, 0);
				readline.moveCursor(process.stdout, 0, -1);
				readline.clearLine(process.stdout, 0);
			}
			let modifiers: string = `${this.modifier}${this.isDim?color.dimOrange:color.orange}${this.config.backgroundColors.orange}`;
			if (!this.config.cleanTimeStamp) {
				modifiers = `${modifiers}${this.timeStamp()}`;
			} else {
				modifiers = `${this.timeStamp()}${modifiers}`;
			}
			console.log(`${modifiers}${data}`, args.reduce((t, e) => t + e + ' ', ''));
			process.stdout.write(color.reset);
		}
	};

	/**
	 * Instead of printing, the text is logged inside a file with the time stamps
	 * @param data the data to be logged
	 * @param file the log file full path
	 */
	private toLog(data: any | any[], file: string): void {
		if (!Array.isArray(data)) data = [data];

		let text = '';
		data.forEach((el: any) => {
			if (typeof el === 'object') {
				text += this.timeStamp() + JSON.stringify(el) + '\n';
			} else {
				text += this.timeStamp() + el + '\n';
			}
		});

		fs.appendFileSync(file, text);

	};

};

/**
 * Extend Printers to generate modifiers
 */
class Modifiers extends Printers {
	/**
	 * Show the text brighter. Same as `bold`
	 */
	readonly bright: Printers;
	/**
	 * Show a bold text. Same as `bright`
	 */
	readonly bold: Printers;
	/**
	 * Show the text in italic
	 */
	readonly italic: Printers;
	/**
	 * Show the text dim (a little darker)
	 */
	readonly dim: Printers;
	/**
	 * @deprecated use `underline` instead. The support to `underscore` will be dropped soon
	 */
	readonly underscore:	Printers;
	/**
	 * Show the text with an underline
	 */
	readonly underline:	Printers;
	/**
	 * Show the text with the foreground and background colors reversed
	 */
	readonly reverse: Printers;

	constructor(verbosity: Verbosity, config: PrintConfig, inline: boolean) {
		super(verbosity, config, { inline });
		this.bright = new Printers(verbosity, config, {modifier: color.bright, inline});
		this.bold = new Printers(verbosity, config, {modifier: color.bright, inline});
		this.italic = new Printers(verbosity, config, {modifier: color.italic, inline});
		this.dim = new Printers(verbosity, config, {modifier: color.dim, inline});
		this.underscore = new Printers(verbosity, config, {modifier: color.underline, inline});
		this.underline = new Printers(verbosity, config, {modifier: color.underline, inline});
		this.reverse = new Printers(verbosity, config, {modifier: color.reverse, inline});
	}
}

/**
 * Verbosity options
 */
export type VerbosityOptions = 'low' | 'medium' | 'high';

/**
 * Internal verbosity enum
 */
enum Verbosity {
	LOW,
	MEDIUM,
	HIGH
}

/**
 * High Verbosity class
 */
class HighVerbosity extends Modifiers {
	readonly inline: Modifiers;
	constructor(config: PrintConfig) {
		super(Verbosity.HIGH, config, false);
		this.inline = new Modifiers(Verbosity.HIGH, config, true);
	}
}

/**
 * Medium verbosity class
 */
class MediumVerbosity extends Modifiers {
	readonly inline: Modifiers;
	constructor(config: PrintConfig) {
		super(Verbosity.MEDIUM, config, false);
		this.inline = new Modifiers(Verbosity.MEDIUM, config, true);
	}
}

/**
 * Print general configurations
 */
class PrintConfig {
	/**
	 * Flag that stores whether print should show time stamp with the modifiers
	 */
	cleanTimeStamp: boolean;
	/**
	 * Flag that stores whether print should show until milliseconds
	 */
	msOnOff: MS;
	/**
	 * Flag that stores whether print should show the date
	 */
	dateOnOff: DATE;
	/**
	 * The socket, if any, to have the 'console' event triggered every `print.log` call
	 */
	socket: Socket | undefined;
	/**
	 * The current print verbosity
	 */
	verbosity: Verbosity;
	/**
	 * The current print background color for each available text color
	 */
	backgroundColors: {
		/**
		 * The current background color for the black text
		 */
		black: string;
		/**
		 * The current background color for the red text
		 */
		red: string;
		/**
		 * The current background color for the green text
		 */
		green: string;
		/**
		 * The current background color for the yellow text
		 */
		yellow: string;
		/**
		 * The current background color for the blue text
		 */
		blue: string;
		/**
		 * The current background color for the magenta text
		 */
		magenta: string;
		/**
		 * The current background color for the cyan text
		 */
		cyan: string;
		/**
		 * The current background color for the white text
		 */
		white: string;
		/**
		 * The current background color for the gray text
		 */
		gray: string;
		/**
		 * The current background color for the pink text
		 */
		pink: string;
		/**
		 * The current background color for the orange text
		 */
		orange: string;
	}

	constructor() {
		this.cleanTimeStamp = false;
		this.msOnOff = MS.OFF;
		this.dateOnOff = DATE.OFF;
		this.verbosity = Verbosity.HIGH;
		this.backgroundColors = {
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
		}
	}

}

class Print extends Modifiers  {
	/**
	 * Print the text on the same line as the current cursor
	 */
	readonly inline: Modifiers;
	/**
	 * Print the text only if the verbosity is set to `high` using `setVerbosity`
	 */
	readonly high: HighVerbosity;
	/**
	 * Print the text only if the verbosity is set to `medium` or higher using `setVerbosity`
	 */
	readonly med: MediumVerbosity;
	/**
	 * Global print configurations
	 */
	private _config_: PrintConfig;

	private constructor(config: PrintConfig) {
		super(Verbosity.LOW, config, false);
		this._config_ = config;
		this.high = new HighVerbosity(config);
		this.med = new MediumVerbosity(config);
		this.inline = new Modifiers(Verbosity.LOW, config, true);
	}

	/**
	 * Creates an awesome print object
	 * @returns awesomeness
	 */
	static create() {
		return new Print(new PrintConfig());
	}

	/**
	 * Move the cursor to some lines above its current position
	 * @param lines the number of lines from the cursor current position
	 */
	goBacknLines(lines: number): void {
		readline.cursorTo(process.stdout, 0);
		readline.moveCursor(process.stdout, 0, -lines);
		readline.clearLine(process.stdout, 0);
	};

	/**
	 * Clear a certain number of lines above the cursor
	 * @param lines the relative lines to be cleared
	 */
	clearLine(lines: number = 0): void {
		readline.cursorTo(process.stdout, 0);
		readline.moveCursor(process.stdout, 0, -lines);
		readline.clearLine(process.stdout, 0);
	};

	/**
	 * Clear the console
	 */
	clear(): void {
		process.stdout.write(color.cls);
	};

	/**
	 * Turns on and off the milliseconds being shown in the time stamp
	 * @param showMs if the milliseconds should be shown
	 */
	showMs(showMs: boolean = true): void {
		if (showMs) {
			this._config_.msOnOff = MS.ON;
		} else {
			this._config_.msOnOff = MS.OFF;
		}
	};

	/**
	 * Turns on and off the date being shown in the time stamp
	 * @param showDate if the date should be shown
	 */
	showDate(showDate: boolean = true): void {
		if (showDate) {
			this._config_.dateOnOff = DATE.ON;
		} else {
			this._config_.dateOnOff = DATE.OFF;
		}
	};

	/**
	 * Whether print should show time stamp with the modifiers (colors, bold, etc...)
	 */
	setColorfulTimeStamp(colorfulTimeStamp: boolean = true) {
		if (colorfulTimeStamp) {
			this._config_.cleanTimeStamp = false;
		} else {
			this._config_.cleanTimeStamp = true;
		}
	}

	/**
	 * Print the call stack in a clean way, with colors and stuff
	 * @param error the `Error` object
	 */
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

	/**
	 * Change the verbosity of `Print`. The verbosity affects only `print.low`,
	 * `print.med`, `print.high`, and their children. Other calls are always printed.
	 * @param verbosity the new verbosity value
	 */
	setVerbosity(verbosity: VerbosityOptions) {
		switch (verbosity) {
			case 'high':
				this._config_.verbosity = Verbosity.HIGH;
				break;
			case 'medium':
				this._config_.verbosity = Verbosity.MEDIUM;
				break;
			case 'low':
				this._config_.verbosity = Verbosity.LOW;
				break;
			default:
				break;
		}
	}

	/**
	 * @deprecated use setBG instead. The support for this will be dropped soon
	 */
	readonly setBg = {
		/**
		 * @deprecated use `setBG.black` (BG upper case) instead. The support for this will be dropped soon
		 */
		black: (newBg: BackgroundsColors): void => {
			const newCode = color.backgrounds.find(el => el.name === newBg);
			if (newCode) this._config_.backgroundColors.black = newCode.value;
		},
		/**
		 * @deprecated use `setBG.red` (BG upper case) instead. The support for this will be dropped soon
		 */
		red: (newBg: BackgroundsColors): void => {
			const newCode = color.backgrounds.find(el => el.name === newBg);
			if (newCode) this._config_.backgroundColors.red = newCode.value;
		},
		/**
		 * @deprecated use `setBG.green` (BG upper case) instead. The support for this will be dropped soon
		 */
		green: (newBg: BackgroundsColors): void => {
			const newCode = color.backgrounds.find(el => el.name === newBg);
			if (newCode) this._config_.backgroundColors.green = newCode.value;
		},
		/**
		 * @deprecated use `setBG.yellow` (BG upper case) instead. The support for this will be dropped soon
		 */
		yellow: (newBg: BackgroundsColors): void => {
			const newCode = color.backgrounds.find(el => el.name === newBg);
			if (newCode) this._config_.backgroundColors.yellow = newCode.value;
		},
		/**
		 * @deprecated use `setBG.blue` (BG upper case) instead. The support for this will be dropped soon
		 */
		blue: (newBg: BackgroundsColors): void => {
			const newCode = color.backgrounds.find(el => el.name === newBg);
			if (newCode) this._config_.backgroundColors.blue = newCode.value;
		},
		/**
		 * @deprecated use `setBG.magenta` (BG upper case) instead. The support for this will be dropped soon
		 */
		magenta: (newBg: BackgroundsColors): void => {
			const newCode = color.backgrounds.find(el => el.name === newBg);
			if (newCode) this._config_.backgroundColors.magenta = newCode.value;
		},
		/**
		 * @deprecated use `setBG.cyan` (BG upper case) instead. The support for this will be dropped soon
		 */
		cyan: (newBg: BackgroundsColors): void => {
			const newCode = color.backgrounds.find(el => el.name === newBg);
			if (newCode) this._config_.backgroundColors.cyan = newCode.value;
		},
		/**
		 * @deprecated use `setBG.white` (BG upper case) instead. The support for this will be dropped soon
		 */
		white: (newBg: BackgroundsColors): void => {
			const newCode = color.backgrounds.find(el => el.name === newBg);
			if (newCode) this._config_.backgroundColors.white = newCode.value;
		},
		/**
		 * @deprecated use `setBG.gray` (BG upper case) instead. The support for this will be dropped soon
		 */
		gray: (newBg: BackgroundsColors): void => {
			const newCode = color.backgrounds.find(el => el.name === newBg);
			if (newCode) this._config_.backgroundColors.gray = newCode.value;
		},
		/**
		 * @deprecated use `setBG.grey` (BG upper case) instead. The support for this will be dropped soon
		 */
		grey: (newBg: BackgroundsColors): void => {
			this.setBg.gray(newBg);
		},
		/**
		 * @deprecated use `setBG.pink` (BG upper case) instead. The support for this will be dropped soon
		 */
		pink: (newBg: BackgroundsColors): void => {
			const newCode = color.backgrounds.find(el => el.name === newBg);
			if (newCode) this._config_.backgroundColors.pink = newCode.value;
		},
		/**
		 * @deprecated use `setBG.orange` (BG upper case) instead. The support for this will be dropped soon
		 */
		orange: (newBg: BackgroundsColors): void => {
			const newCode = color.backgrounds.find(el => el.name === newBg);
			if (newCode) this._config_.backgroundColors.orange = newCode.value;
		}
	};

	/**
	 * Set the background color for a given printer
	 */
	readonly setBG = {
		/**
		 * Set the background color for the `.black` printer
		 */
		black: (newBg: BackgroundsColors): void => {
			const newCode = color.backgrounds.find(el => el.name === newBg);
			if (newCode) this._config_.backgroundColors.black = newCode.value;
		},
		/**
		 * Set the background color for the `.red` printer
		 */
		red: (newBg: BackgroundsColors): void => {
			const newCode = color.backgrounds.find(el => el.name === newBg);
			if (newCode) this._config_.backgroundColors.red = newCode.value;
		},
		/**
		 * Set the background color for the `.green` printer
		 */
		green: (newBg: BackgroundsColors): void => {
			const newCode = color.backgrounds.find(el => el.name === newBg);
			if (newCode) this._config_.backgroundColors.green = newCode.value;
		},
		/**
		 * Set the background color for the `.yellow` printer
		 */
		yellow: (newBg: BackgroundsColors): void => {
			const newCode = color.backgrounds.find(el => el.name === newBg);
			if (newCode) this._config_.backgroundColors.yellow = newCode.value;
		},
		/**
		 * Set the background color for the `.blue` printer
		 */
		blue: (newBg: BackgroundsColors): void => {
			const newCode = color.backgrounds.find(el => el.name === newBg);
			if (newCode) this._config_.backgroundColors.blue = newCode.value;
		},
		/**
		 * Set the background color for the `.magenta` printer
		 */
		magenta: (newBg: BackgroundsColors): void => {
			const newCode = color.backgrounds.find(el => el.name === newBg);
			if (newCode) this._config_.backgroundColors.magenta = newCode.value;
		},
		/**
		 * Set the background color for the `.cyan` printer
		 */
		cyan: (newBg: BackgroundsColors): void => {
			const newCode = color.backgrounds.find(el => el.name === newBg);
			if (newCode) this._config_.backgroundColors.cyan = newCode.value;
		},
		/**
		 * Set the background color for the `.white` printer
		 */
		white: (newBg: BackgroundsColors): void => {
			const newCode = color.backgrounds.find(el => el.name === newBg);
			if (newCode) this._config_.backgroundColors.white = newCode.value;
		},
		/**
		 * Set the background color for the `.gray` printer
		 */
		gray: (newBg: BackgroundsColors): void => {
			const newCode = color.backgrounds.find(el => el.name === newBg);
			if (newCode) this._config_.backgroundColors.gray = newCode.value;
		},
		/**
		 * Set the background color for the `.grey` printer
		 */
		grey: (newBg: BackgroundsColors): void => {
			this.setBg.gray(newBg);
		},
		/**
		 * Set the background color for the `.pink` printer
		 */
		pink: (newBg: BackgroundsColors): void => {
			const newCode = color.backgrounds.find(el => el.name === newBg);
			if (newCode) this._config_.backgroundColors.pink = newCode.value;
		},
		/**
		 * Set the background color for the `.orange` printer
		 */
		orange: (newBg: BackgroundsColors): void => {
			const newCode = color.backgrounds.find(el => el.name === newBg);
			if (newCode) this._config_.backgroundColors.orange = newCode.value;
		}
	};

	/**
	 * @deprecated use clearBG instead. The support for this will be dropped soon
	 */
	readonly clear_Bg = {
		/**
		 * @deprecated use `clearBG.black` (BG upper case) instead. The support for this will be dropped soon
		 */
		black: (): void => {
			this._config_.backgroundColors.black = '';
		},
		/**
		 * @deprecated use `clearBG.red` (BG upper case) instead. The support for this will be dropped soon
		 */
		red: (): void => {
			this._config_.backgroundColors.red = '';
		},
		/**
		 * @deprecated use `clearBG.green` (BG upper case) instead. The support for this will be dropped soon
		 */
		green: (): void => {
			this._config_.backgroundColors.green = '';
		},
		/**
		 * @deprecated use `clearBG.yellow` (BG upper case) instead. The support for this will be dropped soon
		 */
		yellow: (): void => {
			this._config_.backgroundColors.yellow = '';
		},
		/**
		 * @deprecated use `clearBG.blue` (BG upper case) instead. The support for this will be dropped soon
		 */
		blue: (): void => {
			this._config_.backgroundColors.blue = '';
		},
		/**
		 * @deprecated use `clearBG.magenta` (BG upper case) instead. The support for this will be dropped soon
		 */
		magenta: (): void => {
			this._config_.backgroundColors.magenta = '';
		},
		/**
		 * @deprecated use `clearBG.cyan` (BG upper case) instead. The support for this will be dropped soon
		 */
		cyan: (): void => {
			this._config_.backgroundColors.cyan = '';
		},
		/**
		 * @deprecated use `clearBG.white` (BG upper case) instead. The support for this will be dropped soon
		 */
		white: (): void => {
			this._config_.backgroundColors.white = '';
		},
		/**
		 * @deprecated use `clearBG.gray` (BG upper case) instead. The support for this will be dropped soon
		 */
		gray: (): void => {
			this._config_.backgroundColors.gray = '';
		},
		/**
		 * @deprecated use `clearBG.grey` (BG upper case) instead. The support for this will be dropped soon
		 */
		grey: (): void => {
			this._config_.backgroundColors.gray = '';
		},
		/**
		 * @deprecated use `clearBG.pink` (BG upper case) instead. The support for this will be dropped soon
		 */
		pink: (): void => {
			this._config_.backgroundColors.pink = '';
		},
		/**
		 * @deprecated use `clearBG.orange` (BG upper case) instead. The support for this will be dropped soon
		 */
		orange: (): void => {
			this._config_.backgroundColors.orange = '';
		}
	};

	/**
	 * Restore the background color for a given printer
	 */
	readonly clearBG = {
		/**
		 * Clear the background color for the `.black` printer
		 */
		black: (): void => {
			this._config_.backgroundColors.black = '';
		},
		/**
		 * Clear the background color for the `.red` printer
		 */
		red: (): void => {
			this._config_.backgroundColors.red = '';
		},
		/**
		 * Clear the background color for the `.green` printer
		 */
		green: (): void => {
			this._config_.backgroundColors.green = '';
		},
		/**
		 * Clear the background color for the `.yellow` printer
		 */
		yellow: (): void => {
			this._config_.backgroundColors.yellow = '';
		},
		/**
		 * Clear the background color for the `.blue` printer
		 */
		blue: (): void => {
			this._config_.backgroundColors.blue = '';
		},
		/**
		 * Clear the background color for the `.magenta` printer
		 */
		magenta: (): void => {
			this._config_.backgroundColors.magenta = '';
		},
		/**
		 * Clear the background color for the `.cyan` printer
		 */
		cyan: (): void => {
			this._config_.backgroundColors.cyan = '';
		},
		/**
		 * Clear the background color for the `.white` printer
		 */
		white: (): void => {
			this._config_.backgroundColors.white = '';
		},
		/**
		 * Clear the background color for the `.gray` printer
		 */
		gray: (): void => {
			this._config_.backgroundColors.gray = '';
		},
		/**
		 * Clear the background color for the `.grey` printer
		 */
		grey: (): void => {
			this._config_.backgroundColors.gray = '';
		},
		/**
		 * Clear the background color for the `.pink` printer
		 */
		pink: (): void => {
			this._config_.backgroundColors.pink = '';
		},
		/**
		 * Clear the background color for the `.orange` printer
		 */
		orange: (): void => {
			this._config_.backgroundColors.orange = '';
		}
	};

	/**
	 * Get a socket to emit the event 'console' every time `print.log` is called.
	 * The message is sent with the time stamp.
	 * @param socket the socket to be used
	 */
	socket(socket: Socket) {
		this._config_.socket = socket;
	};

};

export const print = Print.create();

// Some emojis
export const warning = '\u{26a0}',
      recycle = '\u{267b}',
      heart   = '\u{2764}',
      heavy_check_mark = '\u{FE0F}',
      satellite_antenna = '\u{1F4E1}',
      no_entry = '\u{26D4}';

/**
 * Retrieve the function from the call stack
 * @param call call stack line content
 * @returns the function on the call stack
 */
 function getFunctionName(call: string): string {
	return call.slice(call.indexOf('at ') + 3, call.indexOf(' ('));
}

/**
 * Retrieve the file from the call stack
 * @param call call stack line content
 * @returns the stack file
 */
function getFileName(call: string): string {
	let split: string[];
	if (call.includes('\\')) {
		split = call.split('\\');
	} else {
		split = call.split('/');
	}

	return split[split.length - 1].replace(')', '');
}