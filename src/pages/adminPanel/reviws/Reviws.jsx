import React, { useEffect, useState } from "react";
import classes from "./reviws.module.scss";
import Title from "../../../components/adminPanel/title/Title";
import { getReviwsPlace } from "../../../api/FBreviws";
import { getPlaceList } from "../../../api/Place";
import Table from "../../../components/adminPanel/table/Table";

const Reviws = () => {
  const [listReviws, setListReviws] = useState([]);

  const request = async (place) => {
    try {
      const reviewsList = await getReviwsPlace(place);
      setListReviws(reviewsList);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  };
  useEffect(() => {
    request("rayymbek");
  }, []);
  return (
    <div className="wrapper_main">
      <div className="conteiner-admin">
        <div className="body-admin">
          <Title text={"Отзывы"} />
          <Table listReviws={listReviws} nameTitle={"отзывов"} />
        </div>
      </div>
    </div>
  );
};

export default Reviws;
