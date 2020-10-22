const color = {
    //Modifiers
    reset: '\x1b[0m',       //Reset to default
    bright: "\x1b[1m",      //Brighter
    dim: "\x1b[2m",         //Dim
    underscore: "\x1b[4m",  //Put a underscore beneath everything
    reverse: "\x1b[7m",     //Reverses the fore and background colors

    //Font colors
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",

    //Background colors
    bgBlack: "\x1b[40m",
    bgRed: "\x1b[41m",
    bgGreen: "\x1b[42m",
    bgYellow: "\x1b[43m",
    bgBlue: "\x1b[44m",
    bgMagenta: "\x1b[45m",
    bgCyan: "\x1b[46m",
    bgWhite: "\x1b[47m",

    cls: '\033c'
}

let bg = {
    black: '',
    red: '',
    green: '',
    yellow: '',
    blue: '',
    magenta: '',
    cyan: '',
    white: ''
}

let msOnOff = -5;

class Colors {

    constructor (modifier) {
        this.modifier = modifier;
    }

    log = (data, ...args) => {
        console.log(`${this.modifier}${timeStamp()}${data}`, args.reduce((t,e)=>t+e+' ', ''));
        process.stdout.write(color.reset);
    };

    black = (data, ...args) => {
        console.log(`${this.modifier}${color.black}${bg.black}${timeStamp()}${data}`, args.reduce((t,e)=>t+e+' ', ''));
        process.stdout.write(color.reset);
    };

    red = (data, ...args) => {
        console.log(`${this.modifier}${color.red}${bg.red}${timeStamp()}${data}`, args.reduce((t,e)=>t+e+' ', ''));
        process.stdout.write(color.reset);
    };

    green = (data, ...args) => {
        console.log(`${this.modifier}${color.green}${bg.green}${timeStamp()}${data}`, args.reduce((t,e)=>t+e+' ', ''));
        process.stdout.write(color.reset);
    };

    yellow = (data, ...args) => {
        console.log(`${this.modifier}${color.yellow}${bg.yellow}${timeStamp()}${data}`, args.reduce((t,e)=>t+e+' ', ''));
        process.stdout.write(color.reset);
    };

    blue = (data, ...args) => {
        console.log(`${this.modifier}${color.blue}${bg.blue}${timeStamp()}${data}`, args.reduce((t,e)=>t+e+' ', ''));
        process.stdout.write(color.reset);
    };

    magenta = (data, ...args) => {
        console.log(`${this.modifier}${color.magenta}${bg.magenta}${timeStamp()}${data}`, args.reduce((t,e)=>t+e+' ', ''));
        process.stdout.write(color.reset);
    };

    cyan = (data, ...args) => {
        console.log(`${this.modifier}${color.cyan}${bg.cyan}${timeStamp()}${data}`, args.reduce((t,e)=>t+e+' ', ''));
        process.stdout.write(color.reset);
    };

    white = (data, ...args) => {
        console.log(`${this.modifier}${color.white}${bg.white}${timeStamp()}${data}`, args.reduce((t,e)=>t+e+' ', ''));
        process.stdout.write(color.reset);
    }
}

class InlineColors {

    constructor (modifier) {
        this.modifier = modifier;
    }

    log = (data, ...args) => {
        process.stdout.cursorTo(0);
        process.stdout.moveCursor(0, -1);
        process.stdout.clearLine();
        console.log(`${this.modifier}${timeStamp()}${data}`, args.reduce((t,e)=>t+e+' ', ''));
        process.stdout.write(color.reset);
    };

    black = (data, ...args) => {
        process.stdout.cursorTo(0);
        process.stdout.moveCursor(0, -1);
        process.stdout.clearLine();
        console.log(`${this.modifier}${color.black}${bg.black}${timeStamp()}${data}`, args.reduce((t,e)=>t+e+' ', ''));
        process.stdout.write(color.reset);
    };

    red = (data, ...args) => {
        process.stdout.cursorTo(0);
        process.stdout.moveCursor(0, -1);
        process.stdout.clearLine();
        console.log(`${this.modifier}${color.red}${bg.red}${timeStamp()}${data}`, args.reduce((t,e)=>t+e+' ', ''));
        process.stdout.write(color.reset);
    };

    green = (data, ...args) => {
        process.stdout.cursorTo(0);
        process.stdout.moveCursor(0, -1);
        process.stdout.clearLine();
        console.log(`${this.modifier}${color.green}${bg.green}${timeStamp()}${data}`, args.reduce((t,e)=>t+e+' ', ''));
        process.stdout.write(color.reset);
    };

    yellow = (data, ...args) => {
        process.stdout.cursorTo(0);
        process.stdout.moveCursor(0, -1);
        process.stdout.clearLine();
        console.log(`${this.modifier}${color.yellow}${bg.yellow}${timeStamp()}${data}`, args.reduce((t,e)=>t+e+' ', ''));
        process.stdout.write(color.reset);
    };

    blue = (data, ...args) => {
        process.stdout.cursorTo(0);
        process.stdout.moveCursor(0, -1);
        process.stdout.clearLine();
        console.log(`${this.modifier}${color.blue}${bg.blue}${timeStamp()}${data}`, args.reduce((t,e)=>t+e+' ', ''));
        process.stdout.write(color.reset);
    };

    magenta = (data, ...args) => {
        process.stdout.cursorTo(0);
        process.stdout.moveCursor(0, -1);
        process.stdout.clearLine();
        console.log(`${this.modifier}${color.magenta}${bg.magenta}${timeStamp()}${data}`, args.reduce((t,e)=>t+e+' ', ''));
        process.stdout.write(color.reset);
    };

    cyan = (data, ...args) => {
        process.stdout.cursorTo(0);
        process.stdout.moveCursor(0, -1);
        process.stdout.clearLine();
        console.log(`${this.modifier}${color.cyan}${bg.cyan}${timeStamp()}${data}`, args.reduce((t,e)=>t+e+' ', ''));
        process.stdout.write(color.reset);
    };

    white = (data, ...args) => {
        process.stdout.cursorTo(0);
        process.stdout.moveCursor(0, -1);
        process.stdout.clearLine();
        console.log(`${this.modifier}${color.white}${bg.white}${timeStamp()}${data}`, args.reduce((t,e)=>t+e+' ', ''));
        process.stdout.write(color.reset);
    }
}

module.exports = new class Print {

    constructor() {
        this._socket = null;
        this.msOnOff = -5;
        this.bright = new Colors(color.bright);
        this.dim = new Colors(color.dim);
        this.underscore = new Colors(color.underscore);
        this.reverse = new Colors(color.reverse);
        this.inline = {
            bright: new InlineColors(color.bright),
            dim: new InlineColors(color.dim),
            underscore: new InlineColors(color.underscore),
            reverse: new InlineColors(color.reverse),
            log: (data, ...args) => {
                process.stdout.cursorTo(0);
                process.stdout.moveCursor(0, -1);
                process.stdout.clearLine();
                console.log(timeStamp() + data, args.reduce((t,e)=>t+e+' ', ''));
                if (this._socket) this._socket.emit('console', timeStamp() + data);
            },

            black: (data, ...args) => {
                process.stdout.cursorTo(0);
                process.stdout.moveCursor(0, -1);
                process.stdout.clearLine();
                console.log(`${color.black}${bg.black}${timeStamp()}${data}`, args.reduce((t,e)=>t+e+' ', ''));
                process.stdout.write(color.reset);
            },
        
            red: (data, ...args) => {
                process.stdout.cursorTo(0);
                process.stdout.moveCursor(0, -1);
                process.stdout.clearLine();
                console.log(`${color.red}${bg.red}${timeStamp()}${data}`, args.reduce((t,e)=>t+e+' ', ''));
                process.stdout.write(color.reset);
            },
        
            green: (data, ...args) => {
                process.stdout.cursorTo(0);
                process.stdout.moveCursor(0, -1);
                process.stdout.clearLine();
                console.log(`${color.green}${bg.green}${timeStamp()}${data}`, args.reduce((t,e)=>t+e+' ', ''));
                process.stdout.write(color.reset);
            },
        
            yellow: (data, ...args) => {
                process.stdout.cursorTo(0);
                process.stdout.moveCursor(0, -1);
                process.stdout.clearLine();
                console.log(`${color.yellow}${bg.yellow}${timeStamp()}${data}`, args.reduce((t,e)=>t+e+' ', ''));
                process.stdout.write(color.reset);
            },
        
            blue: (data, ...args) => {
                process.stdout.cursorTo(0);
                process.stdout.moveCursor(0, -1);
                process.stdout.clearLine();
                console.log(`${color.blue}${bg.blue}${timeStamp()}${data}`, args.reduce((t,e)=>t+e+' ', ''));
                process.stdout.write(color.reset);
            },
        
            magenta: (data, ...args) => {
                process.stdout.cursorTo(0);
                process.stdout.moveCursor(0, -1);
                process.stdout.clearLine();
                console.log(`${color.magenta}${bg.magenta}${timeStamp()}${data}`, args.reduce((t,e)=>t+e+' ', ''));
                process.stdout.write(color.reset);
            },
        
            cyan: (data, ...args) => {
                process.stdout.cursorTo(0);
                process.stdout.moveCursor(0, -1);
                process.stdout.clearLine();
                console.log(`${color.cyan}${bg.cyan}${timeStamp()}${data}`, args.reduce((t,e)=>t+e+' ', ''));
                process.stdout.write(color.reset);
            },
        
            white: (data, ...args) => {
                process.stdout.cursorTo(0);
                process.stdout.moveCursor(0, -1);
                process.stdout.clearLine();
                console.log(`${color.white}${bg.white}${timeStamp()}${data}`, args.reduce((t,e)=>t+e+' ', ''));
                process.stdout.write(color.reset);
            }

        }
    }

    socket = (_socket) => {
        this._socket = _socket;
    }
    
    log = (data, ...args) => {
        console.log(timeStamp() + data, args.reduce((t,e)=>t+e+' ', ''));
        if (this._socket) this._socket.emit('console', timeStamp() + data);
    }
    
    goBacknLines = function (lines) {
        process.stdout.cursorTo(0);
        process.stdout.moveCursor(0, -lines);
        process.stdout.clearLine();
    }
    
    clearLine = function (lines = 0) {
        process.stdout.cursorTo(0);
        process.stdout.moveCursor(0, -lines);
        process.stdout.clearLine();
    }
    
    clear = function () {
        process.stdout.write(color.cls);
    }
    
    showMs = (showMs = true) => {
        if (showMs) {
            msOnOff = -1;
        } else {
           msOnOff = -5;
        }
    }

    black = (data, ...args) => {
        console.log(`${color.black}${bg.black}${timeStamp()}${data}`, args.reduce((t,e)=>t+e+' ', ''));
        process.stdout.write(color.reset);
    };

    red = (data, ...args) => {
        console.log(`${color.red}${bg.red}${timeStamp()}${data}`, args.reduce((t,e)=>t+e+' ', ''));
        process.stdout.write(color.reset);
    };

    green = (data, ...args) => {
        console.log(`${color.green}${bg.green}${timeStamp()}${data}`, args.reduce((t,e)=>t+e+' ', ''));
        process.stdout.write(color.reset);
    };

    yellow = (data, ...args) => {
        console.log(`${color.yellow}${bg.yellow}${timeStamp()}${data}`, args.reduce((t,e)=>t+e+' ', ''));
        process.stdout.write(color.reset);
    };

    blue = (data, ...args) => {
        console.log(`${color.blue}${bg.blue}${timeStamp()}${data}`, args.reduce((t,e)=>t+e+' ', ''));
        process.stdout.write(color.reset);
    };

    magenta = (data, ...args) => {
        console.log(`${color.magenta}${bg.magenta}${timeStamp()}${data}`, args.reduce((t,e)=>t+e+' ', ''));
        process.stdout.write(color.reset);
    };

    cyan = (data, ...args) => {
        console.log(`${color.cyan}${bg.cyan}${timeStamp()}${data}`, args.reduce((t,e)=>t+e+' ', ''));
        process.stdout.write(color.reset);
    };

    white = (data, ...args) => {
        console.log(`${color.white}${bg.white}${timeStamp()}${data}`, args.reduce((t,e)=>t+e+' ', ''));
        process.stdout.write(color.reset);
    }

    track = (err) => {
        this.red(errorLineReference(err));
    }

    setBg = {
        black: (newBG) => {
            bg.black = colors[newBG];
        },
        red: (newBG) => {
            bg.red = colors[newBG];
        },
        green: (newBG) => {
            bg.green = colors[newBG];
        },
        yellow: (newBG) => {
            bg.yellow = colors[newBG];
        },
        blue: (newBG) => {
            bg.blue = colors[newBG];
        },
        magenta: (newBG) => {
            bg.magenta = colors[newBG];
        },
        cyan: (newBG) => {
            bg.cyan = colors[newBG];
        },
        white: (newBG) => {
            bg.white = colors[newBG];
        }
    }

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
        }
    }

}

function timeStamp () {
    let time = new Date();
    time = (time.getHours() >= 10 ? time.getHours() : ('0' + time.getHours())) + ':' + (time.getMinutes() >= 10 ? time.getMinutes() : ('0' + time.getMinutes())) + ':' + (time.getSeconds() >= 10 ? time.getSeconds() : ('0' + time.getSeconds())) + '.' + (time.getMilliseconds() >= 10 ? (time.getMilliseconds() >= 100 ? time.getMilliseconds() : '0' + time.getMilliseconds()) : ('00' + time.getMilliseconds())) + ' ';
    return '[' + time.slice(0, msOnOff) + '] ';
}
// const time = () => {
//     let time = new Date();
//     time = (time.getHours() >= 10 ? time.getHours() : ('0' + time.getHours())) + ':' + (time.getMinutes() >= 10 ? time.getMinutes() : ('0' + time.getMinutes())) + ':' + (time.getSeconds() >= 10 ? time.getSeconds() : ('0' + time.getSeconds())) + '.' + (time.getMilliseconds() >= 10 ? (time.getMilliseconds() >= 100 ? time.getMilliseconds() : '0' + time.getMilliseconds()) : ('00' + time.getMilliseconds())) + ' ';
//     return time;
// }