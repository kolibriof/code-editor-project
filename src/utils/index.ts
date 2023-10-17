import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

let service: esbuild.Service;

export const bundle = async (code: string, id: string) => {
	if (!service) {
		service = await esbuild.startService({
			worker: true,
			wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
		});
	}
	try {
		const transformed = await service.build({
			entryPoints: ["index.js"],
			define: {
				"process.env.NODE_ENV": '"production"',
				global: "window",
			},
			bundle: true,
			write: false,
			plugins: [unpkgPathPlugin(), fetchPlugin(code)],
			jsxFactory: "_React.createElement",
			jsxFragment: "_React.Fragment",
		});

		return {
			cellID: id,
			code: transformed.outputFiles[0].text,
			error: "",
		};
	} catch (error) {
		if (error instanceof Error) {
			return {
				cellID: id,
				code: "",
				error: error.message,
			};
		} else {
			throw error;
		}
	}
};
