import { Router } from "express";
import { validate } from "../middlewares/validate.middleware";
import {
  loginUserSchema,
  registerUserSchema,
} from "../schemas/users/users.schema";
import {
  login,
  logout,
  refresh,
  register,
} from "../controllers/auth.controller";
import rateLimit from "express-rate-limit";
import TooManyRequestsError from "../errors/too-many-requests.error";
import { type Response } from "express";

const router = Router();

router
  .route("/register")
  .post(validate({ body: registerUserSchema }), register);

const rateLimiter = rateLimit({
  windowMs: 1000 * 60,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  statusCode: 429,
  handler: (_, res: Response) => {
    throw new TooManyRequestsError();
  },
});

router
  .route("/login")
  .post(rateLimiter, validate({ body: loginUserSchema }), login);

router.route("/refresh").post(refresh);

router.route("/logout").post(logout);

export default router;
