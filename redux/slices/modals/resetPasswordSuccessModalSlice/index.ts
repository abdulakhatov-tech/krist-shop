import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IInitialState {
	open: boolean;
}

const initialState: IInitialState = {
	open: false,
};

export const resetPasswordSlice = createSlice({
	name: "resetPassword",
	initialState,
	reducers: {
		setResetPasswordModalVisibility: (
			state,
			action: PayloadAction<boolean>,
		) => {
			state.open = action.payload;
		},
	},
});

export const { setResetPasswordModalVisibility } = resetPasswordSlice.actions;
export default resetPasswordSlice.reducer;
