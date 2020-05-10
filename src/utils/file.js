import { curry } from 'ramda';
import { capitalizeFirstLetter } from './common';

export const getRequestFileName = curry((field, req) => {
  if (req.file) {
    return req.file.filename;
  }

  const fieldCapitalize = capitalizeFirstLetter(field);
  return req.body[field] || req.body[`old${fieldCapitalize}`];
});
