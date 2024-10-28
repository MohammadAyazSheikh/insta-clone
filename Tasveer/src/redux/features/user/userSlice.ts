import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userType } from '../../../constants/types/sharedTypes';


export type userState = {
    user: userType | null,
    token?: string,
    isLoading: boolean,
    isLoadingSignup: boolean,
    errorMessage: string | null,
    updateUserLoading: boolean,
    errorUpdateUser: string | null,
    logoutLoading?: boolean,
    logoutError?: string | null,
}



const initialState: userState = {
    user: null,
    isLoading: false,
    isLoadingSignup: false,
    errorMessage: null,
    updateUserLoading: false,
    errorUpdateUser: null,
    logoutLoading: false,
    logoutError: null
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        //login
        authSuccess: (state, action: PayloadAction<userType>) => {
            state.user = action.payload;
            state.isLoading = false;
            state.isLoadingSignup = false;
            state.errorMessage = null;
            state.updateUserLoading = false;
            state.errorUpdateUser = null;
            state.logoutLoading = false;
            state.logoutError = null
        },
        authError: (state, action: PayloadAction<string | null>) => {
            state.user = null;
            state.isLoading = false;
            state.isLoadingSignup = false;
            state.errorMessage = action.payload;
            state.updateUserLoading = false;
            state.errorUpdateUser = null;
            state.logoutLoading = false;
            state.logoutError = null
        },
        authLoading: state => {
            state.user = null;
            state.isLoading = true;
            state.isLoadingSignup = false
            state.errorMessage = null;
            state.updateUserLoading = false;
            state.errorUpdateUser = null;
        },
        authLoadingSignUp: state => {
            state.user = null;
            state.isLoading = false;
            state.isLoadingSignup = true
            state.errorMessage = null;
            state.updateUserLoading = false;
            state.errorUpdateUser = null;
            state.logoutLoading = false;
            state.logoutError = null
        },
        //update user
        updateUserSuccess: (state, action: PayloadAction<userType | null>) => {

            state.user = action.payload;
            state.isLoading = false;
            state.isLoadingSignup = false;
            state.errorMessage = null;
            state.updateUserLoading = false;
            state.errorUpdateUser = null;
            state.logoutLoading = false;
            state.logoutError = null
        },
        updateUserError: (state, action: PayloadAction<string | null>) => {
            state.isLoading = false;
            state.isLoadingSignup = false;
            state.errorMessage = null;
            state.updateUserLoading = false;
            state.errorUpdateUser = action.payload;
            state.logoutLoading = false;
            state.logoutError = null
        },
        updateUserLoading: (state) => {
            state.isLoading = false;
            state.isLoadingSignup = false;
            state.errorMessage = null;
            state.updateUserLoading = true;
            state.errorUpdateUser = null;
            state.logoutLoading = false;
            state.logoutError = null
        },
        logoutLoading: (state) => {
            state.isLoading = false;
            state.isLoadingSignup = false;
            state.errorMessage = null;
            state.updateUserLoading = false;
            state.errorUpdateUser = null;
            state.logoutLoading = true;
            state.logoutError = null;
            state.logoutLoading = false;
            state.logoutError = null
        },
        logoutError: (state, action: PayloadAction<string | null>) => {
            state.isLoading = false;
            state.isLoadingSignup = false;
            state.errorMessage = null;
            state.updateUserLoading = false;
            state.errorUpdateUser = null;
            state.logoutLoading = false;
            state.logoutError = action.payload
        },
        logoutSuccess: (state) => {
            //commenting this because we are clearing the whole store in store.ts
            //when this action is dispatched 
        },
    }
})

export default userSlice.reducer
export const {
    logoutSuccess,
    authSuccess,
} = userSlice.actions