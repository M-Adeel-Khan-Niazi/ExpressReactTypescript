import { Request, Response } from "express";

export const successHandler = (
  res: Response,
  data: unknown,
  message?: string
): void => {
  res.status(200).json({ message, data });
};

export const notFoundHandler = (res: Response, message?: string): void => {
  res.status(404).json({ message });
};

export const errorHandler = (
  error: { status: number; message: string },
  req: Request,
  res: Response
): void => {
  const { status = 500, message } = error;
  res.status(status).json(message);
};

export const unauthorizedHandler = (res: Response, error: Error): void => {
  res.status(401).json({ error: error.message });
};

export const badRequestHandler = (res: Response, message: string): void => {
  res.status(400).json({ error: message });
};

export const serverErrorHandler = (res: Response, error: Error): void => {
  res.status(500).json({ error: error.message });
};

export const validationHandler = (res: Response, message: string): void => {
  res.status(422).json({ error: message });
};
