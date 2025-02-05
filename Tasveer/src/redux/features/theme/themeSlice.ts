import { createSlice, PayloadAction } from '@reduxjs/toolkit'
type payloadType = {
    theme: "dark" | "light",
    isDefault?: boolean,
}
type themeType = {
    theme: "dark" | "light",
    isDefault: boolean,
}
const initialState: themeType = {
    theme: "light",
    isDefault: true,
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        changeTheme: (state, action: PayloadAction<payloadType>) => {

            state.theme = state.theme = action.payload.theme;
            if (typeof action.payload.isDefault == "boolean")
                state.isDefault = action.payload.isDefault;

        }
    }
})

export default themeSlice.reducer
export const { changeTheme } = themeSlice.actions