import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getApi, postApi } from '../../../utils/api/api';
import Toast from 'react-native-toast-message';




export type unitType = {
    id?: number,
    code?: string,
    name?: string,
    base_unit?: string,
    operator?: string,
    unit_value?: string,
    operation_value?: string,
}


export type uniteStateType = {
    units: unitType[] | [],
    isLoadingGet: boolean,
    errorMessageGet: string | null,
    isLoadingAdd: boolean,
    errorMessageAdd?: string | null,
    isLoadingEdit: boolean,
    errorMessageEdit?: string | null,
    isLoadingDlt: boolean,
    errorMessageDlt?: string | null,
}



const initialState: uniteStateType = {
    units: [],
    isLoadingGet: false,
    errorMessageGet: null,
    isLoadingAdd: false,
    errorMessageAdd: null,
    isLoadingEdit: false,
    errorMessageEdit: null,
    isLoadingDlt: false,
    errorMessageDlt: null,
}

//get action
export const getUnits = createAsyncThunk("unit/get", () => {
    return getApi('api_units');
});

//add action
export const addUnit = createAsyncThunk("unit/add", (body: unitType) => {
    const formData = new FormData();
    Object.entries(body).map(item => {
        formData.append(item[0], item[1]);
    });
    return postApi('api_addUnit', { formData });
});

//edit action
export const editUnit = createAsyncThunk("unit/edit", (body: unitType) => {
    const formData = new FormData();
    Object.entries(body).map(item => {
        formData.append(item[0], item[1]);
    });
    return postApi('api_editUnit/' + body.id, { formData });
});

//delete action
export const dltUnit = createAsyncThunk("unit/dlt", async (id: number) => {
    const data = await getApi('api_deleteUnit/' + id);
    data.id = id;
    return data;
});





const unitSlice = createSlice({
    name: 'unit',
    initialState,
    reducers: {},


    extraReducers: builder => {

        //------------------------Get-------------------
        //if loading
        builder.addCase(
            getUnits.pending,
            state => {
                state.isLoadingGet = true;
            })
        //if success
        builder.addCase(
            getUnits.fulfilled,
            (state, action) => {

                state.isLoadingGet = false

                if (action.payload?.status) {
                    state.units = action.payload?.data;
                    state.errorMessageGet = null
                }
                else
                    state.errorMessageGet =
                        action?.payload?.message
                        || 'Something went wrong';
            }
        )
        //if failed
        builder.addCase(
            getUnits.rejected,
            (state, action) => {
                Toast.show({
                    type: 'errorMsg',
                    text1: 'We are sorry :(',
                    text2: action.error.message
                })
                state.isLoadingGet = false;
                state.errorMessageGet = action.error.message || "something went wrong"
            }
        );


        //------------------------Add-------------------
        //if loading
        builder.addCase(
            addUnit.pending,
            state => {
                state.isLoadingAdd = true;
            })
        //if success
        builder.addCase(
            addUnit.fulfilled,
            (state, action) => {

                state.isLoadingAdd = false;
                if (action.payload?.status) {
                    const { data, id } = action.payload
                    state.units = [{ id, ...data }, ...state.units];
                    state.errorMessageAdd = null;
                    Toast.show({
                        type: 'successMsg',
                        text1: 'Success!',
                        text2: 'Unit added successfully 🎉'
                    })
                }
                else {
                    state.errorMessageAdd =
                        action?.payload?.message
                        || 'Something went wrong';

                    Toast.show({
                        type: 'errorMsg',
                        text1: 'We are sorry :(',
                        text2: action.payload.message || "Something went wrong"
                    });
                }
            }
        )
        //if failed
        builder.addCase(
            addUnit.rejected,
            (state, action) => {
                Toast.show({
                    type: 'errorMsg',
                    text1: 'We are sorry :(',
                    text2: action.error.message
                });
                console.error(action.error.message)
                state.isLoadingAdd = false;
                state.errorMessageAdd = action.error.message || "something went wrong"
            }
        );

        //------------------------Edit-------------------
        //if loading
        builder.addCase(
            editUnit.pending,
            state => {
                state.isLoadingEdit = true;
            })
        //if success
        builder.addCase(
            editUnit.fulfilled,
            (state, action) => {

                state.isLoadingEdit = false

                if (action.payload?.status) {
                    state.units = state.units.map(unit => {
                        if (unit.id == action.payload.id) {
                            return {
                                id: action?.payload?.id,
                                ...action?.payload?.data,
                            }
                        }
                        else
                            return unit;
                    });
                    state.errorMessageEdit = null;
                    Toast.show({
                        type: 'successMsg',
                        text1: 'Success!',
                        text2: 'Unit updated successfully 🎉'
                    })
                }
                else {
                    state.errorMessageEdit =
                        action?.payload?.message
                        || 'Something went wrong';

                    Toast.show({
                        type: 'errorMsg',
                        text1: 'We are sorry :(',
                        text2: action.payload.message || "Something went wrong"
                    });
                }
            }
        )
        //if failed
        builder.addCase(
            editUnit.rejected,
            (state, action) => {
                Toast.show({
                    type: 'errorMsg',
                    text1: 'We are sorry :(',
                    text2: action.error.message
                })
                state.isLoadingEdit = false;
                state.errorMessageEdit = action.error.message || "something went wrong"
            }
        );

        //------------------------Delete-------------------
        //if loading
        builder.addCase(
            dltUnit.pending,
            state => {
                state.isLoadingDlt = true;
            })
        //if success
        builder.addCase(
            dltUnit.fulfilled,
            (state, action) => {

                state.isLoadingDlt = false;

                if (action.payload?.status) {
                    state.units = state.units.filter(unit => unit.id != action.payload?.id);
                    state.errorMessageDlt = null;
                    Toast.show({
                        type: 'successMsg',
                        text1: 'Success!',
                        text2: 'Unit deleted successfully 🎉'
                    })
                }
                else {
                    state.errorMessageDlt =
                        action?.payload?.message
                        || 'Something went wrong';

                    Toast.show({
                        type: 'errorMsg',
                        text1: 'We are sorry :(',
                        text2: action.payload.message || "Something went wrong"
                    });
                }
            }
        )
        //if failed
        builder.addCase(
            dltUnit.rejected,
            (state, action) => {
                Toast.show({
                    type: 'errorMsg',
                    text1: 'We are sorry :(',
                    text2: action.error.message
                })
                state.isLoadingDlt = false;
                state.errorMessageDlt = action.error.message || "something went wrong"
            }
        );
    }

})

export default unitSlice.reducer;





