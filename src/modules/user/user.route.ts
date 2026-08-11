import { NextFunction, Router } from "express";
import { userController } from "./user.controller";
import { Request, Response } from "express";
import { jwtUtils } from "../../utils/jwt";
import config from "../../config";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post("/register", userController.registerUser);
router.get(
  "/me",
  (req: Request, res: Response, next: NextFunction) => {
    console.log(req.cookies);
    const { accessToken } = req.cookies;
    console.log(accessToken);

    const verifiedToken = jwtUtils.verifyToken(
      accessToken,
      config.jwt_access_secret,
    );

    const {email, name, id, role } =verifiedToken;
    
    const requiredRoles = [Role.ADMIN, Role.USER, Role.AUTHOR]

    if (typeof verifiedToken === "string") {
      throw new Error(verifiedToken);
    }
    next();
  },
  userController.getMyProfile,
);

export const userRoutes = router;
