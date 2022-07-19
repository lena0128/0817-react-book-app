import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

const initialState = {
    searchResult: [],
    keyword: "book",
    totalItems: 0,
    startIndex: 0,
    maxResults: 10,
    isLoading: false
}


export const getBooklist = createAsyncThunk(
    "searchbook/getBooklist",   // action type string
    // callback that returns a promise
    async (_, thunkAPI) => {
        const keyword = thunkAPI.getState().searchbook.keyword;
        const maxResults = thunkAPI.getState().searchbook.maxResults;
        
        const res = await axios.get(
            `https://www.googleapis.com/books/v1/volumes?q1=${keyword}&maxResults=${maxResults}`
        );
        return res.data;
    } 
)

const searchbookSlice = createSlice({
    name: "searchbook",
    initialState,
    reducers: {
        updateKeyword: (state, action) => {
            state.keyword = action.payload
        },
    },
    extraReducers: {
        [getBooklist.pending]: (state, action) => {
            // lifecycle.actions, intermediate actions
            state.isLoading = true;
        },
        [getBooklist.fulfilled]: (state, action) => {
            // console.log(action.payload)
            state.totalItems = action.payload.totalItems
            state.searResults = action.payload.items
            // console.log(state.searResults)
            state.isLoading = false
        },
        [getBooklist.rejected]: (state, action) => {
            state.isLoading = false
            console.log("request is rejected", action.error)
        }
    }
})


const searchbookReducer = searchbookSlice.reducer;
export default searchbookReducer;

export const { updateKeyword } = searchbookSlice.actions;

/**
 * 1(1) _ is a valid variable identifier in JavaScript, and could theoretically refer to anything. 
 * 1(2) Using _(...) with function syntax implies that _ is a function.
 */