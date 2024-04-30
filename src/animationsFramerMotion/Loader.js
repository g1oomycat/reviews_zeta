export const AnimateStar = {
  initial: { opacity: 0 },
  animate: {
    x: [105, 105, 105, 105, 105, 200, 0],
    scale: [0, 1.1, 0.9, 1, 1, 1, 1],
    y: [50, 0, 0, 0, 0, 0, 0],
    opacity: [0.1, 1, 1, 1, 1, 1, 1],
    rotate: [0, 0, 0, 0, 0, 300, -360],
    transition: {
      duration: 3,
      ease: [0.5, 0.01, 0.5, 0.95],
      times: [0, 0.08, 0.12, 0.16, 0.25, 0.5, 1],
      delay: 0.3,
    },
  },
};
export const AnimateLetters = {
  initial: { y: 80, opacity: 0.1 },
  animate: (index) => ({
    y: 0,
    opacity: 1,
    transition: {
      ease: [0.6, 0.01, 0.05, 0.95],
      duration: 1,
      delay: 1.92 + index * 0.18,
    },
  }),
};
export const AnimateConteiner = {
  initial: false,
  animate: false,
  exit: {
    opacity: 0,
    transition: {
      ease: [0.6, 0.01, 0.05, 0.95],
      duration: 0.6,
    },
  },
};
export const AnimateLoader = {
  initial: false,
  animate: false,
  exit: {
    height: 0,
    transition: {
      ease: [0.22, 1, 0.36, 1],
      duration: 1,
      delay: 0.3,
    },
  },
};
