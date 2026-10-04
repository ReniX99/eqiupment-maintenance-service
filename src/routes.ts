import { Router } from "express";
import HealthRouter from "./routes/health.router";
import EquipmentsRouter from "./routes/equipments.route";
import RequestsRouter from "./routes/maintenance-requests.route";
import SitesRouter from "./routes/sites.route";

const router = Router();

router.use("/health", HealthRouter);
router.use("/equipment", EquipmentsRouter);
router.use("/requests", RequestsRouter);
router.use("/sites", SitesRouter);

export default router;
