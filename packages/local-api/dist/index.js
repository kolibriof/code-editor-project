"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execCommand = void 0;
const execCommand = (port, filename, dir) => {
    console.log(`executing traffic on ${port}`);
    console.log(`file ${filename}`);
    console.log(`directory ${dir}`);
};
exports.execCommand = execCommand;
