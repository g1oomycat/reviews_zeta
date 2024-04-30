import React from "react";
import classes from "./places.module.scss";
import Title from "../../../components/adminPanel/title/Title";

const Places = () => {
  return (
    <div className="wrapper_main">
      <div className="conteiner-admin">
        <div className="body-admin">
          <Title text={"Добавить магазин"} />
          <div className={classes.wrapper_form}></div>
        </div>
      </div>
    </div>
  );
};

export default Places;
