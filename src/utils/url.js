import { BASE_PATH, FILE_STORAGE_HOSTING } from '@/config';

export const fileUploadUrl = (fileName, folder = 'uploads') => {
  const folderWithSlash = folder ? `/${folder}/` : '';
  return`${FILE_STORAGE_HOSTING}${folderWithSlash}${fileName}`;
};

export const staticUrl = (url) => {
  if (BASE_PATH) {
    return `${BASE_PATH}/${url}`;
  } else {
    return `/${url}`;
  }
};
