import { Request, Response, NextFunction } from "express";
import passport from "passport";
import User from "../modules/auth/model";
import { serverErrorHandler, unauthorizedHandler } from "./responseHandler";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  passport.authenticate("jwt", { session: false }, (err: Error, user: User) => {
    if (err) return serverErrorHandler(res, err);
    if (!user) return unauthorizedHandler(res, new Error("Invalid Token"));
    req.user = user;
    next();
  })(req, res);
};
