import { Socket } from "node:dgram";
interface Printers {
    log(data: any, ...args: any[]): void;
    black(data: any, ...args: any[]): void;
    red(data: any, ...args: any[]): void;
    green(data: any, ...args: any[]): void;
    yellow(data: any, ...args: any[]): void;
    blue(data: any, ...args: any[]): void;
    magenta(data: any, ...args: any[]): void;
    cyan(data: any, ...args: any[]): void;
    white(data: any, ...args: any[]): void;
    gray(data: any, ...args: any[]): void;
    pink(data: any, ...args: any[]): void;
    orange(data: any, ...args: any[]): void;
}
interface Inline_Printers extends Printers {
    bright: Printers;
    bold: Printers;
    italic: Printers;
    dim: Printers;
    underscore: Printers;
    reverse: Printers;
}
export declare const print: {
    bright: Printers;
    bold: Printers;
    italic: Printers;
    dim: Printers;
    underscore: Printers;
    reverse: Printers;
    inline: Inline_Printers;
    socket(_socket: Socket): void;
    toLog(data: string | string[], file: string): void;
    goBacknLines(lines: number): void;
    clearLine(lines?: number): void;
    clear(): void;
    showMs(show_ms?: boolean): void;
    showDate(show_date?: boolean): void;
    log(data: any, ...args: any[]): void;
    black(data: any, ...args: any[]): void;
    red(data: any, ...args: any[]): void;
    green(data: any, ...args: any[]): void;
    yellow(data: any, ...args: any[]): void;
    blue(data: any, ...args: any[]): void;
    magenta(data: any, ...args: any[]): void;
    cyan(data: any, ...args: any[]): void;
    white(data: any, ...args: any[]): void;
    gray(data: any, ...args: any[]): void;
    pink(data: any, ...args: any[]): void;
    orange(data: any, ...args: any[]): void;
    track(error: Error): void;
    setBg: {
        black: (newBG: string) => void;
        red: (newBG: string) => void;
        green: (newBG: string) => void;
        yellow: (newBG: string) => void;
        blue: (newBG: string) => void;
        magenta: (newBG: string) => void;
        cyan: (newBG: string) => void;
        white: (newBG: string) => void;
        gray: (newBG: string) => void;
        pink: (newBG: string) => void;
        orange: (newBG: string) => void;
    };
    clear_Bg: {
        black: () => void;
        red: () => void;
        green: () => void;
        yellow: () => void;
        blue: () => void;
        magenta: () => void;
        cyan: () => void;
        white: () => void;
        gray: () => void;
        pink: () => void;
        orange: () => void;
    };
};
export {};
