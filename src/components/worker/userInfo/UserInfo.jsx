import React from "react";
import classes from "./userInfo.module.scss";
import Form from "../form/Form";
import Background from "../../background/Background";

const UserInfo = ({ userData }) => {
  return (
    <div className="wrapper_main">
      <div className="_cont_limit">
        <div className={classes.body_worker}>
          <div className={classes.header}>
            <div className={classes.logo}>
              <img
                src={process.env.PUBLIC_URL + "images/logoWithStarWhite.svg"}
                alt="logo"
              />{" "}
            </div>
          </div>{" "}
          <CardUser userData={userData} />
          <Form userData={userData} />
        </div>
      </div>
      <Background />
    </div>
  );
};
const CardUser = ({ userData }) => (
  <div className={`${classes.item_flex} border_and_bg`}>
    <div className={classes.column}>
      <div className={classes.speciality}>{userData.speciality}</div>
      <div
        className={classes.fio}
      >{`${userData.lastName} ${userData.firstName}`}</div>
      <div className={classes.raiting}>Средний рейтинг {userData.rating}</div>
    </div>
    <div className={classes.column}>
      <img src={process.env.PUBLIC_URL + "/images/avatar.jpeg"} alt="avatar" />
    </div>
  </div>
);
export default UserInfo;
