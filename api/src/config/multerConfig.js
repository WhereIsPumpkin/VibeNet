import multer from "multer";

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "coverPic") {
      cb(null, "public/covers");
    } else if (file.fieldname === "profilePic") {
      cb(null, "public/avatars");
    } else {
      cb(null, "public");
    }
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
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
  { name: "profilePic", maxCount: 1 },
]);
