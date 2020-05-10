export const isBoolean = (val) => val === true || val === false;

export const removeAccents = (str) => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
};

export const wrapError = (fn) => (...args) => {
  const next = args[args.length - 1];

  try {
    Promise.resolve(fn(...args)).catch(next);
  } catch (err) {
    next(err);
  }
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
