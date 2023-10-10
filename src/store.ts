import { configureStore } from "@reduxjs/toolkit";
import codeCellSlice from "./state/codeCellSlice";
import textEditorSlice from "./state/textEditorSlice";
import cellsReducer, { insertCellAfter } from "./state/cellsReducer";

export const store = configureStore({
	reducer: {
		codeCellSlice: codeCellSlice,
		textEditorSlice: textEditorSlice,
		cell: cellsReducer,
	},
});

store.dispatch(insertCellAfter({ id: null, type: "code" }));
store.dispatch(insertCellAfter({ id: null, type: "text" }));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
