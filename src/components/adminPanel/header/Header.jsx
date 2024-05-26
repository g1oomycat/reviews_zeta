import React, { useContext } from "react";
import classes from "./header.module.scss";
import { motion, useCycle } from "framer-motion";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../config/firebase";
import { Context } from "../../..";
import { observer } from "mobx-react-lite";

//варианты для анимации бергер меню
const button_variants = {
  open_first: {
    y: 10,
    rotate: 45,
  },
  open_second: {
    scale: 0,
  },
  open_thrist: {
    y: -10,
    rotate: -45,
  },
  closed_first: {
    rotate: 0,
    y: 0,
  },
  closed_second: {
    scale: 1,
    y: 0,
  },
};

const Header = observer(() => {
  const { directorData } = useContext(Context);
  const navigate = useNavigate();
  const [isOpen, toggleOpen] = useCycle(true, false);

  //анимация бергер меню
  const changeWidth = () => {
    toggleOpen();
    document.documentElement.style.setProperty(
      "--burger-with",
      isOpen ? "5.4rem" : "25rem"
    );
    document.documentElement.style.setProperty(
      "--p-opacity",
      isOpen ? "0" : "1"
    );
    document.documentElement.style.setProperty(
      "--p-margin",
      isOpen ? "-1.5rem" : "0"
    );
  };

  //выход из аккаунта
  const userLogout = async () => {
    await signOut(auth);
    navigate("/sign_in");
  };
  return (
    <header>
      <div className={classes.conteiner}>
        <div className={classes.left_components} onClick={changeWidth}>
          <div className={classes.burger_body}>
            <motion.span
              initial={"open_first"}
              animate={isOpen ? "open_first" : "closed_first"}
              variants={button_variants}
            ></motion.span>
            <motion.span
              initial={"open_second"}
              animate={isOpen ? "open_second" : "closed_second"}
              variants={button_variants}
            ></motion.span>
            <motion.span
              initial={"open_thrist"}
              animate={isOpen ? "open_thrist" : "closed_first"}
              variants={button_variants}
            ></motion.span>
          </div>
        </div>
        <div className={classes.right_components}>
          <span className={classes.fio}>
            {directorData.director.lastName} {directorData.director.firstName}
          </span>
          <button className={classes.exit} onClick={userLogout}>
            Выйти
          </button>
        </div>
      </div>
    </header>
  );
});

export default Header;
