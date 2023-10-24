import express from "express";
import fs from "fs/promises";
import path from "path";

interface Cell {
	id: string;
	content: string;
	type: "text" | "code";
}
interface LocalApiError {
	code: string;
}

export const createCellsRouter = (dir: string, filename: string) => {
	const router = express.Router();
	router.use(express.json());
	const fullPath = path.join(dir, filename);

	router.get("/cells", async (_, response) => {
		const isLocalApiError = (error: any): error is LocalApiError => {
			return typeof error.code === "string";
		};
		try {
			const result = await fs.readFile(fullPath, { encoding: "utf-8" });
			response.send(JSON.parse(result));
		} catch (error) {
			if (isLocalApiError(error)) {
				if (error.code === "ENOENT") {
					await fs.writeFile(fullPath, "[  ]", "utf-8");
					response.send([]);
				} else {
					throw error;
				}
			} else {
				throw error;
			}
		}
	});
	router.post("/cells", async (request, response) => {
		const { cells }: { cells: Cell[] } = request.body;

		await fs.writeFile(fullPath, JSON.stringify(cells), "utf-8");
		response.send({ status: "GOOD" });
	});
	return router;
};
