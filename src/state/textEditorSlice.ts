import { createSlice } from "@reduxjs/toolkit"

interface StateType {
    isEditing: boolean;
}

const initialState: StateType = {
    isEditing: true,
}

const textEditorSlice = createSlice({
    name: "codeEditor",
    initialState,
    reducers: {
        setEditing: (state, action) => {
            state.isEditing = action.payload

        },
    }
})

export default textEditorSlice.reducer
export const { setEditing } = textEditorSlice.actions