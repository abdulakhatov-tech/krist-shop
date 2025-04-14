import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IInitialState {
	code: string;
	discount: number;
	total: number;
}

const initialState: IInitialState = {
	code: "",
	discount: Number(localStorage.getItem("coupon-discount")) || 0,
	total: 0,
};

const couponCodeSlice = createSlice({
	name: "couponCode",
	initialState,
	reducers: {
		setCoupon: (state, action: PayloadAction<IInitialState>) => {
			state.code = action.payload.code;
			state.discount = action.payload.discount;
			state.total = action.payload.total;
		},
		clearCoupon: (state) => {
			state.code = "";
			state.discount = 0;
			state.total = 0;
		},
	},
});

export const { setCoupon, clearCoupon } = couponCodeSlice.actions;
export default couponCodeSlice.reducer;
