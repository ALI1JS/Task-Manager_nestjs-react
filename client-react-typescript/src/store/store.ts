import { configureStore } from "@reduxjs/toolkit";
import TaskReducer from "./reducers/task-reducer"

const store = configureStore({
    reducer: {
        TaskReducer,
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch  = ReturnType<typeof store.dispatch>

export default store;