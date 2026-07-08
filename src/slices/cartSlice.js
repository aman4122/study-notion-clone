import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

let email = "";
const userFromStorage = sessionStorage.getItem("user");
if (userFromStorage) {
    try { email = JSON.parse(userFromStorage)?.email || ""; } catch (e) {}
}
const cartKey = email ? `cart_${email}` : "cart";
const totalItemsKey = email ? `totalItems_${email}` : "totalItems";

const initialState = {
    totalItems: localStorage.getItem(totalItemsKey) ? JSON.parse(localStorage.getItem(totalItemsKey)): 0,
    cart: localStorage.getItem(cartKey) ? JSON.parse(localStorage.getItem(cartKey)) : [],
    currentUserEmail: email
};


const cartSlice = createSlice({
    name:"auth",
    initialState: initialState,
    reducers:{
        setTotalItems(state,value){
            state.token = value.payload
        },
        syncCartWithUser(state, action) {
            const email = action.payload;
            state.currentUserEmail = email;
            const newCartKey = email ? `cart_${email}` : "cart";
            const newTotalItemsKey = email ? `totalItems_${email}` : "totalItems";
            state.cart = localStorage.getItem(newCartKey) ? JSON.parse(localStorage.getItem(newCartKey)) : [];
            state.totalItems = localStorage.getItem(newTotalItemsKey) ? JSON.parse(localStorage.getItem(newTotalItemsKey)) : 0;
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
            const key = state.currentUserEmail ? `cart_${state.currentUserEmail}` : "cart";
            const totalKey = state.currentUserEmail ? `totalItems_${state.currentUserEmail}` : "totalItems";
            localStorage.setItem(key, JSON.stringify(state.cart));
            localStorage.setItem(totalKey, JSON.stringify(state.totalItems));
            toast.success("Course added to cart");
        },
        //remove cart
        removeFromCart(state, action) {
            const courseId = action.payload;
            state.cart = state.cart.filter((item) => item._id !== courseId);
            state.totalItems--;
            const key = state.currentUserEmail ? `cart_${state.currentUserEmail}` : "cart";
            const totalKey = state.currentUserEmail ? `totalItems_${state.currentUserEmail}` : "totalItems";
            localStorage.setItem(key, JSON.stringify(state.cart));
            localStorage.setItem(totalKey, JSON.stringify(state.totalItems));
            toast.success("Course removed from cart");
        },
        //reset cart
        resetCart(state) {
            state.cart = [];
            state.totalItems = 0;
            state.currentUserEmail = "";
            // Intentionally avoiding localStorage.removeItem so the cart persists for their next login!
        },
    },

})


export const {setTotalItems, addToCart, removeFromCart, resetCart, syncCartWithUser} = cartSlice.actions;
export default cartSlice.reducer;