import { CellDirection, CellTypes } from "./cell";


export interface MoveCellAction {
    payload: {
        id: string;
        direction: CellDirection;
    }
}
export interface DeleteCellAction {
    payload: string;
}
export interface InsertCellBeforeAction {
    payload: {
        id: string | null;
        type: CellTypes;
    }
}
export interface UpdateCellAction {
    payload: {
        id: string;
        content: string;
    }
}
