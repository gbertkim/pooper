import React from 'react'
import './Pagination.css'

const Pagination = ({postsPerPage, totalPosts, paginate, currentPage}) => {
    const lastPageMath = Math.ceil(totalPosts / postsPerPage);
    let lastPage;
    if (lastPageMath === 0){
        lastPage = 1
    } else {
        lastPage = lastPageMath
    }
    let lastDisabled = false;
    let firstDisabled = false;
    if (currentPage >= lastPageMath){
        lastDisabled = true
    }
    if (currentPage <= 1){
        firstDisabled = true
    }
    return(
        <nav>
            <div className="pagination" data-test='paginationTest'>
                <button className='blue paginationButton' onClick={() => paginate(1)} disabled={firstDisabled}>&#x3c;&#x3c;</button>
                <button className='pink paginationButton' onClick={() => paginate(currentPage-1)} disabled={firstDisabled}>&#x3c;</button>
                <div className="currentPage">{currentPage} / {lastPage}</div>                
                <button className='yellow paginationButton' onClick={() => paginate(currentPage+1)} disabled={lastDisabled}>&#62;</button>
                <button className='red paginationButton' onClick={() => paginate(lastPage)} disabled={lastDisabled}>&#62;&#62;</button>
            </div>

        </nav>
    )
}
export default Pagination