import './SearchResult.css';
import React from 'react';
import { useSelector } from 'react-redux';
import BookInfo from './BookInfo/BookInfo';

const SearchResult = () => {
    const searchResult = useSelector(state=>state.searchbook.searchResult)
    const isLoading = useSelector(state=>state.searchbook.isLoading)
    
    return(
        <div className="search-result__container">
            {!isLoading && (
                <ul className="search-result__list">
                    {searchResult.map((book)=>{
                        return (
                            <li key={book.id}>
                                <BookInfo key={book.id} bookInfo={book}/>
                            </li>
                        )
                    })}
                </ul>
            )}
            
            <div className="loader"
            style={{display: isLoading ? "block" : "none"}}
            >
            </div>        

        </div>

    )

}

export default SearchResult