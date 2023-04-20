import { configureStore } from '@reduxjs/toolkit';
import { userDataSlice } from './userDataSlice';

//config the store
const store = configureStore({
    reducer: {
        userData: userDataSlice.reducer,
        currentUser: userDataSlice.reducer,
    }
})

export default store;
