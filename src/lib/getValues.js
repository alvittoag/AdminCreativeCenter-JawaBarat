export const getValues = (obj) => {
  return Object.values(obj).map((value) => parseInt(value, 10));
};
