import { configureStore } from "@reduxjs/toolkit";
import couponCodeSlice from "./slices/coupon";
import { resetPasswordSuccessModalSlice } from "./slices/modals";

export const makeStore = () => {
	return configureStore({
		reducer: {
			resetPasswordSuccessModalSlice,
			couponCodeSlice,
		},
	});
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
