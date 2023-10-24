import { Command } from "commander";
import { execCommand } from "local-api";
import path from "path";

interface Options {
	port: string;
	filename: string;
}
interface LocalApiError {
	code: string;
}

export const exec: Command = new Command()
	.command("exec [filename]")
	.description("Open a file for editing")
	.option("-p, --port <number>", "port to run server on", "4005")
	.action(async (filename = "notebook.js", options: Options) => {
		const isLocalApiError = (err: any): err is LocalApiError => {
			return typeof err.code === "string";
		};
		try {
			const dir = path.join(process.cwd(), path.dirname(filename));
			await execCommand(parseInt(options.port), filename, dir);
			console.log(
				`Opened ${filename}. Navigate to http://localhost:${options.port} to edit the file.`,
			);
		} catch (error) {
			if (isLocalApiError(error)) {
				if ((error.code = "EADDRINUSE")) {
					console.log(
						"This port is currently in use. Try running on a different port",
					);
				} else if (error instanceof Error) {
					console.log("Command rejected with an error --->", error.message);
				}
			}
			process.exit(1);
		}
	});
