import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DynamicFormType } from '../../../screens/dynamicForm/dynamicForm'

type dynamicFormSliceType = {
    data: DynamicFormType[]
}
const initialState: dynamicFormSliceType = {
    data: [],
}

const dynamicFormSlice = createSlice({
    name: 'dynamicForm',
    initialState,
    reducers: {
        addData: (state, action: PayloadAction<DynamicFormType>) => {
            state.data = [action.payload, ...state.data,]
        }
    }
})

export default dynamicFormSlice.reducer
export const { addData } = dynamicFormSlice.actions