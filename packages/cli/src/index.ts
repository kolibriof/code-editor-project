import { program } from "commander";
import { exec } from "./commands/exec";

program.addCommand(exec);

program.parse(process.argv);
