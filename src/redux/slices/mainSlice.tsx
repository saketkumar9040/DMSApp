import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: null,
    user_id: null,
    user_name: null,
    roles: null,
};

export const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        set_token: (state, action) => {
            state.token = action.payload
        },
        set_user_data: (state, action) => {
            Object.assign(state, action.payload)
        },
        set_logout: (state, action) => {
            return state = initialState
        }
    },
})

export const { set_token, set_user_data, set_logout } = mainSlice.actions

export default mainSlice.reducer;