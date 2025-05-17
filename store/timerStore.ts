import { createSlice,PayloadAction } from "@reduxjs/toolkit";


export const hourSlice = createSlice({
    name:"hours",
    initialState:{hours:"00:00:00",timerName:""},
    reducers:{
        addHours(state,action:PayloadAction<string>){
            state.hours = action.payload
        },
        resetHours(state){
            state.hours = "00:00:00"
        },
        setTimerName(state,action){
            state.timerName = action.payload
        }
        
    }
})

const showModal = createSlice({
    name:"modal",
    initialState:{isOpen:false,object:{}},
    reducers:{
        openModal(state){
            state.isOpen = true
        },
        closeModal(state){
            state.isOpen = false
        },
        getObject(state,action){
            state.object = action.payload
        }
    }
})
export const { addHours } = hourSlice.actions;
export const { resetHours } = hourSlice.actions;
export const { openModal } = showModal.actions;
export const { closeModal } = showModal.actions
export const { setTimerName } = hourSlice.actions
export const { getObject } = showModal.actions
export default hourSlice.reducer
export const modalSlice = showModal.reducer