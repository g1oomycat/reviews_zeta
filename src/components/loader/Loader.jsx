import React, { useEffect, useState } from "react";
import classes from "./loader.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import {
  AnimateStar,
  AnimateLetters,
  AnimateConteiner,
  AnimateLoader,
} from "../../animationsFramerMotion/Loader";

const Loader = ({ isVisible = false }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [timerFinished, setTimerFinished] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimerFinished(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Проверяем, если isVisible стало false после завершения таймера, закрываем Loader
    if (!isVisible && timerFinished) {
      setIsOpen(false);
    }
  }, [isVisible, timerFinished]);
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={classes.loader}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={AnimateLoader}
        >
          <motion.div
            className={classes.conteiner}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={AnimateConteiner}
          >
            <div className={classes.img_block}>
              <motion.img
                initial="initial"
                animate="animate"
                variants={AnimateStar}
                src={process.env.PUBLIC_URL + "images/logoOnlyStarWhite.svg"}
                alt="logo"
              />
            </div>
            <AnimatedLetters title={"ZETA"} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const AnimatedLetters = ({ title }) => (
  <div className={classes.logo_block}>
    {[...title].map((letter, index) => (
      <motion.span
        initial="initial"
        animate="animate"
        variants={AnimateLetters}
        className={classes.row_title}
        key={index}
        custom={title.length - 1 - index}
      >
        {letter}
      </motion.span>
    ))}
  </div>
);
export default Loader;
