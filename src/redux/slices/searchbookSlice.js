import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

const initialState = {
    searchResult: [],
    keyword: "",
    totalItems: 0,
    startIndex: 0,
    maxResults: 10,
    isLoading: false
}

/**
 * 1. updateKeyword(keyword)
 * 2. getBooklist from Google Books API
 * 3. changePage(pageNum) => server side pagination
 */

export const getBooklist = createAsyncThunk(
    "searchbook/getBooklist",   // action type string
    // callback that returns a promise
    async (_, thunkAPI) => {
        const keyword = thunkAPI.getState().searchbook.keyword;
        const maxResults = thunkAPI.getState().searchbook.maxResults;
        
        const res = await axios.get(
            `https://www.googleapis.com/books/v1/volumes?q=${keyword}&maxResults=${maxResults}`
        );
        return res.data;
    } 
)


export const changePage =  createAsyncThunk(
    "searchbook/chnagePage",
    async(pageNum, thunkAPI) => {
        const keyword = thunkAPI.getState().searchbook.keyword;
        const maxResults = thunkAPI.getState().searchbook.maxResults;
        const totalItems = thunkAPI.getState().searchbook.totalItems;

        const totalPages = Math.ceil(totalItems / maxResults); 
        if(pageNum <= 0 || pageNum > totalPages) {
            return thunkAPI.rejectWithValue("page number is invalid");
        }
        
        const res = await axios.get(
            `https://www.googleapis.com/books/v1/volumes?q=${keyword}&startIndex=${
                (pageNum - 1) * maxResults
              }&maxResults=${maxResults}`
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
            state.searchResult = action.payload.items
            // console.log(state.searchResult)
            state.isLoading = false
        },
        [getBooklist.rejected]: (state, action) => {
            state.isLoading = false
            // console.log("request is rejected", action.error)
        },
        [changePage.pending]: (state, action) => {
            state.isLoading = true;
        },
        [changePage.fulfilled]: (state, action) => {
            state.totalItems = action.payload.totalItems;
            state.searchResult = action.payload.items;
            state.isLoading = false;
            
            const pageNum = action.meta.arg;
            const maxResults = state.maxResults;
            const startIndex = (pageNum - 1) * maxResults
            state.startIndex = startIndex;
        }, 
        [changePage.rejected]: (state, action) => {
            alert(action.error)
        },
    }
})



const searchbookReducer = searchbookSlice.reducer;
export default searchbookReducer;

export const { updateKeyword } = searchbookSlice.actions;

/**
 * 1(1) _ is a valid variable identifier in JavaScript, and could theoretically refer to anything. 
 * 1(2) Using _(...) with function syntax implies that _ is a function.
 */