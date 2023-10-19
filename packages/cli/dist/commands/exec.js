"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exec = void 0;
const commander_1 = require("commander");
exports.exec = new commander_1.Command()
    .command("exec [filename]")
    .description("Open a file for editing")
    .option("-p, --port <number>", "port to run server on", "4005")
    .action((filename = "notebook.js", options) => {
    console.log(filename, options);
});
