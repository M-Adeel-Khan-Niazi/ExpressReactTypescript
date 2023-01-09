import { Router } from "express";
import * as AuthController from "./controller";

export const authRoutes = Router();

authRoutes.post("/login", AuthController.Login);
authRoutes.post("/register", AuthController.Register);
