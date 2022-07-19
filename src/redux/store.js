import { configureStore } from "@reduxjs/toolkit";
import searchbookReducer from "./slices/searchbookSlice";

export const store = configureStore({
    reducer: {
        searchbook: searchbookReducer
    },
    middleware: (getDefaultMiddleware) => {
        // console.log("defaultMiddleware", getDefaultMiddleware())
        return getDefaultMiddleware()
    }
})