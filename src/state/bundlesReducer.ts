import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BundleCompleteAction, BundleStartAction } from "./helpers/actions";
import { bundle } from "../utils/index";

interface BundlesState {
	[key: string]: {
		loading: boolean;
		code: string;
		error: string;
	};
}

interface BundleCodeProp {
	cellID: string;
	input: string;
}

const initialState: BundlesState = {};

export const bundleCode = createAsyncThunk(
	"bundle/bundleCode",
	async (prop: BundleCodeProp) => {
		const result = await bundle(prop.input, prop.cellID);
		return result;
	},
);

const bundleReducer = createSlice({
	name: "bundle",
	initialState,
	reducers: {},
	extraReducers(builder) {
		///@ts-ignore
		builder
			.addCase(bundleCode.pending, (state, action: BundleStartAction) => {
				if (action.payload) {
					state[action.payload.cellID] = {
						loading: true,
						code: "",
						error: "",
					};
				}
			})
			.addCase(bundleCode.fulfilled, (state, action: BundleCompleteAction) => {
				if (action.payload) {
					state[action.payload.cellID] = {
						loading: false,
						code: action.payload.code,
						error: action.payload.error,
					};
				}
			})
			.addCase(bundleCode.rejected, (state, action: BundleCompleteAction) => {
				if (action.payload) {
					state[action.payload.cellID] = {
						loading: false,
						code: "",
						error: action.payload.error,
					};
				}
			});
	},
});

export default bundleReducer.reducer;
