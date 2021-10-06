export const checkNumber = (number) => {
  const regex = RegExp(/^\d+$/);
  return regex.test(number);
};
