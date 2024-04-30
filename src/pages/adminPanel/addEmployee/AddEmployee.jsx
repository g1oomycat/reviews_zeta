import React from "react";
import classes from "./addEmployee.module.scss";
import Title from "../../../components/adminPanel/title/Title";

const AddEmployee = () => {
  return (
    <div className="wrapper_main">
      <div className="conteiner-admin">
        <div className="body-admin">
          <Title text={"Добавить сотрудника"} />
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
