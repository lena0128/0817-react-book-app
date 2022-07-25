import React, { useEffect } from 'react';
import './Pagination.css';


const Pagination = (props) => {
    const { children, startIndex, items, maxResults, totalItems, isLoading, handleClickNext, handleClickPrev } = props

    const currentPage = Math.floor(startIndex / maxResults) + 1;
    const totalPages = Math.ceil(totalItems / maxResults);

    console.log({children})

    useEffect(()=>{
        if(isLoading) {
            window.scrollTo({top:0})
        }
    }, [isLoading])


    return (
        <div className="pagination__container">
            <div>{children}</div>
            {items?.length > 0 && (
                <div className="page-button__container">
                    <button disabled={currentPage <= 1} onClick={handleClickPrev}>
                        prev
                    </button>
                    <span>{currentPage}</span>
                    <button disabled={ currentPage >= totalPages } onClick={handleClickNext}>
                        next
                    </button>
                </div>
            )}
        </div>
    )
}

export default Pagination;