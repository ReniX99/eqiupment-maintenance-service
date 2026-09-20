import { Router } from "express";
import {
  createRequest,
  deleteRequest,
  getRequest,
  getRequests,
  updateRequest,
  updateRequestStatus,
} from "../controllers/maintenance-requests.controller";
import {
  createRequestSchema,
  requestParamsSchema,
  requestsQuerySchema,
  updateRequestSchema,
  updateRequestStatusSchema,
} from "../schemas/maintenance-requests/maintenance-requests.schema";
import { validate } from "../middlewares/validate.middleware";

const router = Router();

router
  .route("/")
  .get(validate({ query: requestsQuerySchema }), getRequests)
  .post(validate({ body: createRequestSchema }), createRequest);
router
  .route("/:id")
  .get(validate({ params: requestParamsSchema }), getRequest)
  .patch(
    validate({ params: requestParamsSchema, body: updateRequestSchema }),
    updateRequest,
  )
  .delete(validate({ params: requestParamsSchema }), deleteRequest);

router
  .route("/:id/status")
  .patch(
    validate({ params: requestParamsSchema, body: updateRequestStatusSchema }),
    updateRequestStatus,
  );

export default router;
