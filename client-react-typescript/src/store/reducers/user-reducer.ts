import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/user-types"; 


interface UserState {
    user: User;
}
const userInitState:UserState = {
   user:{
     username:'',
     email:"",
     password:'',
     avatar:'',
     linkedinUrl:''
   }
}


const UserSlice = createSlice({
    name: 'user',
    initialState:userInitState,
    reducers:{
        setUser: (state, action:PayloadAction<User>)=>{
            state.user = action.payload;
        },

        logout: (state)=>{
             state.user = {
                username:'',
                email:'',
                password:'',
                avatar:'',
                linkedinUrl:''
             }
        }
    }
})

export const {setUser, logout} = UserSlice.actions;
export default UserSlice.reducer;