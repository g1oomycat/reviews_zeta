import React from "react";
import classes from "./employees.module.scss";
import Title from "../../../components/adminPanel/title/Title";

const Employees = () => {
  return (
    <div className="wrapper_main">
      <div className="conteiner-admin">
        <div className="body-admin">
          <Title text={"Сотрудники"} />
        </div>
      </div>
    </div>
  );
};

export default Employees;
