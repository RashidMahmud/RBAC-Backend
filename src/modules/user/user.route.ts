import { Router } from "express";
import { userController } from "./user.controller";
import { Request, Response } from "express";

const router = Router();

router.post("/register", userController.registerUser);
router.get(
  "/me",
  (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User profile retrieved successfully"
    });
  },
  userController.getMyProfile,
);

export const userRoutes = router;
