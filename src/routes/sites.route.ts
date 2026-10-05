import { Router } from "express";
import { validate } from "../middlewares/validate.middleware";
import { siteParamsSchema } from "../schemas/equipments/site.schema";
import { getSiteSummary } from "../controllers/sites.controller";
import { authorization } from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/rbac.middleware";

const router = Router();
router
  .route("/:id/summary")
  .get(authorization, validate({ params: siteParamsSchema }), getSiteSummary);

export default router;
