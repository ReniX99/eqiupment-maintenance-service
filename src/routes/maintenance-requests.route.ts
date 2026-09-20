import { Router } from "express";
import {
  createRequest,
  getRequest,
  getRequests,
} from "../controllers/maintenance-requests.controller";
import {
  createRequestSchema,
  requestParamsSchema,
  requestsQuerySchema,
} from "../schemas/maintenance-requests/maintenance-requests.schema";
import { validate } from "../middlewares/validate.middleware";

const router = Router();

router
  .route("/")
  .get(validate({ query: requestsQuerySchema }), getRequests)
  .post(validate({ body: createRequestSchema }), createRequest);
router.route("/:id").get(validate({ params: requestParamsSchema }), getRequest);

export default router;
