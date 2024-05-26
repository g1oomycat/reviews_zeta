import React from "react";
import classes from "./main.module.scss";
import Background from "../../components/background/Background";

const Main = () => {
  return (
    <>
      <div className="_cont_limit">
        <div className="_after-cont-limit-flex">
          <div className={classes.wrapper}>
            <div className={classes.logo}>
              <img
                src={process.env.PUBLIC_URL + "images/logoWithStarWhite.svg"}
                alt="logo"
              />
            </div>
            <span className="title">Система отзывов cотрудников</span>
            <span className={`sub_title border_and_bg`}>
              Система отзывов предоставляет удобную возможность оставлять
              обратную связь и оценку сотрудникам магазинов ZETA. Для того чтобы
              поделиться вашим мнением и поставить оценку, просто откройте
              камеру вашего смартфона и направьте ее на индивидуальный QR-код
              сотрудника.
            </span>
          </div>
        </div>
      </div>
      <Background />
    </>
  );
};

export default Main;
