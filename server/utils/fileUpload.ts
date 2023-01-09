import * as express from "express";
import multer, { diskStorage } from "multer";
import path from "path";

const fileFilter = (req: express.Request, file: any, cb: any) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
  }
};

export const uploadImage = multer({
  fileFilter,
  limits: { fileSize: 25 * 1024 * 1024 },
  storage: diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./server/uploads");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now().toString() + path.extname(file.originalname));
    },
  }),
});
