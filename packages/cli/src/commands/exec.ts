import { Command } from "commander";

export const exec: Command = new Command()
	.command("exec [filename]")
	.description("Open a file for editing")
	.option("-p, --port <number>", "port to run server on", "4005")
	.action((filename = "notebook.js", options) => {
		console.log(filename, options);
	});
