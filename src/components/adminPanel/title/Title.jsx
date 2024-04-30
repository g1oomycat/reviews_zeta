import React from "react";
import classes from "./title.module.scss";

const Title = ({ text }) => {
  return (
    <div className={classes.title_block}>
      <span>{text}</span>
    </div>
  );
};

export default Title;
