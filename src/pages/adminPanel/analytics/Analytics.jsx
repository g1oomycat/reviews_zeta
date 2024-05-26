import React, { useContext, useEffect, useState } from "react";
import classes from "./analytics.module.scss";
import { getReviwsByAtribute, getReviwsList } from "../../../api/Reviws";
import { VerticalBarChart } from "../../../components/adminPanel/BarChart/VerticalBarChart";
import PieBarChart from "../../../components/adminPanel/BarChart/PieBarChart";
import SelectPlace from "../../../components/adminPanel/selectPlace/SelectPlace";
import SelectPeriod from "../../../components/adminPanel/seleсtPeriod/SeleсtPeriod";
import {
  dataToVerticalBarChar,
  dataToPieBarChar,
} from "../../../functions/periodDate";
import { BgColor, BorderColor } from "../../../anyList/colorToPie";
import Title from "../../../components/adminPanel/title/Title";
import { GradeList } from "../../../anyList/gradeList";
import { MdOutlineMessage } from "react-icons/md";
import { observer } from "mobx-react-lite";
import { Context } from "../../..";

const Analytics = observer(() => {
  const { directorData, placeList } = useContext(Context);
  const [listReviws, setListReviws] = useState([]);
  const [filteredListReviws, setFilteredListReviws] = useState([]);
  const [objVerticalBar, setObjVerticalBar] = useState([]);
  const [objPieBar, setPieBar] = useState([]);
  const [absGrade, setAbsGrade] = useState(0);
  const [absReviws, setAbsReviws] = useState(0);

  //select Period
  const [selectedPeriod, setSelectedPeriod] = useState({
    value: { lastDays: 30 },
    label: "Последние 30 дней",
  });

  //select Place
  const [selectedPlace, setSelectedPlace] = useState({});

  const request = async () => {
    let responce;
    if (directorData.director.role === "admin") {
      setSelectedPlace({
        value: "all",
        label: "Все",
      });
      responce = await getReviwsList();
    } else {
      responce = await getReviwsByAtribute(
        "place",
        directorData.director.place
      );

      setSelectedPlace({
        value: placeList.placesData[0].name,
        label: placeList.placesData[0].name,
      });
    }
    setListReviws(responce);
  };
  useEffect(() => {
    if (Object.keys(directorData.director).length) {
      request();
    }
  }, [directorData.director]);

  //данные для графиков и средниее данные
  useEffect(() => {
    if (listReviws.length === 0) return;
    if (!filteredListReviws.length) {
      return alert("недостаточно данных");
    }
    const [dataToPie, grade] = dataToPieBarChar(
      filteredListReviws,
      selectedPeriod.value
    );
    setPieBar(dataToPie);
    setAbsGrade(grade);
    const [dataToVertical, reviwsLength] = dataToVerticalBarChar(
      filteredListReviws,
      selectedPeriod.value
    );
    setObjVerticalBar(dataToVertical);
    setAbsReviws(reviwsLength);
  }, [filteredListReviws, selectedPeriod]);

  //фильтрация данных по месту
  useEffect(() => {
    if (listReviws.length === 0 || !Object.keys(selectedPlace).length) return;
    if (selectedPlace.value === "all") {
      setFilteredListReviws(listReviws);
    } else {
      setFilteredListReviws(
        listReviws.filter((el) => el.place === selectedPlace.value)
      );
    }
  }, [listReviws, selectedPlace]);
  return (
    <>
      <Title text={"Статистика магазина"} />
      <BarInfo
        selectedPlace={selectedPlace}
        setSelectedPlace={setSelectedPlace}
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
        absGrade={absGrade}
        absReviws={absReviws}
      />
      <BarChart objVerticalBar={objVerticalBar} objPieBar={objPieBar} />
    </>
  );
});

const Legend = ({ el, index }) => (
  <div className={classes.legend_item}>
    <p>{el}</p>
    <div
      style={{
        backgroundColor: `${BgColor[index]}`,
        borderColor: `${BorderColor[index]}`,
        width: "100%",
        height: 12,
      }}
    ></div>
  </div>
);

const BarChart = ({ objVerticalBar, objPieBar }) => (
  <div className={classes.bar}>
    <div className={classes.item_bar}>
      <span className={classes.title_bar}>Колличество отзывов</span>
      <VerticalBarChart objVerticalBar={objVerticalBar} />
    </div>
    <div className={classes.item_bar}>
      <span className={classes.title_bar}>Колличество оценок</span>
      <div className={classes.legend_wrapper}>
        {Object.keys(objPieBar).map((el, index) => (
          <Legend el={el} index={index} key={index} />
        ))}
      </div>
      <div className={classes.barChart}>
        <PieBarChart objPieBar={objPieBar} />
      </div>
    </div>
  </div>
);

const BarInfo = ({
  selectedPlace,
  setSelectedPlace,
  selectedPeriod,
  setSelectedPeriod,
  absGrade,
  absReviws,
}) => (
  <div className={classes.info_conteiner}>
    <div className={classes.item}>
      <div className={classes.item_wrap}>
        <span className={classes.item_title}>Колличество отзывов</span>
        <span className={classes.num}>{absReviws}</span>
      </div>
      <span className={classes.icon_item}>
        <MdOutlineMessage />
      </span>
    </div>
    <div className={classes.item}>
      <div className={classes.item_wrap}>
        <span className={classes.item_title}>Средняя оценка отзывов</span>
        <span className={classes.num}>{absGrade}</span>
      </div>
      <span className={classes.icon_item}>
        {GradeList[parseInt(absGrade) - 1]}
      </span>
    </div>
    <div>
      <span className={classes.item_title}>Магазин</span>
      <SelectPlace
        selectedPlace={selectedPlace}
        setSelectedPlace={setSelectedPlace}
      />
    </div>
    <div>
      <span className={classes.item_title}>Период</span>
      <SelectPeriod
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
      />
    </div>
  </div>
);
export default Analytics;
