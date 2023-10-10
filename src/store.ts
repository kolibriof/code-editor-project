import { configureStore } from "@reduxjs/toolkit";
import codeCellSlice from "./state/codeCellSlice";
import textEditorSlice from "./state/textEditorSlice";
import cellsReducer, { insertCellBefore } from "./state/cellsReducer";

export const store = configureStore({
    reducer: {
        codeCellSlice: codeCellSlice,
        textEditorSlice: textEditorSlice,
        cell: cellsReducer
    },
})

store.dispatch(insertCellBefore({ id: null, type: "code" }))
store.dispatch(insertCellBefore({ id: null, type: "text" }))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch