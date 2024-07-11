import React from "react";
import "../assets/css/mystyle.css";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CustomPagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`page-item ${currentPage === i ? "active" : ""}`}
          aria-current={currentPage === i ? "page" : undefined}
        >
          {currentPage === i ? (
            <span className="page-link">
              <span className="page-number">{i}</span>
            </span>
          ) : (
            <a
              className="page-link"
              onClick={() => onPageChange(i)}
            >
              <span className="page-number">{i}</span>
            </a>
          )}
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="pagination-wrap mt-40">
    <nav className="Page navigation example">
      <ul className="pagination list-wrap">
        {/* Previous Page Link */}
        {currentPage === 1 ? (
          <li className="dm-pagination__item disabled" aria-disabled="true">
            <span className="dm-pagination__link pagination-control">
            <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </li>
        ) : (
          <li className="dm-pagination__item">
            <a
              href="#!"
              className="dm-pagination__link pagination-control"
              onClick={() => onPageChange(currentPage - 1)}
            >
              <FontAwesomeIcon icon={faAngleLeft} />
            </a>
          </li>
        )}

        {/* Pagination Elements */}
        {renderPageNumbers()}
        

        {/* Next Page Link */}
        {currentPage === totalPages ? (
          <li className="dm-pagination__item disabled" aria-disabled="true">
            <span className="dm-pagination__link pagination-control">
            <FontAwesomeIcon icon={faAngleRight} />
            </span>
          </li>
        ) : (
          <li className="dm-pagination__item">
            <a
              href="#!"
              className="dm-pagination__link pagination-control"
              onClick={() => onPageChange(currentPage + 1)}
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </a>
          </li>
        )}
      </ul>
    </nav>
    </div>
  );
};

export default CustomPagination;
