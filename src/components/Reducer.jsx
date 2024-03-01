import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setLogin: (state) => {
            state.isLoggedIn = true;
        },
        setLogout: (state) => {
            state.isLoggedIn = false;
        },
    },
});

export const { setLogin, setLogout } = loginSlice.actions;

export default loginSlice.reducer;