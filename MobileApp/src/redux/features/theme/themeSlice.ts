import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type themeType = {
    theme: "dark" | "light" | "default"
}
const initialState: themeType = {
    theme: "light"
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        changeTheme: (state, action: PayloadAction<"dark" | "light" | "default">) => {
            state.theme = action.payload
        }
    }
})

export default themeSlice.reducer
export const { changeTheme } = themeSlice.actions