import { Router } from "express";
import * as PostController from "./controller";
import { requireAuth } from "../../utils";
import { uploadImage } from "../../utils/fileUpload";

export const postRoutes = Router();

postRoutes.post(
  "/post",
  uploadImage.single("image"),
  requireAuth,
  PostController.Store
);
postRoutes.get("/posts", requireAuth, PostController.GetAll);
postRoutes.get("/post-image", PostController.imageView);
