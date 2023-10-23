import { Command } from "commander";
import { execCommand } from "local-api";
import path from "path";

interface Options {
	port: string;
	filename: string;
}

export const exec: Command = new Command()
	.command("exec [filename]")
	.description("Open a file for editing")
	.option("-p, --port <number>", "port to run server on", "4005")
	.action((filename = "notebook.js", options: Options) => {
		const dir = path.join(process.cwd(), path.dirname(filename));
		execCommand(parseInt(options.port), filename, dir);
	});
