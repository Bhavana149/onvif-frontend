import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './Reducer'

export default configureStore({
    reducer: {
        login: loginReducer,
    },
});