import React, { useEffect, useState } from "react";
import Loader from "../../components/loader/Loader";
import UserInfo from "../../components/worker/userInfo/UserInfo";
import { getUser } from "../../api/FBUsers";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

const Worker = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [userData, setUserData] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const getUserData = async () => {
      let res = await getUser(id);
      res["id"] = id;
      setUserData(res);
      setIsVisible(false);
    };
    getUserData();
  }, []);
  return (
    <>
      <Loader isVisible={isVisible} />
      <UserInfo userData={userData} />
      <motion.div
        className="slide-out"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      ></motion.div>
    </>
  );
};

export default Worker;
