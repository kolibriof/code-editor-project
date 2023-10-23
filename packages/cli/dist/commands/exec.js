"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exec = void 0;
const commander_1 = require("commander");
const local_api_1 = require("local-api");
const path_1 = __importDefault(require("path"));
exports.exec = new commander_1.Command()
    .command("exec [filename]")
    .description("Open a file for editing")
    .option("-p, --port <number>", "port to run server on", "4005")
    .action((filename = "notebook.js", options) => {
    const dir = path_1.default.join(process.cwd(), path_1.default.dirname(filename));
    (0, local_api_1.execCommand)(parseInt(options.port), filename, dir);
});
