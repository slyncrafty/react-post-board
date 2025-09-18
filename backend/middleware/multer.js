// Multer is a middleware for handling multipart/form-data, for uploading files. 
// Multer will not process any form which is not multipart (multipart/form-data).
import multer from 'multer';
import path from 'path';

const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' && ext !== '.svg' && ext !== '.webp') {
      cb(new Error('File type is not supported'), false);
      return;
    }
    cb(null, true);
  },
});

export default upload;
