import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userType } from '../../../constants/types/sharedTypes';


type usersStateType = {
    users: userType[]
}
const initialState: usersStateType = {
    users: []
};


const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getUsersSuccess: (state, action: PayloadAction<userType[]>) => {
            state.users = action.payload;
        },
    }
})

export default usersSlice.reducer
export const {
    getUsersSuccess
} = usersSlice.actions