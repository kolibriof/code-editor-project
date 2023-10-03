import { createSlice } from "@reduxjs/toolkit"


interface StateType {
    isEditing: boolean;
    editValue: string;
}

const initialState: StateType = {
    isEditing: true,
    editValue: "Hi!"
}


const textEditorSlice = createSlice({
    name: "codeEditor",
    initialState,
    reducers: {
        setEditing: (state, action) => {
            state.isEditing = action.payload

        },
        setEditingValue: (state, action) => {
            state.editValue = action.payload
        }
    }
})

export default textEditorSlice.reducer
export const { setEditingValue, setEditing } = textEditorSlice.actions