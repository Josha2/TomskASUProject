import React from 'react';
import { connect } from 'react-redux';

const Pagination = ({ dataPerPage, totalPages, currentGroup, currentPage, setCurrentPage, fetchError, isLoading}) => {
  //---Высчитываем количество страниц
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPages / dataPerPage); i++) {
    pageNumbers.push(i)
  }

  const paginate = (currentPage) => {
    setCurrentPage(currentPage)
  };

  const nextPage = (currentGroup) => {
    if(currentGroup.length > 5){
      setCurrentPage(currentPage + 1);
    };
  };

  const prevPage = (currentPage) => {
    if(currentPage !== 1){
      setCurrentPage(currentPage - 1);
    };
  };

  let classNameNext = "page-item";
  if(currentGroup.length < 6){
    classNameNext += " disabled";
  } 

  let classNamePrev = "page-item";
  if(currentPage === 1) {
    classNamePrev += " disabled";
  }

  return (
    !(fetchError || isLoading) && <ul className="pagination">
      <li className={classNamePrev}>
        <button 
          className="page-link" 
          aria-label="Previous"
          onClick={() => prevPage(currentPage)}
        >
          <span className="sr-only">
            Previous
          </span>
        </button>
      </li>
      {pageNumbers.map((element) => {
        let classNames = "page-item";
          if(element === currentPage){
            classNames += " active"
          }
          return (
            <li 
              key={element} 
              className={classNames}
            >
              <button 
                className="page-link"
                onClick={() => paginate(element)}
              >
                {element}
              </button>
            </li>
        )})}
      <li className={classNameNext}>
        <button
          className="page-link"
          aria-label="Next"
          onClick={() => nextPage(currentGroup)}
        >
          <span className="sr-only">
            Next
          </span>
        </button>
      </li>
    </ul>
  );
};

const mapStateToProps = ({fetchError, isLoading}) => {
  return {
    fetchError,
    isLoading
  };
};

export default connect(mapStateToProps, null)(Pagination);