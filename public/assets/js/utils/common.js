/* eslint-disable no-unused-vars */

const serializeForm = (arr) => arr.reduce((acc, item) => ({
  ...acc,
  [item.name]: item.value
}), {});
