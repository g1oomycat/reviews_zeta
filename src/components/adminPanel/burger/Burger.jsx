import React, { useEffect, useRef, useState } from "react";
import classes from "./burger.module.scss";
import { Link, useLocation } from "react-router-dom";
import { BiBarChartAlt } from "react-icons/bi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { GoPersonAdd } from "react-icons/go";
import { MdOutlineMessage } from "react-icons/md";
import { MdOutlineAddLocationAlt } from "react-icons/md";
import { GoPerson } from "react-icons/go";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const listItem = [
  {
    link: "/admin_panel/analytics",
    icon: <BiBarChartAlt />,
    name: "Аналитика",
  },
  {
    icon: <IoMdAddCircleOutline />,
    name: "Добавить",
    subList: [
      {
        link: "/admin_panel/add-employee",
        icon: <GoPersonAdd />,
        name: "Сотрудника",
      },
      {
        link: "/admin_panel/places",
        icon: <MdOutlineAddLocationAlt />,
        name: "Магазин",
      },
    ],
  },
  {
    link: "/admin_panel/reviws",
    icon: <MdOutlineMessage />,
    name: "Отзывы",
  },
  { link: "/admin_panel/employees", icon: <GoPerson />, name: "Сотрудники" },
];
const Burger = () => {
  const location = useLocation();
  return (
    <div className={classes.burger}>
      <div className={classes.logo}>
        <p>ZETA</p>
      </div>
      <div className={classes.conteiner}>
        {listItem.map((item, index) =>
          item.link ? (
            <ItemList item={item} location={location.pathname} key={index} />
          ) : (
            <SubItemList item={item} location={location.pathname} key={index} />
          )
        )}
      </div>
    </div>
  );
};

const ItemList = ({ item, location }) => (
  <Link
    to={item.link}
    className={`${classes.item} ${
      location === item.link ? classes.active_link : ""
    }`}
  >
    <span className={classes.title_item}>
      {item.icon}
      <p>{item.name}</p>
    </span>
  </Link>
);

const SubItemList = ({ item, location }) => {
  const [active, setActive] = useState(
    !!item.subList.filter((el) => el.link === location).length
  );
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);
  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [active]);

  return (
    <>
      <button
        className={`${classes.item} ${active ? classes.active : ""}`}
        onClick={() => setActive(!active)}
      >
        <span className={classes.title_item}>
          {item.icon}
          <p>{item.name}</p>
        </span>
        <span
          className={classes.arrow}
          style={{ transform: active ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <MdOutlineKeyboardArrowDown />
        </span>
      </button>
      <div
        ref={contentRef}
        className={classes.wrapper_sublist}
        style={{ maxHeight: active ? contentHeight + "px" : 0 }}
      >
        {item.subList.map((item, index) => (
          <ItemList item={item} key={index} />
        ))}
      </div>
    </>
  );
};
export default Burger;
