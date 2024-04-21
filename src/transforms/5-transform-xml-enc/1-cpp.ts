import { swapKeyValPairs } from "./4-swap-key-val-pairs";

const forwardCpp = {
    "^up;": "^",
    "^at;": "@",
    "^dot;": ".",
    "^2dot;": ":",
    "^escape;": '\x1b',
    "%0d": "\r",
    "%0a": "\n",
};

const reverseCpp = swapKeyValPairs(forwardCpp);

const reForwardCpp = /(\^up;|\^at;|\^dot;|\^2dot;|\^escape;|%0d|%0a)/g; // regex.lastIndex specifies the index at which to start the next match, not for replace all.
const reReverseCpp = /[\^@\.:\x1b\r\n]/g;

export function cppRestore(s: string): string { // C:\Y\c\dp\pm\Components\Include\atl\atl_strings.h::cpp_restore()
    return s ? s.replace(reForwardCpp, (m) => forwardCpp[m as keyof typeof forwardCpp]) : '';
}

export function cppEscape(s: string): string {
    return s ? s.replace(reReverseCpp, (m) => reverseCpp[m]) : '';
}

export function colonEscape(s: string): string { // this is used for matching url options
    return s ? s.replace(/:/g, '^2dot;') : '';
}
