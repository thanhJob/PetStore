import { NextFunction, Response, Request } from "express";
import { logger } from "../configLogger";
import { HttpsException } from "../exceptions";

const errorMiddleware = (
  error: HttpsException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode: number = error.statusCode || 500;
  const message: string = error.message || "Some thing when wrong!";
  const status: string = error.status;

  logger.error(
    `[ERROR] - StatusCode: ${statusCode} - Msg: ${message} - Status: ${status}`
  );
  res.status(statusCode).json({
    status,
    message,
  });
};
export default errorMiddleware;
