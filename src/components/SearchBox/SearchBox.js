import './Searchbox.css';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateKeyword, getBooklist } from '../../redux/slices/searchbookSlice';
import useThrottle from '../../hooks/useThrottle';

const SearchBox = () => {
    const keyword = useSelector(state=>state.searchbook.keyword);
    const isLoading = useSelector(state=>state.searchbook.isLoading);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        dispatch(updateKeyword(e.target.value));
    }

    const throttledSubmit = useThrottle(() => {
        if(isLoading) return;
        dispatch(getBooklist())
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        throttledSubmit();
    }



    return(
        <form onSubmit={handleSubmit}>
            <input type="text" onChange={handleChange} value={keyword}/> 
            <button>Submit</button>
        </form>
    )
}

export default SearchBox