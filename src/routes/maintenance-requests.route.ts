import { Router } from "express";
import { createRequest } from "../controllers/maintenance-requests.controller";
import { createRequestSchema } from "../schemas/maintenance-requests/maintenance-requests.schema";
import { validate } from "../middlewares/validate.middleware";

const router = Router();

router.route("/").post(validate({ body: createRequestSchema }), createRequest);

export default router;
