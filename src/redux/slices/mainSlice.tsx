import { createSlice } from '@reduxjs/toolkit';

const initialState = {
token:""
};

export const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
 
        set_token: (state, action) => {
            state.token = action.payload
        },
        set_logout: (state, action) => {
            return state = initialState
        }
    },
})

export const { set_token, set_logout } = mainSlice.actions

export default mainSlice.reducer;