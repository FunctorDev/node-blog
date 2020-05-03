import { BASE_PATH, FILE_STORAGE_HOSTING } from '@/config';

export const fileUrl = (fileName) => {
  return`${FILE_STORAGE_HOSTING}/${fileName}`;
};

export const staticUrl = (url) => {
  if (BASE_PATH) {
    return `${BASE_PATH}/${url}`;
  } else {
    return `/${url}`;
  }
};
