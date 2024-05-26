import React, { useEffect, useLayoutEffect, useState } from "react";
import classes from "./gratitude.module.scss";
import Background from "../../components/background/Background";
import { SiGooglestreetview } from "react-icons/si";
import { FaYandex } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { listGrades } from "../../anyList/ListGradeANDURL";
import Loader from "../../components/loader/Loader";
import { getPlace } from "../../api/Place";

const iconsPlatform = {
  yandex: <FaYandex />,
  twoGis: (
    <img src={process.env.PUBLIC_URL + "images/twogis_white.svg"} alt="logo" />
  ),
  google: <SiGooglestreetview />,
};

const Gratitude = () => {
  const navigate = useNavigate();
  const { grade, place } = useParams();
  const [isAdmitted, setIsAdmitted] = useState(false);
  const [urlMap, setUrlMap] = useState({});
  //проверка допустимой оценки u адреса
  useEffect(() => {
    const getPlaceData = async () => {
      try {
        const res = await getPlace(place);
        setUrlMap(res.urlMap);
      } catch (error) {
        console.error(error);
        navigate("*");
      }
    };
    if (!listGrades.includes(grade)) {
      navigate("*");
      return;
    }
    if (grade === listGrades[4]) {
      getPlaceData();
    }
    setIsAdmitted(true);
  }, []);
  return (
    <>
      <Loader isAdmitted={isAdmitted} />
      <BodyGratitude urlMap={urlMap} />
    </>
  );
};
const BodyGratitude = ({ urlMap }) => (
  <>
    <div className="_cont_limit">
      <div className="_after-cont-limit-flex">
        <div className={classes.wrapper}>
          <Header />
          {!!Object.keys(urlMap).length && <ButtonNavigate urlMap={urlMap} />}
        </div>
      </div>
    </div>
    <Background />
  </>
);

const Header = () => (
  <>
    <div className={classes.logo}>
      <img
        src={process.env.PUBLIC_URL + "images/logoWithStarWhite.svg"}
        alt="logo"
      />
    </div>
    <span className="title">Ваш отзыв принят!</span>
    <span className="title">Спасибо, что делаете нас лучше</span>
  </>
);
const ButtonNavigate = ({ urlMap }) => (
  <>
    <span className={classes.subtitle}>
      Также оставьте отзыв о магазине на других платформах
    </span>
    <div className={classes.navigate_platforms}>
      {Object.keys(urlMap).map((platform, index) => (
        <a href={urlMap[platform]} key={index}>
          <button className="border_and_bg">{iconsPlatform[platform]}</button>
        </a>
      ))}
    </div>
  </>
);
export default Gratitude;
