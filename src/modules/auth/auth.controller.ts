import { catchAsync } from "../../utils/catchAsync";
import { NextFunction, Request, Response } from "express";

const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {});


export const authController = {
  loginUser,
};
