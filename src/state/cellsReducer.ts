import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Cell } from "./helpers/cell";
import {
	UpdateCellAction,
	DeleteCellAction,
	InsertCellAfterAction,
	MoveCellAction,
} from "./helpers/actions";
import axios from "axios";
import { store } from "../store";

interface CellsState {
	loading: boolean;
	error: string | null;
	order: string[];
	data: {
		[key: string]: Cell;
	};
}
const initialState: CellsState = {
	loading: false,
	error: null,
	order: [],
	data: {},
};

const randomId = () => {
	return Math.random().toString(36).substring(2, 5);
};

export const fetchCells = createAsyncThunk("cells/fetchcells", async () => {
	try {
		const { data }: { data: Cell[] } = await axios.get("/cells");
		return data;
	} catch (error) {
		throw new Error("Can't fetch data for some reason");
	}
});
export const saveCells = createAsyncThunk("cells/savecells", async () => {
	const {
		cell: { data, order },
	} = store.getState();
	const cells = order.map((id) => data[id]);
	try {
		await axios.post("/cells", { cells });
	} catch (error) {
		throw new Error("Can't post cells for some reason");
	}
});

const cellsReducer = createSlice({
	name: "cells",
	initialState,
	reducers: {
		updateCell: (state, action: UpdateCellAction) => {
			const { id, content } = action.payload;
			state.data[id].content = content;
		},
		deleteCell: (state, action: DeleteCellAction) => {
			delete state.data[action.payload];
			state.order = state.order.filter((e) => e !== action.payload);
		},
		moveCell: (state, action: MoveCellAction) => {
			const { id, direction } = action.payload;
			const currentIndex = state.order.findIndex((e) => e === id);
			const targetIndex =
				direction === "up" ? currentIndex - 1 : currentIndex + 1;
			if (targetIndex < 0 || targetIndex === state.order.length) {
				return;
			}
			state.order[currentIndex] = state.order[targetIndex];
			state.order[targetIndex] = action.payload.id;
		},
		insertCellAfter: (state, action: InsertCellAfterAction) => {
			const cell: Cell = {
				id: randomId(),
				content: "",
				type: action.payload.type,
			};
			state.data[cell.id] = cell;
			const foundIndex = state.order.findIndex(
				(id) => id === action.payload?.id,
			);
			if (foundIndex < 0) {
				state.order.unshift(cell.id);
			} else {
				state.order.splice(foundIndex + 1, 0, cell.id);
			}
		},
		setIsEditing: (state, action) => {
			const { id, isEditing } = action.payload;
			state.data[id].editing = isEditing;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchCells.pending, (state, _) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchCells.fulfilled, (state, action) => {
				state.order = action.payload.map((cell) => cell.id);
				state.data = action.payload.reduce((acc, cell) => {
					acc[cell.id] = cell;
					return acc;
				}, {} as CellsState["data"]);
			})
			.addCase(fetchCells.rejected, (state, action) => {
				state.loading = false;
				state.error = JSON.stringify(action.payload);
			})
			.addCase(saveCells.rejected, (state, _) => {
				state.error = "Something went wrong";
			});
	},
});

export default cellsReducer.reducer;

export const {
	updateCell,
	deleteCell,
	moveCell,
	insertCellAfter,
	setIsEditing,
} = cellsReducer.actions;
