import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { messageObjType } from '../../../constants/types/sharedTypes';


export type messageSliceType = {
    messages: messageObjType[],
    isGetting?: boolean,
    isSending?: boolean,
    isGettingMore?: boolean,

}



const initialState: messageSliceType = {
    messages: [],
    isGetting: false,
    isSending: false,
    isGettingMore: false,
}


const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        //get
        getMessages: (state, action: PayloadAction<messageObjType[]>) => {
            state.messages = action.payload;
        },

        //append many
        appendMessages: (state, action: PayloadAction<messageObjType[]>) => {
            state.messages = [...action.payload, ...state.messages];
        },
        //append one
        appendMessage: (state, action: PayloadAction<messageObjType>) => {
            state.messages = [action.payload, ...state.messages];
        },
        //update
        updateMessage: (state, action: PayloadAction<{ message: messageObjType, id: number | string }>) => {
            const { id, message } = action.payload;
            state.messages = state.messages.map((msg) => {
                if (msg.id == id)
                    return (message);
                else
                    return (msg);
            });
        },
        //update many
        updateMessages: (state, action: PayloadAction<messageObjType[]>) => {

            state.messages = state.messages.map(m => {

                const updatedMsg = action.payload.find(selectedMsg => selectedMsg.id == m.id);

                if (updatedMsg)
                    return updatedMsg;
                else
                    return m;
            })
        },
        //remove
        removeMessage: (state, action: PayloadAction<{ id: number | string }>) => {
            const { id } = action.payload;
            state.messages = state.messages.filter((msg) => msg.id != id);
        },
    }
})

export default chatSlice.reducer;

export const {
    getMessages, appendMessage, appendMessages, updateMessage, updateMessages, removeMessage
} = chatSlice.actions