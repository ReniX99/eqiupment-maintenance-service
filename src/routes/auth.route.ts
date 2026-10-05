import { Router } from "express";
import { validate } from "../middlewares/validate.middleware";
import { registerUserSchema } from "../schemas/users/users.schema";
import { register } from "../controllers/auth.controller";

const router = Router();

router
  .route("/register")
  .post(validate({ body: registerUserSchema }), register);

export default router;
