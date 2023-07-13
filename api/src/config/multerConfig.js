import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "coverPic") {
      cb(null, "public/covers");
    } else if (file.fieldname === "profilePic") {
      cb(null, "public/avatars");
    } else if (file.fieldname === "postImage") {
      cb(null, "public/postPics");
    } else {
      cb(null, "public");
    }
  },
  filename: (req, file, cb) => {
    const filename = `${uuidv4()}-${file.originalname}`;
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const upload = multer({ storage: fileStorage, fileFilter });

export const uploadFields = upload.fields([
  { name: "coverPic", maxCount: 1 },
  { name: "postImage", maxCount: 1 },
  { name: "image", maxCount: 1 },
]);
