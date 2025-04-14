import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IInitialState {
	code: string;
	discount: number;
	total: number;
	shippingType: "pickup" | "courier" | "postal";
}

const initialState: IInitialState = {
	code: "",
	discount: 0,
	total: 0,
	shippingType: "pickup",
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
		setShipping: (
			state,
			action: PayloadAction<"pickup" | "courier" | "postal">,
		) => {
			state.shippingType = action.payload;
		},
	},
});

export const { setCoupon, clearCoupon, setShipping } = couponCodeSlice.actions;
export default couponCodeSlice.reducer;
