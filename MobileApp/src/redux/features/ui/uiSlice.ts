import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { messageObjType, reactionType } from '../../../constants/types/sharedTypes'

type stateType = {
    selectedReaction?: reactionType[],
    selectedMessages: messageObjType[]
}
const initialState: stateType = {
    selectedMessages: [],
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        // set reaction to show in bottom sheet
        setSelectedReaction: (state, action: PayloadAction<reactionType[] | undefined>) => {
            state.selectedReaction = action.payload
        },


        //set selected messages for delete, forward and star purpose
        setSelectedMsgs: (state, action: PayloadAction<messageObjType>) => {

            //find message
            const msgIndex = state.selectedMessages
                .findIndex(m => m.id == action.payload?.id);
            //if exist then delete message
            if (msgIndex > -1) {
                state.selectedMessages.splice(msgIndex, 1)
                return;
            }
            //if doesn't exist then add it to the state 
            if (msgIndex == -1) {
                state.selectedMessages = [action.payload, ...state.selectedMessages]
            }
        },

        removeAllSelectedMsgs: (state) => {
            state.selectedMessages = [];
        }
    }
})

export default uiSlice.reducer
export const { setSelectedReaction, setSelectedMsgs, removeAllSelectedMsgs } = uiSlice.actions