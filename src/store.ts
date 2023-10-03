import { configureStore } from "@reduxjs/toolkit";
import codeCellSlice from "./state/codeCellSlice";
import textEditorSlice from "./state/textEditorSlice";
import cellsReducer, { insertCellBefore, moveCell } from "./state/cellsReducer";
import { useAppDispatch } from "./state/helpers/hooks";

export const store = configureStore({
    reducer: {
        codeCellSlice: codeCellSlice,
        textEditorSlice: textEditorSlice,
        cell: cellsReducer
    },
})




export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch