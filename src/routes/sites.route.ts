import { Router } from "express";
import { validate } from "../middlewares/validate.middleware";
import { siteParamsSchema } from "../schemas/equipments/site.schema";
import { getSiteSummary } from "../controllers/sites.controller";

const router = Router();
router
  .route("/:id/summary")
  .get(validate({ params: siteParamsSchema }), getSiteSummary);

export default router;
