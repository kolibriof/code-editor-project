import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BundleCompleteAction, BundleStartAction } from "./helpers/actions";

interface BundlesState {
	[key: string]: {
		loading: boolean;
		code: string;
		error: string;
	};
}

const initialState: BundlesState = {};

export const bundleCode = createAsyncThunk(
	"bundle/bundleCode",
	async (id) => {},
);

const bundleReducer = createSlice({
	name: "bundle",
	initialState,
	reducers: {},
	extraReducers(builder) {
		///@ts-ignore
		builder
			.addCase(bundleCode.pending, (state, action: BundleStartAction) => {
				state[action.payload.cellID] = {
					loading: true,
					code: "",
					error: "",
				};
			})
			.addCase(bundleCode.fulfilled, (state, action: BundleCompleteAction) => {
				state[action.payload.cellID] = {
					loading: false,
					code: action.payload.bundle.code,
					error: "",
				};
			})
			.addCase(bundleCode.rejected, (state, action: BundleStartAction) => {
				state[action.payload.cellID] = {
					loading: false,
					code: "",
					error: "There was some error!",
				};
			});
	},
});

export default bundleReducer.reducer;