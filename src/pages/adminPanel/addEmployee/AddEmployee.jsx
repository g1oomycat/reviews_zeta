import React, { useContext, useEffect, useState } from "react";
import classes from "./addEmployee.module.scss";
import Title from "../../../components/adminPanel/title/Title";
import FormFromDirector from "../../../components/adminPanel/forms/formFromEmployee/FormFromDirector";
import FormFromUser from "../../../components/adminPanel/forms/formFromEmployee/FormFromUser";
import { getPlaceList, getCorrectPlace } from "../../../api/Place";
import { Context } from "../../..";
import { observer } from "mobx-react-lite";

const AddEmployee = observer(() => {
  const { directorData } = useContext(Context);

  // const [placeList, setPlaceList] = useState([]);

  // useEffect(() => {
  //   const request = async () => {
  //     try {
  //       let res;
  //       if (directorData.director.role === "admin") {
  //         res = await getPlaceList();
  //       } else {
  //         res = await getCorrectPlace("name", directorData.director.place);
  //       }

  //       setPlaceList(res);
  //     } catch (error) {
  //       console.error("Ошибка при получении данных:", error);
  //     }
  //   };

  //   if (directorData.director.role) {
  //     request();
  //   }
  // }, [directorData.director]);
  return (
    <>
      <Title text={"Добавить сотрудника"} />
      <WrapperForms role={directorData.director.role} />
    </>
  );
});

const WrapperForms = ({ placeList, role }) => (
  <div className={classes.wrapper_forms}>
    <FormFromUser />
    {role === "admin" && <FormFromDirector />}
  </div>
);
export default AddEmployee;
