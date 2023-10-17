import { CellDirection, CellTypes } from "./cell";

export interface MoveCellAction {
	payload: {
		id: string;
		direction: CellDirection;
	};
}
export interface DeleteCellAction {
	payload: string;
}
export interface InsertCellAfterAction {
	payload: {
		id: string | null;
		type: CellTypes;
	};
}
export interface UpdateCellAction {
	payload: {
		id: string;
		content: string;
	};
}

export interface BundleStartAction {
	payload: {
		cellID: string;
	};
}

export interface BundleCompleteAction {
	payload: {
		cellID: string;

		code: string;
		error: string;
	};
}
