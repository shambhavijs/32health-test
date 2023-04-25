import { createSlice } from '@reduxjs/toolkit';

export const userDataSlice = createSlice({
    name: "userData",
    initialState: {
        userData: [],
        currentUser: null,
    },
    reducers: {
        //initially set state with user data from api
        setUserData: (state, action) => {
            state.userData = action.payload;
            let newProperty = { liked: false }
            state.userData = state.userData.map(user => {return {...user, ...newProperty }});
        },
        //update current user in state when modal is opened
        updateCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        }, 
        //delete user from array
        deleteUserData: (state, action) => {
            state.userData = state.userData.filter((user) => {
                return user.id !== action.payload.id
            });
        },
        //update user data after modal is closed
        updateUserData: (state, action) => {
            const id = action.payload[1];
            const userIndex = state.userData.findIndex(user => user.id === id);
            const currentUserData = state.userData[userIndex];
            state.userData[userIndex] = {...currentUserData, ...action.payload[0]};
        },
        //like or unlike user
        setLikedUser: (state, action) => {
            const id = action.payload;
            const userIndex = state.userData.findIndex(user => user.id === id);
            let value = state.userData[userIndex].liked;
            state.userData[userIndex].liked = !value;
        }
     }
})

export const { setUserData, updateCurrentUser, deleteUserData, updateUserData, setLikedUser } = userDataSlice.actions;
export default userDataSlice.reducer;