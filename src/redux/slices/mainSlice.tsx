import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: null,
    user_id: null,
    user_name: null,
    roles: null,
    tags: null
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
        },
        set_tags: (state, action) => {
            state.tags = action.payload
        }
    },
})

export const { set_token, set_user_data, set_logout, set_tags } = mainSlice.actions

export default mainSlice.reducer;