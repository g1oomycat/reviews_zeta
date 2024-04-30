import React from "react";
import classes from "./authorization.module.scss";
import { TextField, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Controller, useForm } from "react-hook-form";
import { requiredValidation } from "../../validation/validation";
import { createUser, signInUser } from "../../api/AUTHadmin";
import { useNavigate, useLocation } from "react-router-dom";
import Background from "../../components/background/Background";

const theme1 = createTheme({
  palette: {
    ochre: {
      main: "#000000",
    },
  },
  typography: {
    htmlFontSize: 10,
    fontFamily: "Montserrat, sans-serif",
    fontSize: 17,
  },
  components: {
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: "black",
          fontSize: 15,
        },
      },
    },
  },
});
const Authorization = () => {
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location);
  const { handleSubmit, control } = useForm({
    mode: "onChange",
  });
  const onSubmit = async (data) => {
    try {
      const responce = await signInUser(data.email, data.password);
      const user = responce.user;
      const authInfo = { userID: user.uid, name: user.displayName };
      console.log(responce);
      localStorage.setItem("token", user.accessToken);
      localStorage.setItem("auth", JSON.stringify(authInfo));
    } catch (error) {
      alert(error);
      console.error(error);
    }
    navigate("/admin_panel/all-place");
  };
  return (
    <div className={classes.auth}>
      <div className={classes.wrapper}>
        <ThemeProvider theme={theme1}>
          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className={classes.column_form}
          >
            <span className={classes.enter_title}>Авторизация</span>
            <div className={classes.find_table_items}>
              <Controller
                name="email"
                rules={requiredValidation}
                defaultValue={""}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Email"
                    fullWidth
                    color="ochre"
                    helperText={error && error?.message}
                    error={!!error}
                  />
                )}
                control={control}
              />
            </div>
            <div className={classes.find_table_items}>
              <Controller
                name="password"
                defaultValue={""}
                rules={requiredValidation}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Password"
                    type="password"
                    fullWidth
                    color="ochre"
                    helperText={error && error?.message}
                    error={!!error}
                  />
                )}
                control={control}
              />
            </div>

            <Button
              variant="outlined"
              type="submit"
              fullWidth
              size="large"
              className={classes.main_btn}
              color="ochre"
            >
              Войти
            </Button>
          </form>
        </ThemeProvider>
      </div>
      <Background />
    </div>
  );
};

export default Authorization;
