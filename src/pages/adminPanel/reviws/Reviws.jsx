import React, { useContext, useEffect, useState } from "react";
import classes from "./reviws.module.scss";
import Title from "../../../components/adminPanel/title/Title";
import { getReviwsByAtribute, getReviwsList } from "../../../api/Reviws";
import TableForReviws from "../../../components/adminPanel/tables/TableForReviws";
import { Context } from "../../..";
import { observer } from "mobx-react-lite";

const Reviws = observer(() => {
  const { directorData, placeList } = useContext(Context);

  const [listReviws, setListReviws] = useState([]);

  const request = async () => {
    let responce;
    if (directorData.director.role === "admin") {
      responce = await getReviwsList();
    } else {
      responce = await getReviwsByAtribute(
        "place",
        directorData.director.place
      );
    }
    setListReviws(responce);
  };
  useEffect(() => {
    if (Object.keys(directorData.director).length) {
      request();
    }
  }, [directorData.director]);
  return (
    <>
      <Title text={"Отзывы"} />
      <TableForReviws dataList={listReviws} />
    </>
  );
});

export default Reviws;
