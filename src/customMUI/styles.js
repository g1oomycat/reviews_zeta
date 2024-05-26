import { createTheme } from "@mui/material";
import { color } from "framer-motion";

// Create a custom theme
export const TextFieldAndButton = createTheme({
  typography: {
    htmlFontSize: 10,
    fontFamily: "Montserrat, sans-serif",
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: "#c21f39", // Цвет при фокусе
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          "&:focus": {
            backgroundColor: "transparent", // Убрать фон при фокусе
          },
          "&:active": {
            backgroundColor: "transparent", // Убрать фон при фокусе
          },
          "&.Mui-focused .MuiSelect-icon": {
            color: "#c21f39", // Цвет иконки при фокусе
          },
          "&::after": {
            borderColor: "#c21f39",
          },
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "#c21f39", // Цвет фона при наведении
            color: "white",
            "&:hover": {
              backgroundColor: "#c21f39", // Цвет фона при наведении
            },
            "&:focus": {
              backgroundColor: "#c21f39", // Цвет фона при наведении
            },
          },
          "&:hover": {
            backgroundColor: "rgba(194, 31, 57, 0.25)", // Цвет фона при наведении
          },
          "&:focus": {
            backgroundColor: "rgba(194, 31, 57, 0.25)", // Цвет фона при наведении
          },
          "&:active": {
            backgroundColor: "rgba(194, 31, 57, 0.25)", // Цвет фона при наведении
          },
          borderRadius: "1rem",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          fontSize: "2rem", // Задаем размер шрифта для всех Button
          "& .MuiInput-underline:after": {
            borderBottomColor: "#c21f39", // Change underline color on focus
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "grey", // Default border color
            },
            "&:hover fieldset": {
              borderColor: "black", // Border color on hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "#c21f39", // Border color on focus
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "1.4rem", // Задаем размер шрифта для всех Button
          fontWeight: 600,
          color: "black", // Text color
          borderColor: "black", // Border color
          "&:hover": {
            backgroundColor: "rgba(194, 31, 57, 0.08)",
            borderColor: "#c21f39", // Background color on hover
          },
        },
      },
    },
  },
});
