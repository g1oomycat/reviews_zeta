import React, { useEffect, useState } from "react";
import classes from "./form.module.scss";
import { useForm } from "react-hook-form";
import { FaCheck } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import {
  ButtonSubmit,
  ButtonSubmitText,
} from "../../../animationsFramerMotion/UserInfo";
import { AddReviwsList } from "../../../api/FBreviws";
import { setGradeAndReviewsUser } from "../../../api/FBUsers";
import Fingerprint2 from "fingerprintjs2";
import { useNavigate } from "react-router-dom";
import { listGrades } from "../../../anyList/ListGradeANDURL";
import InputMask from "react-input-mask";
import { Timestamp } from "firebase/firestore";
import { GradeList } from "../../../anyList/gradeList";

const Form = ({ userData }) => {
  const navigate = useNavigate();
  const [indexGrade, setIndexGrade] = useState(0);
  const [isAccepted, setIsAccepted] = useState(true);
  const [isReviw, setIsReviw] = useState(false);
  const [fingerPrintState, setFingerPrintState] = useState("");
  const [ipUser, setIpUser] = useState("");

  // инициализация и настройка react-hook-form
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const watchShowData = watch();
  useEffect(() => {
    if (
      Object.keys(errors).length ||
      !watchShowData.reviw ||
      !watchShowData.name ||
      !watchShowData.number
    ) {
      setIsReviw(false);
    } else {
      setIsReviw(true);
    }
  }, [watchShowData]);

  // получение цифрового отпечатка и возможного IP
  useEffect(() => {
    const getFingerprintAndIp = async () => {
      try {
        const [resFinger, resIP] = await Promise.all([
          Fingerprint2.getPromise(),
          fetch("https://api64.ipify.org?format=json"),
        ]);
        //обработка цифрового отпечатка
        const values = resFinger.map((component) => component.value);
        const fingerprint = Fingerprint2.x64hash128(values.join(""), 31);
        setFingerPrintState(fingerprint);
        //обработка цифрового ip
        const data = await resIP.json();
        setIpUser(data.ip);
      } catch (error) {
        console.error("Error getting fingerprint:", error);
      }
    };
    getFingerprintAndIp();
  }, []);

  //отправка отзыва в БД

  const onSubmit = async (data) => {
    let newReviw = {
      user_ID: userData.id,
      user_Fio: `${userData.lastName} ${userData.firstName}`,
      reviws: data.reviw,
      number: data.number || "не указан",
      name: data.name,
      place: userData.place,
      grade: indexGrade,
      fingerprint: fingerPrintState,
      ip: ipUser,
      date: Timestamp.now(),
    };
    navigate(
      `/reviw/gratitude/${listGrades[indexGrade - 1]}/${userData.place}`
    );
    try {
      await AddReviwsList(newReviw);
      await setGradeAndReviewsUser(userData.id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ButtonsReviws indexGrade={indexGrade} setIndexGrade={setIndexGrade} />
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className={classes.item}
      >
        <div className={classes.title}>Оставьте отзыв о сотруднике</div>
        <div className={`${classes.wrapper_input} border_and_bg`}>
          <div className={classes.input_text}>
            <textarea
              placeholder="Оставьте отзыв*"
              {...register("reviw", {
                required: "Обязательное поле",
                maxLength: {
                  value: 500,
                  message: "Максимум 500 символов",
                },
              })}
            ></textarea>
          </div>
          <div className={classes.input_text}>
            <InputMask
              mask="+7 (999) 999-99-99"
              placeholder="Ваш номер телефона*"
              {...register("number", {
                required: "Обязательное поле",
                validate: (value) =>
                  value.replace(/\D/g, "").length === 11 ||
                  "Обязательно 11 цифр",
              })}
            />
            {errors.number && (
              <label className={classes.input_error}>
                {errors.number?.message}
              </label>
            )}
          </div>
          <div className={classes.input_text}>
            <input
              placeholder="Ваше имя*"
              {...register("name", {
                required: "Обязательное поле",
                pattern: {
                  value: /^[^-0-9\s]*$/,
                  message: "Только буквы, тире и пробел",
                },
                maxLength: {
                  value: 30,
                  message: "Максимум 30 символов",
                },
              })}
            ></input>
            {errors.name && (
              <label className={classes.input_error}>
                {errors.name?.message}
              </label>
            )}
          </div>
        </div>

        <AnimatePresence>
          {!!indexGrade && isAccepted && isReviw && (
            <motion.button
              initial="initial"
              animate="animate"
              exit="exit"
              variants={ButtonSubmit}
              type="submit"
              className={`${classes.submit} border_and_bg`}
            >
              <motion.span
                initial="initial"
                animate="animate"
                exit="exit"
                variants={ButtonSubmitText}
              >
                Отправить отзыв
              </motion.span>
            </motion.button>
          )}
        </AnimatePresence>
      </form>
      <AcceptRules isAccepted={isAccepted} setIsAccepted={setIsAccepted} />
    </>
  );
};

const ButtonsReviws = ({ indexGrade, setIndexGrade }) => (
  <div className={classes.item}>
    <div className={classes.title}>Оцените сотрудника</div>
    <div className={classes.row}>
      {GradeList.map((grade, index) => (
        <button
          className={`border_and_bg ${
            index + 1 === indexGrade && classes.active_grade
          }`}
          key={index}
          onClick={() => setIndexGrade(index + 1)}
        >
          {grade}
        </button>
      ))}
    </div>
  </div>
);
const AcceptRules = ({ isAccepted, setIsAccepted }) => (
  <div className={classes.accept}>
    <label className={classes.custom_checkbox}>
      <input
        type="checkbox"
        onChange={(e) => setIsAccepted(e.target.checked)}
        checked={isAccepted}
      />
      <span className={classes.checkmark}>
        <span className={classes.checkmark_icon}>
          <FaCheck />
        </span>
      </span>
      Согласен с условиями Пользовательского соглашения и Политики обработки
      персональных данных
    </label>
    <div className={classes.blur_bg}></div>
  </div>
);
export default Form;
