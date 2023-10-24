import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";
import { createCellsRouter } from "./routes/cells";

export const execCommand = (
	port: number,
	filename: string,
	dir: string,
	useProxy: boolean,
) => {
	const app = express();
	const packagePath = require.resolve("code-editor/build/index.html");
	app.use(createCellsRouter(dir, filename));
	if (useProxy) {
		app.use(
			createProxyMiddleware({
				target: "http://127.0.0.1:3000/",
				ws: true,
				logLevel: "silent",
			}),
		);
	} else {
		app.use(express.static(path.dirname(packagePath)));
	}
	return new Promise<void>((resolve, reject) => {
		app.listen(port, resolve).on("error", reject);
	});
};
