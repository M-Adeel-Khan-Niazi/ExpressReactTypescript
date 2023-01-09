import * as express from "express";
import { successHandler, serverErrorHandler } from "../../utils";
import { PostModel } from "./model";
import User from "../auth/model";
import { diskStorage } from "multer";
import path, { dirname } from "path";

export const Store = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const loggedInUser = req.user as User;
    const postRecord = await PostModel.create({
      title: req.body.title,
      description: req.body.description,
      image: req.file ? req.file.filename : null,
      createdBy: loggedInUser._id,
    });
    return successHandler(res, postRecord, "Post created successfully!");
  } catch (err: any) {
    return serverErrorHandler(res, err);
  }
};

export const GetAll = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const posts = await PostModel.find().sort({ _id: -1 });
    return successHandler(res, posts, "Posts fetched!");
  } catch (err: any) {
    return serverErrorHandler(res, err);
  }
};

export const imageView = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const appDir = dirname(require.main.filename);
    res.sendFile(appDir + "/uploads/" + req.query.image);
  } catch (err) {
    res.status(500).send({ error: err });
  }
};
