import React from "react";
import { Link } from "react-router-dom";

type Props = {
  nPages: number;
  current: any;
  setCurrentPage: any;
};
const Pagination = (props: Props) => {
  const pageNumbers = [...Array(props.nPages + 1).keys()].slice(1);

  const goToNextPage = () => {
    if (props.current !== props.nPages) props.setCurrentPage(props.current + 1);
  };
  const goToPrevPage = () => {
    if (props.current !== 1) props.setCurrentPage(props.current - 1);
  };

  return (
    <div>
      <nav>
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <Link className="page-link" onClick={goToPrevPage} to="#">
              Previous
            </Link>
          </li>
          {pageNumbers.map((pgNumber) => (
            <li
              key={pgNumber}
              className={`page-item ${
                props.current === pgNumber ? "active" : ""
              } `}
            >
              <Link
                onClick={() => props.setCurrentPage(pgNumber)}
                className="page-link"
                to="#"
              >
                {pgNumber}
              </Link>
            </li>
          ))}
          <li className="page-item">
            <Link className="page-link" onClick={goToNextPage} to="#">
              Next
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
