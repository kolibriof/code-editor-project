"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const exec_1 = require("./commands/exec");
commander_1.program.addCommand(exec_1.exec);
commander_1.program.parse(process.argv);
