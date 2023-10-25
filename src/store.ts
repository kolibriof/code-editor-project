import { configureStore } from "@reduxjs/toolkit";
import codeCellSlice from "./state/codeCellSlice";
import textEditorSlice from "./state/textEditorSlice";
import cellsReducer from "./state/cellsReducer";
import bundleReducer from "./state/bundlesReducer";
import { persistMiddleware } from "./state/middlewares/persist-middleware";

export const store = configureStore({
	reducer: {
		codeCellSlice: codeCellSlice,
		textEditorSlice: textEditorSlice,
		cell: cellsReducer,
		bundle: bundleReducer,
	},
	middleware(getDefaultMiddleware) {
		return getDefaultMiddleware().concat(persistMiddleware);
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
