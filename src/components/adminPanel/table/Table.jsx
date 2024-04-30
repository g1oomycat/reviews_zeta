import React, { useState } from "react";
import classes from "./table.module.scss";
import PageNavigationButtons from "../pageNavigationButtons/PageNavigationButtons";

const Table = ({ listReviws, nameTitle }) => {
  const sizeOnePage = 30;
  const [indexPage, setIndexPage] = useState(1);
  return (
    <>
      <div className={classes.count_title}>
        По данной выборке всего - {listReviws.length} {nameTitle}
      </div>
      <div className={classes.table}>
        <div className={`${classes.row} ${classes.header}`}>
          <div className={classes.cell}>Имя клиента</div>
          <div className={classes.cell}>Телефон</div>
          <div className={classes.cell}>Отзыв</div>
          <div className={classes.cell}>Магазин </div>
          <div className={classes.cell}>Сотрудник</div>
          <div className={classes.cell}>Дата</div>
        </div>
        {listReviws
          .slice(sizeOnePage * (indexPage - 1), sizeOnePage * indexPage)
          .map((review, index) => (
            <RowTable review={review} key={index} />
          ))}
      </div>
      {listReviws.length > sizeOnePage && (
        <PageNavigationButtons
          listReviws={listReviws}
          indexPage={indexPage}
          setIndexPage={setIndexPage}
          sizeOnePage={sizeOnePage}
        />
      )}
    </>
  );
};
const RowTable = ({ review }) => {
  const date = new Date(review.date.seconds * 1000);
  return (
    <div className={classes.row}>
      <div className={classes.cell}>{review.name}</div>
      <div className={classes.cell}>{review.number}</div>
      <div className={classes.cell}>{review.reviws}</div>
      <div className={classes.cell}>{review.place} </div>
      <div className={classes.cell}>{review.user_Fio}</div>
      <div className={classes.cell}>
        {date.toLocaleDateString()} {date.toLocaleTimeString().slice(0, 5)}
      </div>
    </div>
  );
};
export default Table;
