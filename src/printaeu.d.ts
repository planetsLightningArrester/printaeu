/// <reference types="node" />
import { Socket } from 'dgram';
/** Possible background colors */
export type BackgroundsColors = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';
interface Backgrounds {
    name: BackgroundsColors;
    value: string;
}
/** The bold modifier */
export declare const bold: {
    readonly on: "\u001B[1m";
    readonly off: "\u001B[22m" | "\u001B[21m";
};
/** The dim modifier (work on some terminals) */
export declare const dim: {
    readonly on: "\u001B[2m";
    readonly off: "\u001B[22m";
};
/** The italic modifier */
export declare const italic: {
    readonly on: "\u001B[3m";
    readonly off: "\u001B[23m";
};
/** The underline modifier */
export declare const underline: {
    readonly on: "\u001B[4m";
    readonly off: "\u001B[24m";
};
/** The reverse modifier */
export declare const reverse: {
    readonly on: "\u001B[7m";
    readonly off: "\u001B[27m";
};
declare class ColorModifiers {
    reset: string;
    bright: string;
    dim: string;
    italic: string;
    underline: string;
    reverse: string;
    black: string;
    red: string;
    green: string;
    yellow: string;
    blue: string;
    magenta: string;
    cyan: string;
    white: string;
    gray: string;
    pink: string;
    orange: string;
    dimBlack: string;
    dimRed: string;
    dimGreen: string;
    dimYellow: string;
    dimBlue: string;
    dimMagenta: string;
    dimCyan: string;
    dimWhite: string;
    dimGray: string;
    dimPink: string;
    dimOrange: string;
    backgrounds: Backgrounds[];
    cls: string;
}
export declare const color: ColorModifiers;
/** String offsets to show or hide the milliseconds from the time stamp */
declare enum MS {
    ON = -1,
    OFF = -5
}
/** String offsets to show or hide the date from the time stamp */
declare enum DATE {
    ON = 0,
    OFF = 11
}
/** Printers options */
interface ColorOptions {
    modifier?: string;
    dim?: boolean;
    inline?: boolean;
}
declare class Printers {
    private _socket;
    private config;
    private isInline;
    private modifier;
    private isDim;
    private verbosity;
    constructor(verbosity: Verbosity, config: PrintConfig, options: ColorOptions);
    /**
     * Log everything it's printed into a file. It always append the file and modifiers and `inline` has no effect.
     * This dramatically impacts performance.
     * @param filePath the full path to the file to be written
     * @param log enable or disable the log. Default is `true`
     */
    logToFile(filePath: string, log?: boolean): void;
    /**
     * Create a stamp for the current time
     * @returns the formatted time stamp
     */
    private timeStamp;
    /**
     * Pretty much the same as `console.log()` + time stamp
     * @param data same as `console.log()`
     * @param args same as `console.log()`
     */
    log(data: any, ...args: any[]): void;
    /**
     * Print data in black + time stamp
     * @param data same as `console.log()`
     * @param args same as `console.log()`
     */
    black(data: any, ...args: any[]): void;
    /**
     * Print data in red + time stamp
     * @param data same as `console.log()`
     * @param args same as `console.log()`
     */
    red(data: any, ...args: any[]): void;
    /**
     * Print data in green + time stamp
     * @param data same as `console.log()`
     * @param args same as `console.log()`
     */
    green(data: any, ...args: any[]): void;
    /**
     * Print data in yellow + time stamp
     * @param data same as `console.log()`
     * @param args same as `console.log()`
     */
    yellow(data: any, ...args: any[]): void;
    /**
     * Print data in blue + time stamp
     * @param data same as `console.log()`
     * @param args same as `console.log()`
     */
    blue(data: any, ...args: any[]): void;
    /**
     * Print data in magenta + time stamp
     * @param data same as `console.log()`
     * @param args same as `console.log()`
     */
    magenta(data: any, ...args: any[]): void;
    /**
     * Print data in cyan + time stamp
     * @param data same as `console.log()`
     * @param args same as `console.log()`
     */
    cyan(data: any, ...args: any[]): void;
    /**
     * Print data in white + time stamp
     * @param data same as `console.log()`
     * @param args same as `console.log()`
     */
    white(data: any, ...args: any[]): void;
    /**
     * Print data in gray + time stamp
     * @param data same as `console.log()`
     * @param args same as `console.log()`
     */
    gray(data: any, ...args: any[]): void;
    /**
     * Print data in grey + time stamp
     * @param data same as `console.log()`
     * @param args same as `console.log()`
     */
    grey(data: any, ...args: any[]): void;
    /**
     * Print data in pink + time stamp
     * @param data same as `console.log()`
     * @param args same as `console.log()`
     */
    pink(data: any, ...args: any[]): void;
    /**
     * Print data in orange + time stamp
     * @param data same as `console.log()`
     * @param args same as `console.log()`
     */
    orange(data: any, ...args: any[]): void;
    /**
     * After printing, the text is logged inside a file with the time stamps
     * @param data the data to be logged
     * @param file the log file full path
     */
    private toLog;
}
/** Extend Printers to generate modifiers */
declare class Modifiers extends Printers {
    /** Show the text brighter. Same as `bold` */
    readonly bright: Printers;
    /** Show a bold text. Same as `bright` */
    readonly bold: Printers;
    /** Show the text in italic */
    readonly italic: Printers;
    /** Show the text dim (a little darker) */
    readonly dim: Printers;
    /** @deprecated use `underline` instead. The support to `underscore` will be dropped soon */
    readonly underscore: Printers;
    /** Show the text with an underline */
    readonly underline: Printers;
    /** Show the text with the foreground and background colors reversed */
    readonly reverse: Printers;
    constructor(verbosity: Verbosity, config: PrintConfig, inline: boolean);
}
/** Verbosity options */
export type VerbosityOptions = 'low' | 'medium' | 'high';
/** Internal verbosity enum */
declare enum Verbosity {
    LOW = 0,
    MEDIUM = 1,
    HIGH = 2
}
/** High Verbosity class */
declare class HighVerbosity extends Modifiers {
    readonly inline: Modifiers;
    constructor(config: PrintConfig);
}
/** Medium verbosity class */
declare class MediumVerbosity extends Modifiers {
    readonly inline: Modifiers;
    constructor(config: PrintConfig);
}
/** Print general configurations */
declare class PrintConfig {
    /** Flag that stores whether print should show time stamp with the modifiers */
    cleanTimeStamp: boolean;
    /** Flag that stores whether print should show until milliseconds */
    msOnOff: MS;
    /** Flag that stores whether print should show the date */
    dateOnOff: DATE;
    /** String to pre-append in all `print` calls */
    preAppend: string;
    /** The socket, if any, to have the 'console' event triggered every `print.log` call */
    socket: Socket | undefined;
    /** The current print verbosity */
    verbosity: Verbosity;
    /** The current print background color for each available text color */
    backgroundColors: {
        /** The current background color for the black text */
        black: string;
        /** The current background color for the red text */
        red: string;
        /** The current background color for the green text */
        green: string;
        /** The current background color for the yellow text */
        yellow: string;
        /** The current background color for the blue text */
        blue: string;
        /** The current background color for the magenta text */
        magenta: string;
        /** The current background color for the cyan text */
        cyan: string;
        /** The current background color for the white text */
        white: string;
        /** The current background color for the gray text */
        gray: string;
        /** The current background color for the pink text */
        pink: string;
        /** The current background color for the orange text */
        orange: string;
    };
    logFiles: string[];
    constructor();
}
export declare class Print extends Modifiers {
    /** Print the text on the same line as the current cursor */
    readonly inline: Modifiers;
    /** Print the text only if the verbosity is set to `high` using `setVerbosity` */
    readonly high: HighVerbosity;
    /** Print the text only if the verbosity is set to `medium` or higher using `setVerbosity` */
    readonly med: MediumVerbosity;
    /** Global print configurations */
    private _config_;
    private constructor();
    /**
     * Creates an awesome print object
     * @returns awesomeness
     */
    static create(): Print;
    /**
     * Pre-append a string on all `print` calls
     * @param str the string to pre-append
     */
    preAppend(str: string): void;
    /**
     * Move the cursor to some lines above its current position
     * @param lines the number of lines from the cursor current position
     */
    goBacknLines(lines: number): void;
    /**
     * Clear a certain number of lines above the cursor
     * @param lines the relative lines to be cleared
     */
    clearLine(lines?: number): void;
    /** Clear the console */
    clear(): void;
    /**
     * Turns on and off the milliseconds being shown in the time stamp
     * @param showMs if the milliseconds should be shown
     */
    showMs(showMs?: boolean): void;
    /**
     * Turns on and off the date being shown in the time stamp
     * @param showDate if the date should be shown
     */
    showDate(showDate?: boolean): void;
    /**
     * Whether print should show time stamp with the modifiers (colors, bold, etc...)
     */
    setColorfulTimeStamp(colorfulTimeStamp?: boolean): void;
    /**
     * Print the call stack in a clean way, with colors and stuff
     * @param error the `Error` object
     */
    track(error: Error): void;
    /**
     * Change the verbosity of `Print`. The verbosity affects only `print.low`,
     * `print.med`, `print.high`, and their children. Other calls are always printed.
     * @param verbosity the new verbosity value
     */
    setVerbosity(verbosity: VerbosityOptions): void;
    /** @deprecated use setBG instead. The support for this will be dropped soon */
    readonly setBg: {
        /** @deprecated use `setBG.black` (BG upper case) instead. The support for this will be dropped soon */
        black: (newBg: BackgroundsColors) => void;
        /** @deprecated use `setBG.red` (BG upper case) instead. The support for this will be dropped soon */
        red: (newBg: BackgroundsColors) => void;
        /** @deprecated use `setBG.green` (BG upper case) instead. The support for this will be dropped soon */
        green: (newBg: BackgroundsColors) => void;
        /** @deprecated use `setBG.yellow` (BG upper case) instead. The support for this will be dropped soon */
        yellow: (newBg: BackgroundsColors) => void;
        /** @deprecated use `setBG.blue` (BG upper case) instead. The support for this will be dropped soon */
        blue: (newBg: BackgroundsColors) => void;
        /** @deprecated use `setBG.magenta` (BG upper case) instead. The support for this will be dropped soon */
        magenta: (newBg: BackgroundsColors) => void;
        /** @deprecated use `setBG.cyan` (BG upper case) instead. The support for this will be dropped soon */
        cyan: (newBg: BackgroundsColors) => void;
        /** @deprecated use `setBG.white` (BG upper case) instead. The support for this will be dropped soon */
        white: (newBg: BackgroundsColors) => void;
        /** @deprecated use `setBG.gray` (BG upper case) instead. The support for this will be dropped soon */ gray: (newBg: BackgroundsColors) => void;
        /** @deprecated use `setBG.grey` (BG upper case) instead. The support for this will be dropped soon */
        grey: (newBg: BackgroundsColors) => void;
        /** @deprecated use `setBG.pink` (BG upper case) instead. The support for this will be dropped soon */
        pink: (newBg: BackgroundsColors) => void;
        /** @deprecated use `setBG.orange` (BG upper case) instead. The support for this will be dropped soon */
        orange: (newBg: BackgroundsColors) => void;
    };
    /** Set the background color for a given printer */
    readonly setBG: {
        /** Set the background color for the `.black` printer */
        black: (newBg: BackgroundsColors) => void;
        /** Set the background color for the `.red` printer */
        red: (newBg: BackgroundsColors) => void;
        /** Set the background color for the `.green` printer */
        green: (newBg: BackgroundsColors) => void;
        /** Set the background color for the `.yellow` printer */
        yellow: (newBg: BackgroundsColors) => void;
        /** Set the background color for the `.blue` printer */
        blue: (newBg: BackgroundsColors) => void;
        /** Set the background color for the `.magenta` printer */
        magenta: (newBg: BackgroundsColors) => void;
        /** Set the background color for the `.cyan` printer */
        cyan: (newBg: BackgroundsColors) => void;
        /** Set the background color for the `.white` printer */
        white: (newBg: BackgroundsColors) => void;
        /** Set the background color for the `.gray` printer */
        gray: (newBg: BackgroundsColors) => void;
        /** Set the background color for the `.grey` printer */
        grey: (newBg: BackgroundsColors) => void;
        /** Set the background color for the `.pink` printer */
        pink: (newBg: BackgroundsColors) => void;
        /** Set the background color for the `.orange` printer */
        orange: (newBg: BackgroundsColors) => void;
    };
    /** @deprecated use clearBG instead. The support for this will be dropped soon */
    readonly clear_Bg: {
        /** @deprecated use `clearBG.black` (BG upper case) instead. The support for this will be dropped soon */
        black: () => void;
        /** @deprecated use `clearBG.red` (BG upper case) instead. The support for this will be dropped soon */
        red: () => void;
        /** @deprecated use `clearBG.green` (BG upper case) instead. The support for this will be dropped soon */
        green: () => void;
        /** @deprecated use `clearBG.yellow` (BG upper case) instead. The support for this will be dropped soon */
        yellow: () => void;
        /** @deprecated use `clearBG.blue` (BG upper case) instead. The support for this will be dropped soon */
        blue: () => void;
        /** @deprecated use `clearBG.magenta` (BG upper case) instead. The support for this will be dropped soon */
        magenta: () => void;
        /** @deprecated use `clearBG.cyan` (BG upper case) instead. The support for this will be dropped soon */
        cyan: () => void;
        /** @deprecated use `clearBG.white` (BG upper case) instead. The support for this will be dropped soon */
        white: () => void;
        /** @deprecated use `clearBG.gray` (BG upper case) instead. The support for this will be dropped soon */
        gray: () => void;
        /** @deprecated use `clearBG.grey` (BG upper case) instead. The support for this will be dropped soon */
        grey: () => void;
        /** @deprecated use `clearBG.pink` (BG upper case) instead. The support for this will be dropped soon */
        pink: () => void;
        /** @deprecated use `clearBG.orange` (BG upper case) instead. The support for this will be dropped soon */
        orange: () => void;
    };
    /** Restore the background color for a given printer */
    readonly clearBG: {
        /** Clear the background color for the `.black` printer */
        black: () => void;
        /** Clear the background color for the `.red` printer */
        red: () => void;
        /** Clear the background color for the `.green` printer */
        green: () => void;
        /** Clear the background color for the `.yellow` printer */
        yellow: () => void;
        /** Clear the background color for the `.blue` printer */
        blue: () => void;
        /** Clear the background color for the `.magenta` printer */
        magenta: () => void;
        /** Clear the background color for the `.cyan` printer */
        cyan: () => void;
        /** Clear the background color for the `.white` printer */
        white: () => void;
        /** Clear the background color for the `.gray` printer */
        gray: () => void;
        /** Clear the background color for the `.grey` printer */
        grey: () => void;
        /** Clear the background color for the `.pink` printer */
        pink: () => void;
        /** Clear the background color for the `.orange` printer */
        orange: () => void;
    };
    /**
     * Get a socket to emit the event 'console' every time `print.log` is called.
     * The message is sent with the time stamp.
     * @param socket the socket to be used
     */
    socket(socket: Socket): void;
}
export declare const print: Print;
export declare const warning = "\u26A0", recycle = "\u267B", heart = "\u2764", heavy_check_mark = "\uFE0F", satellite_antenna = "\uD83D\uDCE1", no_entry = "\u26D4";
export {};
