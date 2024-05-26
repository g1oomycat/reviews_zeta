import React, { useContext, useEffect, useState } from "react";
import classes from "./formFromEmployee.module.scss";
import { Button, ThemeProvider } from "@mui/material";
import { TextFieldAndButton } from "../../../../customMUI/styles";
import { useForm } from "react-hook-form";
import { Timestamp } from "firebase/firestore";
import {
  nameValidation,
  telephoneValidation,
  telephoneMask,
  requiredValidation,
  surNameValidation,
  emailValidation,
  passwordlValidation,
} from "../../../../validation/validation";
import { AddDirector } from "../../../../api/Directors";
import { createUser } from "../../../../api/Auth";
import {
  InpTextField,
  InpTextFieldWithMask,
  InpSelect,
  InpPassword,
} from "../../../inputsForForm/Components";
import { Context } from "../../../..";

const roleList = [
  { value: "admin", label: "Администратор" },
  { value: "director", label: "Директор" },
];

const FormFromDirector = ({}) => {
  const { placeList } = useContext(Context);
  const [isSend, setIsSend] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);
  const { control, handleSubmit, reset, watch } = useForm({
    mode: "onChange",
  });

  const watchShowData = watch("role");
  useEffect(() => {
    if (watchShowData === "admin") {
      setIsAdmin(false);
    } else {
      setIsAdmin(true);
    }
  }, [watchShowData]);

  const onSubmit = async (data) => {
    setIsSend(true);
    const directorLogIn = await createUser(data.email, data.password);
    console.log(directorLogIn);
    const director = {
      directorId: directorLogIn.user.uid,
      email: directorLogIn.user.email,
      firstName: data.firstName,
      lastName: data.lastName,
      surName: data.surName || "Не указано",
      telephone: data.telephone || "Не указан",
      role: data.role,
      place: data.role === "Админ" ? null : data.place,
      date: Timestamp.now(),
    };
    await AddDirector(director);
    reset();
    setIsSend(false);
  };
  return (
    <div className={classes.user_wrapper}>
      <div className={classes.title}>Добавить директора или админа</div>
      <ThemeProvider theme={TextFieldAndButton}>
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className={classes.form_employee}
        >
          <div className={classes.wrapper_input}>
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
            <InpTextField
              name={"firstName"}
              label={"Имя*"}
              variant={"standard"}
              validation={nameValidation}
              control={control}
            />
            <InpTextField
              name={"lastName"}
              label={"Фамилия*"}
              variant={"standard"}
              validation={nameValidation}
              control={control}
            />
            <InpTextField
              name={"surName"}
              label={"Отчество"}
              variant={"standard"}
              validation={surNameValidation}
              control={control}
            />
            <InpTextFieldWithMask
              name={"telephone"}
              label={"Телефон"}
              variant={"standard"}
              validation={telephoneValidation}
              control={control}
              mask={telephoneMask}
            />
            <InpSelect
              name={"role"}
              label={"Роль*"}
              variant={"standard"}
              validation={requiredValidation}
              control={control}
              list={roleList}
              valueKey={"value"}
              labelKey={"label"}
            />

            {isAdmin && (
              <InpSelect
                name={"place"}
                label={"Место*"}
                variant={"standard"}
                validation={requiredValidation}
                control={control}
                list={placeList.placesData}
                valueKey={"name"}
                labelKey={"name"}
              />
            )}
          </div>
          <Button
            variant="outlined"
            type="submit"
            fullWidth
            size="large"
            disabled={isSend}
            className={classes.form_button}
          >
            Добавить нового директора
          </Button>
        </form>
      </ThemeProvider>
    </div>
  );
};

export default FormFromDirector;
