import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")): 0,
    cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
};


const cartSlice = createSlice({
    name:"auth",
    initialState: initialState,
    reducers:{
        setTotalItems(state,value){
            state.token = value.payload
        },
        //add cart
        addToCart(state, action) {
            const course = action.payload;
            const isPresent = state.cart.find((item) => item._id === course._id);
            if (isPresent) {
                toast.error("Course already in cart");
                return;
            }
            state.cart.push(course);
            state.totalItems++;
            localStorage.setItem("cart", JSON.stringify(state.cart));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
            toast.success("Course added to cart");
        },
        //remove cart
        removeFromCart(state, action) {
            const courseId = action.payload;
            state.cart = state.cart.filter((item) => item._id !== courseId);
            state.totalItems--;
            localStorage.setItem("cart", JSON.stringify(state.cart));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
            toast.success("Course removed from cart");
        },
        //reset cart
        resetCart(state) {
            state.cart = [];
            state.totalItems = 0;
            localStorage.removeItem("cart");
            localStorage.removeItem("totalItems");
        },
    },

})


export const {setTotalItems, addToCart, removeFromCart, resetCart} = cartSlice.actions;
export default cartSlice.reducer;