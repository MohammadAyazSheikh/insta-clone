import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getApi, postApi } from '../../../utils/api/api';
import Toast from 'react-native-toast-message';
import { postType } from '../../../constants/types/sharedTypes';






export type postStateType = {
    posts: postType[] | [],
    isLoadingGet: boolean,
    errorMessageGet: string | null,
    isLoadingAdd: boolean,
    errorMessageAdd?: string | null,
    isLoadingEdit: boolean,
    errorMessageEdit?: string | null,
    isLoadingDlt: boolean,
    errorMessageDlt?: string | null,
}



const initialState: postStateType = {
    posts: [],
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
export const getPosts = createAsyncThunk("post/get", () => {
    return getApi('https://jsonplaceholder.typicode.com/posts');
});

//add action
export const addPost = createAsyncThunk("post/add", (body: postType) => {

    return postApi('https://jsonplaceholder.typicode.com/posts', {
        body: {
            userId: 1,
            ...body
        }
    });
});

//edit action
export const editPost = createAsyncThunk("post/edit", (body: postType) => {
    const formData = new FormData();
    Object.entries(body).map(item => {
        formData.append(item[0], item[1]);
    });
    return postApi('api_editPost/' + body.id, { formData });
});

//delete action
export const dltPost = createAsyncThunk("post/dlt", async (id: number) => {
    const data = await getApi('api_deletePost/' + id);
    data.id = id;
    return data;
});





const postslice = createSlice({
    name: 'post',
    initialState,
    reducers: {},


    extraReducers: builder => {

        //------------------------Get-------------------
        //if loading
        builder.addCase(
            getPosts.pending,
            state => {
                state.isLoadingGet = true;
            })
        //if success
        builder.addCase(
            getPosts.fulfilled,
            (state, action) => {

                state.isLoadingGet = false
                if (action.payload?.length) {
                    state.posts = action.payload;
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
            getPosts.rejected,
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
            addPost.pending,
            state => {
                state.isLoadingAdd = true;
            })
        //if success
        builder.addCase(
            addPost.fulfilled,
            (state, action) => {

                state.isLoadingAdd = false;
                state.posts = [action.payload, ...state.posts];
                state.errorMessageAdd = null;
                Toast.show({
                    type: 'successMsg',
                    text1: 'Success!',
                    text2: 'Post added successfully 🎉'
                })


            }
        )
        //if failed
        builder.addCase(
            addPost.rejected,
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
            editPost.pending,
            state => {
                state.isLoadingEdit = true;
            })
        //if success
        builder.addCase(
            editPost.fulfilled,
            (state, action) => {

                state.isLoadingEdit = false

                if (action.payload?.status) {
                    state.posts = state.posts.map(Post => {
                        if (Post.id == action.payload.id) {
                            return {
                                id: action?.payload?.id,
                                ...action?.payload?.data,
                            }
                        }
                        else
                            return Post;
                    });
                    state.errorMessageEdit = null;
                    Toast.show({
                        type: 'successMsg',
                        text1: 'Success!',
                        text2: 'Post updated successfully 🎉'
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
            editPost.rejected,
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
            dltPost.pending,
            state => {
                state.isLoadingDlt = true;
            })
        //if success
        builder.addCase(
            dltPost.fulfilled,
            (state, action) => {

                state.isLoadingDlt = false;

                if (action.payload?.status) {
                    state.posts = state.posts.filter(Post => Post.id != action.payload?.id);
                    state.errorMessageDlt = null;
                    Toast.show({
                        type: 'successMsg',
                        text1: 'Success!',
                        text2: 'Post deleted successfully 🎉'
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
            dltPost.rejected,
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

export default postslice.reducer;





