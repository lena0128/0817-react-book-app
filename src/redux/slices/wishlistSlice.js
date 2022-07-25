import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    wishlist: [],
    wishlistForCurPage: [],
    totalItems: 0,    // total number of books
    startIndex: 0,
    maxResults: 5    // books per page
}

export const getWishlist = createAsyncThunk(
    "wishlist/getWishlist",
    async () => {
        const newWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
        return newWishlist
    }
)

export const addBookToWishlish = createAsyncThunk(
    "wishlist/addBookToWishlist",
    async (newBook, thunkAPI) => {
        const prevWishlist = thunkAPI.getState().wishlist.wishlist
        let nextWishlist
        if (prevWishlist.some(book=>book.id === newBook.id)) {
            nextWishlist = [...prevWishlist]
        } else {
            nextWishlist = [newBook, ...prevWishlist]
        }
        localStorage.setItem("wishlist", JSON.stringify(nextWishlist));
        return nextWishlist
    }
)

export const deleteBookFromWishlist = createAsyncThunk(
    "wishlist/deleteBookFromWishlist",
    async (targetIndex, thunkAPI) => {
        const prevWishlist = thunkAPI.getState().wishlist.wishlist
        const nextWishlist = prevWishlist.filter((book, index) => index !== targetIndex)
        localStorage.removeItem(targetIndex)
        return nextWishlist
    }
)

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        changePage: (state, action) => {
            

        },

        extraReducers: {
            [getWishlist.pending]: (state, action) => {
                // nothing
            },
            [getWishlist.fulfilled]: (state, action) => {
                state.wishlist = action.payload;
                state.wishlistForCurPage = action.payload.slice(0, state.maxResults)
                state.totalItems = action.payload.length
                state.startIndex = 0
            },
            [getWishlist.rejected]: (state, action) => {
                alert("get booklist failed!")
            },

            [addBookToWishlish.pending]: (state, action) => {
                // nothing
            },
            [addBookToWishlish.fulfilled]: (state, action) => {
                state.wishlist = action.payload
                state.totalItems = action.payload.length
                state.startIndex = 0
            },
            [addBookToWishlish.rejected]: (state, action) => {
                alert("add book to wishlist failed!")
            },

            [deleteBookFromWishlist.pending]: (state, action) => {
                // nothing
            },
            [deleteBookFromWishlist.fulfilled]: (state, action) => {
                state.wishlist = action.payload
                state.wishlistForCurPage = action.payload.slice(0, state.maxResults)
                state.totalItems = action.payload.length
                state.startIndex = 0
            },
            [deleteBookFromWishlist.rejected]: (state, action) => {
                alert("book removed from wishlist failed!")
            }
        }

    }
})

const wishlistReducer = wishlistSlice.reducer;
export default wishlistReducer;

export const { changePage } = wishlistSlice.actions;