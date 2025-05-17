import { configureStore } from "@reduxjs/toolkit";
import hoursReducer from "./timerStore"
import { modalSlice } from "./timerStore";
export const makeStore = () =>{
    return configureStore({
        reducer:{
            hours:hoursReducer,
            modal:modalSlice
        }
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']