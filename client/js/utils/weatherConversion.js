export const convertToCelsius = fahrenheit => {
  return Math.round((parseInt(fahrenheit) - 32) * 5 / 9);
};
