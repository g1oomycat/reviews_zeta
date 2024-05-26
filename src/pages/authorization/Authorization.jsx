import React, { useContext, useState } from "react";
import classes from "./authorization.module.scss";
import { TextFieldAndButton } from "../../customMUI/styles";
import { Button, ThemeProvider } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  emailValidation,
  passwordlValidation,
} from "../../validation/validation";
import { signInUser } from "../../api/Auth";
import { getDirectorFromAtribute } from "../../api/Directors";
import { useNavigate } from "react-router-dom";
import {
  InpTextField,
  InpPassword,
} from "../../components/inputsForForm/Components";
import { Context } from "../..";

const Authorization = () => {
  const { directorData } = useContext(Context);
  const navigate = useNavigate();
  const [isSend, setIsSend] = useState(false);

  const { handleSubmit, control } = useForm({
    mode: "onChange",
  });
  const onSubmit = async (data) => {
    setIsSend(true);
    try {
      const userSignIn = await signInUser(data.email, data.password);
      // const user = await getDirectorFromAtribute(
      //   "directorId",
      //   userSignIn.user.uid
      // );
      // console.log("auth");
      // directorData.setDirector(user[0]);
      navigate("/admin_panel/analytics");
    } catch (error) {
      alert(error);
      console.error(error);
    }

    setIsSend(false);
  };
  return (
    <div className={classes.auth}>
      <div className={classes.wrapper}>
        <ThemeProvider theme={TextFieldAndButton}>
          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className={classes.column_form}
          >
            <span className={classes.enter_title}>Авторизация</span>
            <InpTextField
              name={"email"}
              label={"Электронная почта*"}
              variant={"standard"}
              validation={emailValidation}
              control={control}
            />
            <InpPassword
              name={"password"}
              label={"Пароль*"}
              variant={"standard"}
              validation={passwordlValidation}
              control={control}
            />
            <Button
              variant="outlined"
              type="submit"
              fullWidth
              size="large"
              disabled={isSend}
              className={classes.form_button}
            >
              Войти
            </Button>
          </form>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Authorization;
