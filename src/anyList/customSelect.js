export const customStyles = {
  control: (provided, state) => ({
    ...provided,
    fontSize: "1.4rem",
    border: state.isFocused ? "1px solid #c21f39 " : "1px solid #ccc",
    boxShadow: state.menuIsOpen ? "0 0 5px rgba(194, 31, 57, 0.3)" : "none",
    "&:hover": {
      border: state.isFocused ? "1px solid #c21f39 " : "1px solid #ccc",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: "1.4rem",
    backgroundColor: state.isSelected ? "#c21f39" : "transparent",
    color: state.isSelected ? "#fff" : "#000",

    "&:hover": {
      backgroundColor: state.isSelected ? "#c21f39" : "rgba(194, 31, 57, 0.3)",
    },
  }),
  menuList: (provided) => ({
    ...provided,
    fontSize: "1.2rem", // Установите желаемый размер шрифта
  }),
};
