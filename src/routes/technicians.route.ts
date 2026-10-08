import { Router } from "express";
import { authorization } from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/rbac.middleware";
import { getTechnicians } from "../controllers/technicians.controller";

const router = Router();
router.route("/").get(authorization, requireRole("admin"), getTechnicians);

export default router;
