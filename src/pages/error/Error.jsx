import React from "react";
import classes from "./error.module.scss";
import Background from "../../components/background/Background";

const Error = () => {
  return (
    <>
      <div className="_cont_limit">
        <div className="_after-cont-limit-flex">
          <div className={classes.wrapper}>
            <span className={classes.title}>404</span>
            <span className={classes.sub_title}>
              Упс... Страница не найдена
            </span>
          </div>
        </div>
      </div>
      <Background />
    </>
  );
};

export default Error;
