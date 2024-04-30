export const HashNumber = (number) => {
  return (number * 2654435761) % 2 ** 32;
};
