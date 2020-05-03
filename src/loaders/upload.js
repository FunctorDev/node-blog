import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { PATH_ROOT } from '@/config';

// SET STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destination =
      req.uploadDestination || path.resolve(PATH_ROOT, 'storage/uploads');
    if (!fs.existsSync(destination))
      fs.mkdirSync(destination, { recursive: true });
    cb(null, destination);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = `${file.fieldname}-${Date.now()}${ext}`;
    cb(null, filename);
  },
});

const upload = (config = {}) => multer({
  ...config,
  storage: storage,
});

export default upload;
