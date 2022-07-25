import React from 'react';
import Pagination from '../../components/Pagination/Pagination';
import SearchBox from '../../components/SearchBox/SearchBox';
import SearchResult from '../../components/SearchResult/SearchResult';
import { useDispatch, useSelector } from 'react-redux';
import { changePage } from '../../redux/slices/searchbookSlice';

const Home = () => {
    // searchBox, searchResult, Pagination

    const startIndex = useSelector(state=>state.searchbook.startIndex);
    const totalItems = useSelector(state=>state.searchbook.totalItems);
    const searchResult = useSelector(state=>state.searchbook.searchResult);
    const maxResults = useSelector(state=>state.searchbook.maxResults);
    const isLoading = useSelector(state=>state.searchbook.isLoading);
    const dispatch = useDispatch();

    const handleClickNext = () => {
        const currentPage = Math.floor(startIndex / totalItems) + 1
        dispatch(changePage(currentPage + 1))
    }

    const handleClickPrev = () => {
        const currentPage = Math.floor(startIndex / totalItems) + 1
        dispatch(changePage(currentPage - 1))
    }
    

    return (
        <div className="home__container">
            <SearchBox />
            <Pagination
                handleClickNext={handleClickNext}
                hanleClickPrev={handleClickPrev}
                startIndex={startIndex}
                items={searchResult}
                maxResults={maxResults}
                totalItems={totalItems}
                isLoading={isLoading}
            >
              <SearchResult />
            </Pagination>
            
        </div>
    )

}


export default Home;

/**
 * Instead of invoking the component with a self-closing tag <Pagination /> 
 * if you invoke it will full opening and closing tags <Pagination> </Pagination> you can then place more code between it.
 * This de-couples the <Pagination> component from its content and makes it more reusable.
 * When invoking the <Pagination> component we are passing a <SearchResult> component as it’s children 
 * and this is then rendered due to using {props.children} in the definition of the <Pagination> component.
 */