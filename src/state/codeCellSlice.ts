import { createSlice } from "@reduxjs/toolkit"


interface StateType {
    input: string;
    error: string;
    code: string;
}

const initialState: StateType = {
    input: '',
    error: '',
    code: ''
}


const codeCellSlice = createSlice({
    name: "codeEditor",
    initialState,
    reducers: {
        setInput: (state, action) => {
            if (action.payload) {
                state.input = action.payload
            }
        },
        setError: (state, action) => {
            if (action.payload) {
                state.error = action.payload
            }

        },
        setCode: (state, action) => {
            if (action.payload) {
                state.code = action.payload
            }

        }
    }
})

export default codeCellSlice.reducer
export const { setCode, setError, setInput } = codeCellSlice.actions