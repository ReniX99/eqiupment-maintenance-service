import { Router } from "express";
import {
  createRequest,
  getRequest,
} from "../controllers/maintenance-requests.controller";
import {
  createRequestSchema,
  requestParamsSchema,
} from "../schemas/maintenance-requests/maintenance-requests.schema";
import { validate } from "../middlewares/validate.middleware";

const router = Router();

router.route("/").post(validate({ body: createRequestSchema }), createRequest);
router.route("/:id").get(validate({ params: requestParamsSchema }), getRequest);

export default router;
