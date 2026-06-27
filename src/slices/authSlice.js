import {createSlice} from "@reduxjs/toolkit"

const tokenFromStorage = sessionStorage.getItem("token");
let initialToken = null;
if (tokenFromStorage) {
    try {
        initialToken = JSON.parse(tokenFromStorage);
    } catch (e) {
        initialToken = tokenFromStorage;
    }
}

const initialState = {
    signupData: null,
    loading: false,
    token: initialToken
};


const authSlice = createSlice({
    name:"auth",
    initialState: initialState,
    reducers:{
        setToken(state,value){
            state.token = value.payload
        },
        setLoading(state,value){
            state.loading = value.payload
        },
        setSignupData(state,value){
            state.signupData = value.payload
        }
    },
})


export const {setToken, setLoading, setSignupData} = authSlice.actions;
export default authSlice.reducer;