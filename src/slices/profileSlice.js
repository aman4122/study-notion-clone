import {createSlice} from "@reduxjs/toolkit"

const userFromStorage = localStorage.getItem("user");
let initialUser = null;
if (userFromStorage) {
    try {
        initialUser = JSON.parse(userFromStorage);
    } catch (e) {
        initialUser = null;
    }
}

const initialState = {
    user: initialUser,
    loading: false,
    sidebarOpen: true,
};


const profileSlice = createSlice({
    name:"profile",
    initialState: initialState,
    reducers:{
        setUser(state,value){
            state.user = value.payload
        },
        setLoading(state,value){
            state.loading = value.payload
        },
        toggleSidebar(state){
            state.sidebarOpen = !state.sidebarOpen
        }
    },
})


export const {setUser, setLoading, toggleSidebar} = profileSlice.actions;
export default profileSlice.reducer;