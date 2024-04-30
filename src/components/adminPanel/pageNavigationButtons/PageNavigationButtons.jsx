import React, { useState, useEffect } from "react";
import classes from "./pageNavigationButtons.module.scss";

import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";

const PageNavigationButtons = ({
  listReviws,
  sizeOnePage,
  indexPage,
  setIndexPage,
}) => {
  const [quantityPages, setQuantityPages] = useState(0);
  const [pageNumbers, setPageNumbers] = useState([]);
  const calculatePageNumbers = (sizeList, currentPage) => {
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(sizeList, startPage + 3);
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index
    );
  };
  useEffect(() => {
    let sizeList = Math.ceil(listReviws.length / sizeOnePage);
    setQuantityPages(sizeList);
    setPageNumbers(calculatePageNumbers(sizeList, indexPage));
  }, [listReviws, indexPage]);
  //переход на предыдущую и следующую страницу
  const handlePage = (method) =>
    setIndexPage(method === "dicr" ? indexPage + 1 : indexPage - 1);

  return (
    <div className={classes.change_page}>
      {indexPage !== 1 && (
        <button
          className={classes.arrow_botton}
          onClick={() => handlePage("incr")}
        >
          <FaArrowLeftLong />
          Предыдущая
        </button>
      )}

      <div className={classes.list_page}>
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => setIndexPage(pageNumber)}
            style={{
              border: indexPage === pageNumber && "1px solid black",
            }}
          >
            {pageNumber}
          </button>
        ))}
      </div>

      {indexPage !== quantityPages && (
        <button
          className={classes.arrow_botton}
          onClick={() => handlePage("dicr")}
        >
          Следующая
          <FaArrowRightLong />
        </button>
      )}
    </div>
  );
};

export default PageNavigationButtons;
