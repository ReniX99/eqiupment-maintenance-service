import { Router } from "express";
import {
  createRequest,
  deleteRequest,
  getRequest,
  getRequests,
  getRequestStatusHistory,
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
import {
  addRequestAssigneeSchema,
  addRequestAssigneesSchema,
  requestAssigneeParamsSchema,
} from "../schemas/maintenance-requests/assignees.schema";
import {
  addRequestAssignees,
  deleteRequestAssignee,
} from "../controllers/request-assignees.controller";
import { authorization } from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/rbac.middleware";

const router = Router();

router
  .route("/")
  .get(authorization, validate({ query: requestsQuerySchema }), getRequests)
  .post(
    authorization,
    requireRole("technician", "admin"),
    validate({ body: createRequestSchema }),
    createRequest,
  );
router
  .route("/:id")
  .get(authorization, validate({ params: requestParamsSchema }), getRequest)
  .patch(
    authorization,
    requireRole("technician", "admin"),
    validate({ params: requestParamsSchema, body: updateRequestSchema }),
    updateRequest,
  )
  .delete(
    authorization,
    requireRole("admin"),
    validate({ params: requestParamsSchema }),
    deleteRequest,
  );

router
  .route("/:id/assignees")
  .post(
    authorization,
    requireRole("admin"),
    validate({ params: requestParamsSchema, body: addRequestAssigneesSchema }),
    addRequestAssignees,
  );

router
  .route("/:id/assignees/:userId")
  .delete(
    authorization,
    requireRole("admin"),
    validate({ params: requestAssigneeParamsSchema }),
    deleteRequestAssignee,
  );

router
  .route("/:id/history")
  .get(
    authorization,
    validate({ params: requestParamsSchema }),
    getRequestStatusHistory,
  );

router
  .route("/:id/status")
  .patch(
    authorization,
    requireRole("technician", "admin"),
    validate({ params: requestParamsSchema, body: updateRequestStatusSchema }),
    updateRequestStatus,
  );

export default router;
