import * as express from "express";
import { hashPassword } from "./../../utils/hashPassword";
import {
  createToken,
  successHandler,
  badRequestHandler,
  serverErrorHandler,
} from "../../utils";
import User, { UserModel } from "./model";

export const Login = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const userRecord = await UserModel.findOne({
      email: req.body.email,
      password: hashPassword(req.body.password, "10"),
    })
      .lean<User>()
      .exec();
    if (!userRecord) return badRequestHandler(res, "Invalid credentials!");

    const token = createToken(userRecord._id.toString());
    return successHandler(
      res,
      { user: userRecord, token },
      "User Login Successfully!"
    );
  } catch (err: any) {
    return serverErrorHandler(res, err);
  }
};

export const Register = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const hasUser = await UserModel.findOne({ email: req.body.email });
    if (hasUser) return badRequestHandler(res, "Email already exists!");
    const user = await UserModel.create({
      fullName: req.body.fullName,
      email: req.body.email,
      role: req.body.role,
      password: hashPassword(req.body.password, "10"),
    });
    const token = createToken(user._id.toString());
    return successHandler(res, { user, token }, "SignUp successfull!");
  } catch (err: any) {
    return serverErrorHandler(res, err);
  }
};
