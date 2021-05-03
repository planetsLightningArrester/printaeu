"use strict";
exports.__esModule = true;
exports.print = void 0;
var readline = require("readline");
var fs = require("fs");
;
;
;
var color = {
    //Modifiers
    reset: '\x1b[0m',
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    italic: "\x1b[3m",
    underscore: "\x1b[4m",
    reverse: "\x1b[7m",
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
    dim_black: "\u001b[38;5;8m",
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
var bg = {
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
var MS_ON = -1, MS_OFF = -5, DATE_ON = 0, DATE_OFF = 11;
var msOnOff = MS_OFF;
var dateOnOff = DATE_OFF;
function getFunctionName(call) {
    return call.slice(call.indexOf('at ') + 3, call.indexOf(' ('));
}
function getFileName(call) {
    var split;
    if (call.includes('\\')) {
        split = call.split('\\');
    }
    else {
        split = call.split('/');
    }
    return split[split.length - 1].replace(')', '');
}
var Colors = /** @class */ (function () {
    function Colors(modifier, dim) {
        this.modifier = modifier;
        this.dim = dim ? "dim_" : "";
    }
    Colors.prototype.log = function (data) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        console.log("" + this.modifier + timeStamp() + data, args.reduce(function (t, e) { return t + e + ' '; }, ''));
        process.stdout.write(color.reset);
    };
    ;
    Colors.prototype.black = function (data) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        console.log("" + this.modifier + color[this.dim + 'black'] + bg.black + timeStamp() + data, args.reduce(function (t, e) { return t + e + ' '; }, ''));
        process.stdout.write(color.reset);
    };
    ;
    Colors.prototype.red = function (data) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        console.log("" + this.modifier + color[this.dim + 'red'] + bg.red + timeStamp() + data, args.reduce(function (t, e) { return t + e + ' '; }, ''));
        process.stdout.write(color.reset);
    };
    ;
    Colors.prototype.green = function (data) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        console.log("" + this.modifier + color[this.dim + 'green'] + bg.green + timeStamp() + data, args.reduce(function (t, e) { return t + e + ' '; }, ''));
        process.stdout.write(color.reset);
    };
    ;
    Colors.prototype.yellow = function (data) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        console.log("" + this.modifier + color[this.dim + 'yellow'] + bg.yellow + timeStamp() + data, args.reduce(function (t, e) { return t + e + ' '; }, ''));
        process.stdout.write(color.reset);
    };
    ;
    Colors.prototype.blue = function (data) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        console.log("" + this.modifier + color[this.dim + 'blue'] + bg.blue + timeStamp() + data, args.reduce(function (t, e) { return t + e + ' '; }, ''));
        process.stdout.write(color.reset);
    };
    ;
    Colors.prototype.magenta = function (data) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        console.log("" + this.modifier + color[this.dim + 'magenta'] + bg.magenta + timeStamp() + data, args.reduce(function (t, e) { return t + e + ' '; }, ''));
        process.stdout.write(color.reset);
    };
    ;
    Colors.prototype.cyan = function (data) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        console.log("" + this.modifier + color[this.dim + 'cyan'] + bg.cyan + timeStamp() + data, args.reduce(function (t, e) { return t + e + ' '; }, ''));
        process.stdout.write(color.reset);
    };
    ;
    Colors.prototype.white = function (data) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        console.log("" + this.modifier + color[this.dim + 'white'] + bg.white + timeStamp() + data, args.reduce(function (t, e) { return t + e + ' '; }, ''));
        process.stdout.write(color.reset);
    };
    ;
    Colors.prototype.gray = function (data) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        console.log("" + this.modifier + color[this.dim + 'gray'] + bg.gray + timeStamp() + data, args.reduce(function (t, e) { return t + e + ' '; }, ''));
        process.stdout.write(color.reset);
    };
    ;
    Colors.prototype.grey = function (data) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        console.log("" + this.modifier + color[this.dim + 'gray'] + bg.gray + timeStamp() + data, args.reduce(function (t, e) { return t + e + ' '; }, ''));
        process.stdout.write(color.reset);
    };
    ;
    Colors.prototype.pink = function (data) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        console.log("" + this.modifier + color[this.dim + 'pink'] + bg.pink + timeStamp() + data, args.reduce(function (t, e) { return t + e + ' '; }, ''));
        process.stdout.write(color.reset);
    };
    ;
    Colors.prototype.orange = function (data) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        console.log("" + this.modifier + color[this.dim + 'orange'] + bg.orange + timeStamp() + data, args.reduce(function (t, e) { return t + e + ' '; }, ''));
        process.stdout.write(color.reset);
    };
    ;
    return Colors;
}());
;
var InlineColors = /** @class */ (function () {
    function InlineColors(modifier, dim) {
        this.modifier = modifier;
        this.dim = dim ? "dim_" : "";
    }
    InlineColors.prototype.log = function (data) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        readline.cursorTo(process.stdout, 0);
        readline.moveCursor(process.stdout, 0, -1);
        readline.clearLine(process.stdout, 0);
        console.log("" + this.modifier + timeStamp() + data, args.reduce(function (t, e) { return t + e + ' '; }, ''));
        process.stdout.write(color.reset);
    };
    ;
    InlineColors.prototype.black = function (data) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        readline.cursorTo(process.stdout, 0);
        readline.moveCursor(process.stdout, 0, -1);
        readline.clearLine(process.stdout, 0);
        console.log("" + this.modifier + color[this.dim + 'black'] + bg.black + timeStamp() + data, args.reduce(function (t, e) { return t + e + ' '; }, ''));
        process.stdout.write(color.reset);
    };
    ;
    InlineColors.prototype.red = function (data) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        readline.cursorTo(process.stdout, 0);
        readline.moveCursor(process.stdout, 0, -1);
        readline.clearLine(process.stdout, 0);
        console.log("" + this.modifier + color[this.dim + 'red'] + bg.red + timeStamp() + data, args.reduce(function (t, e) { return t + e + ' '; }, ''));
        process.stdout.write(color.reset);
    };
    ;
    InlineColors.prototype.green = function (data) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        readline.cursorTo(process.stdout, 0);
        readline.moveCursor(process.stdout, 0, -1);
        readline.clearLine(process.stdout, 0);
        console.log("" + this.modifier + color[this.dim + 'green'] + bg.green + timeStamp() + data, args.reduce(function (t, e) { return t + e + ' '; }, ''));
        process.stdout.write(color.reset);
    };
    ;
    InlineColors.prototype.yellow = function (data) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        readline.cursorTo(process.stdout, 0);
        readline.moveCursor(process.stdout, 0, -1);
        readline.clearLine(process.stdout, 0);
        console.log("" + this.modifier + color[this.dim + 'yellow'] + bg.yellow + timeStamp() + data, args.reduce(function (t, e) { return t + e + ' '; }, ''));
        process.stdout.write(color.reset);
    };
    ;
    InlineColors.prototype.blue = function (data) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        readline.cursorTo(process.stdout, 0);
        readline.moveCursor(process.stdout, 0, -1);
        readline.clearLine(process.stdout, 0);
        console.log("" + this.modifier + color[this.dim + 'blue'] + bg.blue + timeStamp() + data, args.reduce(function (t, e) { return t + e + ' '; }, ''));
        process.stdout.write(color.reset);
    };
    ;
    InlineColors.prototype.magenta = function (data) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        readline.cursorTo(process.stdout, 0);
        readline.moveCursor(process.stdout, 0, -1);
        readline.clearLine(process.stdout, 0);
        console.log("" + this.modifier + color[this.dim + 'magenta'] + bg.magenta + timeStamp() + data, args.reduce(function (t, e) { return t + e + ' '; }, ''));
        process.stdout.write(color.reset);
    };
    ;
    InlineColors.prototype.cyan = function (data) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        readline.cursorTo(process.stdout, 0);
        readline.moveCursor(process.stdout, 0, -1);
        readline.clearLine(process.stdout, 0);
        console.log("" + this.modifier + color[this.dim + 'cyan'] + bg.cyan + timeStamp() + data, args.reduce(function (t, e) { return t + e + ' '; }, ''));
        process.stdout.write(color.reset);
    };
    ;
    InlineColors.prototype.white = function (data) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        readline.cursorTo(process.stdout, 0);
        readline.moveCursor(process.stdout, 0, -1);
        readline.clearLine(process.stdout, 0);
        console.log("" + this.modifier + color[this.dim + 'white'] + bg.white + timeStamp() + data, args.reduce(function (t, e) { return t + e + ' '; }, ''));
        process.stdout.write(color.reset);
    };
    ;
    InlineColors.prototype.gray = function (data) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        readline.cursorTo(process.stdout, 0);
        readline.moveCursor(process.stdout, 0, -1);
        readline.clearLine(process.stdout, 0);
        console.log("" + this.modifier + color[this.dim + 'gray'] + bg.gray + timeStamp() + data, args.reduce(function (t, e) { return t + e + ' '; }, ''));
        process.stdout.write(color.reset);
    };
    ;
    InlineColors.prototype.grey = function (data) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        readline.cursorTo(process.stdout, 0);
        readline.moveCursor(process.stdout, 0, -1);
        readline.clearLine(process.stdout, 0);
        console.log("" + this.modifier + color[this.dim + 'gray'] + bg.gray + timeStamp() + data, args.reduce(function (t, e) { return t + e + ' '; }, ''));
        process.stdout.write(color.reset);
    };
    ;
    InlineColors.prototype.pink = function (data) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        readline.cursorTo(process.stdout, 0);
        readline.moveCursor(process.stdout, 0, -1);
        readline.clearLine(process.stdout, 0);
        console.log("" + this.modifier + color[this.dim + 'pink'] + bg.pink + timeStamp() + data, args.reduce(function (t, e) { return t + e + ' '; }, ''));
        process.stdout.write(color.reset);
    };
    ;
    InlineColors.prototype.orange = function (data) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        readline.cursorTo(process.stdout, 0);
        readline.moveCursor(process.stdout, 0, -1);
        readline.clearLine(process.stdout, 0);
        console.log("" + this.modifier + color[this.dim + 'orange'] + bg.orange + timeStamp() + data, args.reduce(function (t, e) { return t + e + ' '; }, ''));
        process.stdout.write(color.reset);
    };
    ;
    return InlineColors;
}());
;
var filePath = '';
var logging = false;
var dataToLog = [];
var _socket;
exports.print = new /** @class */ (function () {
    function Print() {
        this.setBg = {
            black: function (newBG) {
                bg.black = color[newBG + '_BG'];
            },
            red: function (newBG) {
                bg.red = color[newBG + '_BG'];
            },
            green: function (newBG) {
                bg.green = color[newBG + '_BG'];
            },
            yellow: function (newBG) {
                bg.yellow = color[newBG + '_BG'];
            },
            blue: function (newBG) {
                bg.blue = color[newBG + '_BG'];
            },
            magenta: function (newBG) {
                bg.magenta = color[newBG + '_BG'];
            },
            cyan: function (newBG) {
                bg.cyan = color[newBG + '_BG'];
            },
            white: function (newBG) {
                bg.white = color[newBG + '_BG'];
            },
            gray: function (newBG) {
                bg.gray = color[newBG + '_BG'];
            },
            grey: function (newBG) {
                bg.gray = color[newBG + '_BG'];
            },
            pink: function (newBG) {
                bg.pink = color[newBG + '_BG'];
            },
            orange: function (newBG) {
                bg.orange = color[newBG + '_BG'];
            }
        };
        this.clear_Bg = {
            black: function () {
                bg.black = '';
            },
            red: function () {
                bg.red = '';
            },
            green: function () {
                bg.green = '';
            },
            yellow: function () {
                bg.yellow = '';
            },
            blue: function () {
                bg.blue = '';
            },
            magenta: function () {
                bg.magenta = '';
            },
            cyan: function () {
                bg.cyan = '';
            },
            white: function () {
                bg.white = '';
            },
            gray: function () {
                bg.gray = '';
            },
            grey: function () {
                bg.gray = '';
            },
            pink: function () {
                bg.pink = '';
            },
            orange: function () {
                bg.orange = '';
            }
        };
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
            log: function (data) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                readline.cursorTo(process.stdout, 0);
                readline.moveCursor(process.stdout, 0, -1);
                readline.clearLine(process.stdout, 0);
                console.log(timeStamp() + data, args.reduce(function (t, e) { return t + e + ' '; }, ''));
                if (_socket)
                    _socket.emit('console', timeStamp() + data);
            },
            black: function (data) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                readline.cursorTo(process.stdout, 0);
                readline.moveCursor(process.stdout, 0, -1);
                readline.clearLine(process.stdout, 0);
                console.log("" + color.black + bg.black + timeStamp() + data, args.reduce(function (t, e) { return t + e + ' '; }, ''));
                process.stdout.write(color.reset);
            },
            red: function (data) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                readline.cursorTo(process.stdout, 0);
                readline.moveCursor(process.stdout, 0, -1);
                readline.clearLine(process.stdout, 0);
                console.log("" + color.red + bg.red + timeStamp() + data, args.reduce(function (t, e) { return t + e + ' '; }, ''));
                process.stdout.write(color.reset);
            },
            green: function (data) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                readline.cursorTo(process.stdout, 0);
                readline.moveCursor(process.stdout, 0, -1);
                readline.clearLine(process.stdout, 0);
                console.log("" + color.green + bg.green + timeStamp() + data, args.reduce(function (t, e) { return t + e + ' '; }, ''));
                process.stdout.write(color.reset);
            },
            yellow: function (data) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                readline.cursorTo(process.stdout, 0);
                readline.moveCursor(process.stdout, 0, -1);
                readline.clearLine(process.stdout, 0);
                console.log("" + color.yellow + bg.yellow + timeStamp() + data, args.reduce(function (t, e) { return t + e + ' '; }, ''));
                process.stdout.write(color.reset);
            },
            blue: function (data) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                readline.cursorTo(process.stdout, 0);
                readline.moveCursor(process.stdout, 0, -1);
                readline.clearLine(process.stdout, 0);
                console.log("" + color.blue + bg.blue + timeStamp() + data, args.reduce(function (t, e) { return t + e + ' '; }, ''));
                process.stdout.write(color.reset);
            },
            magenta: function (data) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                readline.cursorTo(process.stdout, 0);
                readline.moveCursor(process.stdout, 0, -1);
                readline.clearLine(process.stdout, 0);
                console.log("" + color.magenta + bg.magenta + timeStamp() + data, args.reduce(function (t, e) { return t + e + ' '; }, ''));
                process.stdout.write(color.reset);
            },
            cyan: function (data) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                readline.cursorTo(process.stdout, 0);
                readline.moveCursor(process.stdout, 0, -1);
                readline.clearLine(process.stdout, 0);
                console.log("" + color.cyan + bg.cyan + timeStamp() + data, args.reduce(function (t, e) { return t + e + ' '; }, ''));
                process.stdout.write(color.reset);
            },
            white: function (data) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                readline.cursorTo(process.stdout, 0);
                readline.moveCursor(process.stdout, 0, -1);
                readline.clearLine(process.stdout, 0);
                console.log("" + color.white + bg.white + timeStamp() + data, args.reduce(function (t, e) { return t + e + ' '; }, ''));
                process.stdout.write(color.reset);
            },
            gray: function (data) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                readline.cursorTo(process.stdout, 0);
                readline.moveCursor(process.stdout, 0, -1);
                readline.clearLine(process.stdout, 0);
                console.log("" + color.gray + bg.gray + timeStamp() + data, args.reduce(function (t, e) { return t + e + ' '; }, ''));
                process.stdout.write(color.reset);
            },
            grey: function (data) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                readline.cursorTo(process.stdout, 0);
                readline.moveCursor(process.stdout, 0, -1);
                readline.clearLine(process.stdout, 0);
                console.log("" + color.gray + bg.gray + timeStamp() + data, args.reduce(function (t, e) { return t + e + ' '; }, ''));
                process.stdout.write(color.reset);
            },
            pink: function (data) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                readline.cursorTo(process.stdout, 0);
                readline.moveCursor(process.stdout, 0, -1);
                readline.clearLine(process.stdout, 0);
                console.log("" + color.pink + bg.pink + timeStamp() + data, args.reduce(function (t, e) { return t + e + ' '; }, ''));
                process.stdout.write(color.reset);
            },
            orange: function (data) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                readline.cursorTo(process.stdout, 0);
                readline.moveCursor(process.stdout, 0, -1);
                readline.clearLine(process.stdout, 0);
                console.log("" + color.orange + bg.orange + timeStamp() + data, args.reduce(function (t, e) { return t + e + ' '; }, ''));
                process.stdout.write(color.reset);
            }
        };
    }
    Print.prototype.socket = function (_socket) {
        _socket = _socket;
    };
    ;
    Print.prototype.toLog = function (data, file) {
        var _this = this;
        if (file) {
            filePath = file;
        }
        if (!Array.isArray(data)) {
            data = [data];
        }
        if (!logging) {
            logging = true;
            dataToLog = [];
            var text_1 = '';
            data.forEach(function (el) {
                if (typeof el === 'object') {
                    text_1 += timeStamp() + JSON.stringify(el) + '\n';
                }
                else {
                    text_1 += timeStamp() + el + '\n';
                }
            });
            fs.appendFile(filePath, text_1, function (err) {
                if (err)
                    throw err;
                logging = false;
                console.log(dataToLog);
                if (dataToLog.length) {
                    _this.toLog(dataToLog, filePath);
                }
            });
        }
        else {
            dataToLog = dataToLog.concat(data);
        }
    };
    ;
    Print.prototype.goBacknLines = function (lines) {
        readline.cursorTo(process.stdout, 0);
        readline.moveCursor(process.stdout, 0, -lines);
        readline.clearLine(process.stdout, 0);
    };
    ;
    Print.prototype.clearLine = function (lines) {
        if (lines === void 0) { lines = 0; }
        readline.cursorTo(process.stdout, 0);
        readline.moveCursor(process.stdout, 0, -lines);
        readline.clearLine(process.stdout, 0);
    };
    ;
    Print.prototype.clear = function () {
        process.stdout.write(color.cls);
    };
    ;
    Print.prototype.showMs = function (show_ms) {
        if (show_ms === void 0) { show_ms = true; }
        if (show_ms) {
            msOnOff = MS_ON;
        }
        else {
            msOnOff = MS_OFF;
        }
    };
    ;
    Print.prototype.showDate = function (show_date) {
        if (show_date === void 0) { show_date = true; }
        if (show_date) {
            dateOnOff = DATE_ON;
        }
        else {
            dateOnOff = DATE_OFF;
        }
    };
    ;
    Print.prototype.log = function (data) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        console.log(timeStamp() + data, args.reduce(function (t, e) { return t + e + ' '; }, ''));
        if (_socket)
            _socket.emit('console', timeStamp() + data);
    };
    ;
    Print.prototype.black = function (data) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        console.log("" + color.black + bg.black + timeStamp() + data, args.reduce(function (t, e) { return t + e + ' '; }, ''));
        process.stdout.write(color.reset);
    };
    ;
    Print.prototype.red = function (data) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        console.log("" + color.red + bg.red + timeStamp() + data, args.reduce(function (t, e) { return t + e + ' '; }, ''));
        process.stdout.write(color.reset);
    };
    ;
    Print.prototype.green = function (data) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        console.log("" + color.green + bg.green + timeStamp() + data, args.reduce(function (t, e) { return t + e + ' '; }, ''));
        process.stdout.write(color.reset);
    };
    ;
    Print.prototype.yellow = function (data) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        console.log("" + color.yellow + bg.yellow + timeStamp() + data, args.reduce(function (t, e) { return t + e + ' '; }, ''));
        process.stdout.write(color.reset);
    };
    ;
    Print.prototype.blue = function (data) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        console.log("" + color.blue + bg.blue + timeStamp() + data, args.reduce(function (t, e) { return t + e + ' '; }, ''));
        process.stdout.write(color.reset);
    };
    ;
    Print.prototype.magenta = function (data) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        console.log("" + color.magenta + bg.magenta + timeStamp() + data, args.reduce(function (t, e) { return t + e + ' '; }, ''));
        process.stdout.write(color.reset);
    };
    ;
    Print.prototype.cyan = function (data) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        console.log("" + color.cyan + bg.cyan + timeStamp() + data, args.reduce(function (t, e) { return t + e + ' '; }, ''));
        process.stdout.write(color.reset);
    };
    ;
    Print.prototype.white = function (data) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        console.log("" + color.white + bg.white + timeStamp() + data, args.reduce(function (t, e) { return t + e + ' '; }, ''));
        process.stdout.write(color.reset);
    };
    ;
    Print.prototype.gray = function (data) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        console.log("" + color.gray + bg.gray + timeStamp() + data, args.reduce(function (t, e) { return t + e + ' '; }, ''));
        process.stdout.write(color.reset);
    };
    ;
    Print.prototype.grey = function (data) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        console.log("" + color.gray + bg.gray + timeStamp() + data, args.reduce(function (t, e) { return t + e + ' '; }, ''));
        process.stdout.write(color.reset);
    };
    ;
    Print.prototype.pink = function (data) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        console.log("" + color.pink + bg.pink + timeStamp() + data, args.reduce(function (t, e) { return t + e + ' '; }, ''));
        process.stdout.write(color.reset);
    };
    ;
    Print.prototype.orange = function (data) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        console.log("" + color.orange + bg.orange + timeStamp() + data, args.reduce(function (t, e) { return t + e + ' '; }, ''));
        process.stdout.write(color.reset);
    };
    ;
    Print.prototype.track = function (error) {
        this.bright.red('Error trace: ');
        if (typeof error.stack !== 'undefined') {
            var calls = error.stack.toString().split("\n");
            var index = 0;
            for (var i = calls.length - 1; i > 0; i--) {
                var call = calls[i];
                var functionName = getFunctionName(call);
                var fileName = getFileName(call);
                if (!index) {
                    process.stdout.write("" + color.bright + color.white + "[call] " + color.reset + functionName + "(" + fileName + ")\n");
                    index++;
                }
                else if (index !== (calls.length - 1)) {
                    process.stdout.write("[" + index + "] " + functionName + "(" + fileName + ")\n");
                }
                else {
                    process.stdout.write("" + color.bright + color.white + "[throw] " + color.reset + functionName + "(" + fileName + ")\n");
                }
                index++;
            }
        }
        else {
            this.bright.orange('No error trace!');
        }
    };
    ;
    return Print;
}());
function timeStamp() {
    var time = new Date().toISOString();
    return '[' + time.slice(dateOnOff, msOnOff) + '] ';
}
