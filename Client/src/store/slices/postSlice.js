import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name:"post",
    initialState:{
        posts:null,
        refresh:false
    },
    reducers:{
        getAllPosts:(state, action)=>{
            state.posts= action.payload
        },
        setRefresh:(state)=>{
            state.refresh = !state.refresh
        }
    }
})

export const {getAllPosts, setRefresh} = postSlice.actions;
export default postSlice.reducer