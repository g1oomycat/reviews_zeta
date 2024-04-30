export const ButtonSubmit = {
  initial: { height: 0 },
  animate: {
    height: "5rem",
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    height: 0,
    transition: {
      duration: 0.3,
    },
  },
};
export const ButtonSubmitText = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0,
    },
  },
};
