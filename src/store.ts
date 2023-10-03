import { configureStore } from "@reduxjs/toolkit";
import codeCellSlice from "./slices/codeCellSlice";
import textEditorSlice from "./slices/textEditorSlice";

export const store = configureStore({
    reducer: {
        codeCellSlice: codeCellSlice,
        textEditorSlice: textEditorSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch