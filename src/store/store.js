
import todoSlice from "./todoSlice";
import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({
    reducer: {
        todo: todoSlice.reducer
    }
})
export default store