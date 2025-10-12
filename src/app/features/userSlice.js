import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null
}

const userSlice = createSlice({    
    name: "user",
    initialState,
    reducers:{

        // login:(state, {payload})=>{

        // },

        // logout:(state, {payload})=>{

        // }
        
    }
})

export const {login, logout} = userSlice.actions
export default userSlice.reducer