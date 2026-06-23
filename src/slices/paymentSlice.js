import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    paymentLoading: false,
};

const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
        setPaymentLoading(state, action) {
            state.paymentLoading = action.payload;
        },
    },
});

export const { setPaymentLoading } = paymentSlice.actions;
export default paymentSlice.reducer;