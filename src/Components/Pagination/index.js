import React from "react";
import "./index.css";

const Pagination = (props) => {
  const { rowCount, totalListCount, onChangeCurrentPage } = props;
  const paginationCount = Math.ceil(totalListCount / rowCount);

  const paginationRange = [];
  for (let i = 1; i <= paginationCount; i++) {
    paginationRange.push(i);
  }

  return (
    <nav>
      <ul className="pagination-list-container">
        {paginationRange.map((item) => (
          <li
            className="pagination-list-item"
            key={item}
            onClick={() => onChangeCurrentPage(item)}
          >
            {item}
          </li>
        ))}
      </ul>
      <h1 className="pagination-title">PAGES</h1>
    </nav>
  );
};

export default Pagination;
